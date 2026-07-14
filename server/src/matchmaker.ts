import { dbService } from "./db.ts";
import { GameManager } from "./game.ts";
import { elo } from "./proto/elo_proto.js";

const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;

export interface QueueEntry {
  playerId: string;
  socket: any; // WebSocket instance
  elo: number;
  joinedAt: number;
  disciplineMode: string;
}

class MatchmakerClass {
  private queue: QueueEntry[] = [];
  private intervalId: Timer | null = null;

  start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  join(playerId: string, socket: any, disciplineMode: string = "MATH") {
    // Remove if already in queue
    this.leave(playerId);

    const player = dbService.getPlayer(playerId);
    const eloVal = player ? player.elo : 1000;

    this.queue.push({
      playerId,
      socket,
      elo: eloVal,
      joinedAt: Date.now(),
      disciplineMode
    });

    dbService.logMatchmakingStatus(playerId, disciplineMode, "QUEUED");
    console.log(`Player ${playerId} (Elo: ${eloVal}, Mode: ${disciplineMode}) joined matchmaking queue. Size: ${this.queue.length}`);
  }

  leave(playerId: string) {
    const entry = this.queue.find(e => e.playerId === playerId);
    if (entry) {
      dbService.logMatchmakingStatus(playerId, entry.disciplineMode, "CANCELLED");
      this.queue = this.queue.filter(e => e.playerId !== playerId);
      console.log(`Player ${playerId} left matchmaking queue. Size: ${this.queue.length}`);
    }
  }

  private tick() {
    const now = Date.now();
    const matchedIds = new Set<string>();
    
    // Matched pairs list to process after loop time benchmarking
    const humanMatches: Array<{ playerA: QueueEntry; playerB: QueueEntry; minEloDiff: number }> = [];
    const botMatches: QueueEntry[] = [];

    const loopStart = performance.now();

    // Sort queue by joined time to match oldest players first
    this.queue.sort((a, b) => a.joinedAt - b.joinedAt);

    for (let i = 0; i < this.queue.length; i++) {
      const playerA = this.queue[i];
      if (matchedIds.has(playerA.playerId)) continue;

      const elapsedSecondsA = (now - playerA.joinedAt) / 1000;

      // 20-second fallback to Bot match
      if (elapsedSecondsA >= 20) {
        matchedIds.add(playerA.playerId);
        botMatches.push(playerA);
        continue;
      }

      let bestMatchIdx = -1;
      let minEloDiff = Infinity;
      const allowedEloDiff = elapsedSecondsA > 5 ? 100 + Math.floor(elapsedSecondsA - 5) * 50 : 100;

      // Look for a human opponent of the same discipline_mode
      for (let j = i + 1; j < this.queue.length; j++) {
        const playerB = this.queue[j];
        if (matchedIds.has(playerB.playerId)) continue;
        if (playerA.disciplineMode !== playerB.disciplineMode) continue;

        const eloDiff = Math.abs(playerA.elo - playerB.elo);
        if (eloDiff <= allowedEloDiff) {
          if (eloDiff < minEloDiff) {
            minEloDiff = eloDiff;
            bestMatchIdx = j;
          }
        }
      }

      if (bestMatchIdx !== -1) {
        const playerB = this.queue[bestMatchIdx];
        matchedIds.add(playerA.playerId);
        matchedIds.add(playerB.playerId);
        humanMatches.push({ playerA, playerB, minEloDiff });
      }
    }

    const loopTime = performance.now() - loopStart;
    if (loopTime > 2) {
      console.warn(`[PERFORMANCE WARNING] Matchmaking tick took ${loopTime.toFixed(3)}ms`);
    }

    // Now execute DB logging, room spawning and socket signaling for bot matches
    for (const playerA of botMatches) {
      console.log(`Matchmaker timeout for ${playerA.playerId}. Pairing with adaptive bot.`);
      dbService.logMatchmakingStatus(playerA.playerId, playerA.disciplineMode, "MATCHED");
      this.queue = this.queue.filter(e => e.playerId !== playerA.playerId);

      const room = GameManager.createBotGame(playerA.playerId, playerA.socket, playerA.elo);
      
      const updateA = ServerGameStateUpdate.create({
        matchReady: {
          roomId: room.id,
          opponentName: `Bot_${Math.floor(playerA.elo + (Math.random() * 60 - 30))}`,
          opponentAvatarUrl: "dracula",
          opponentElo: playerA.elo,
          seed: room.questionSeed || `seed_${Math.random().toString(36).substring(2, 7)}`
        }
      });
      playerA.socket.send(ServerGameStateUpdate.encode(updateA).finish());
    }

    // Process matched human pairs
    for (const { playerA, playerB, minEloDiff } of humanMatches) {
      console.log(`Matched human players ${playerA.playerId} (Elo: ${playerA.elo}) and ${playerB.playerId} (Elo: ${playerB.elo}) with difference ${minEloDiff}`);
      
      // Remove both from queue
      this.queue = this.queue.filter(e => e.playerId !== playerA.playerId && e.playerId !== playerB.playerId);

      const room = GameManager.createGame(
        playerA.playerId, playerA.socket, playerA.elo,
        playerB.playerId, playerB.socket, playerB.elo
      );

      dbService.logMatchmakingStatus(playerA.playerId, playerA.disciplineMode, "MATCHED");
      dbService.logMatchmakingStatus(playerB.playerId, playerB.disciplineMode, "MATCHED");

      const seed = room.questionSeed || `seed_${Math.random().toString(36).substring(2, 7)}`;
      const playerAProfile = dbService.getPlayer(playerA.playerId);
      const playerBProfile = dbService.getPlayer(playerB.playerId);

      const updateA = ServerGameStateUpdate.create({
        matchReady: {
          roomId: room.id,
          opponentName: playerBProfile?.username || "Opponent",
          opponentAvatarUrl: playerBProfile?.selectedThemeId || "dark",
          opponentElo: playerBProfile?.elo || 1000,
          seed: seed
        }
      });
      playerA.socket.send(ServerGameStateUpdate.encode(updateA).finish());

      const updateB = ServerGameStateUpdate.create({
        matchReady: {
          roomId: room.id,
          opponentName: playerAProfile?.username || "Opponent",
          opponentAvatarUrl: playerAProfile?.selectedThemeId || "dark",
          opponentElo: playerAProfile?.elo || 1000,
          seed: seed
        }
      });
      playerB.socket.send(ServerGameStateUpdate.encode(updateB).finish());
    }
  }
}

export const Matchmaker = new MatchmakerClass();
