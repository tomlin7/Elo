import { dbService } from "./db.ts";
import { GameManager } from "./game.ts";

export interface QueueEntry {
  playerId: string;
  socket: any; // WebSocket instance
  elo: number;
  joinedAt: number;
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

  join(playerId: string, socket: any) {
    // Remove if already in queue
    this.leave(playerId);

    const player = dbService.getPlayer(playerId);
    const elo = player ? player.elo : 1000;

    this.queue.push({
      playerId,
      socket,
      elo,
      joinedAt: Date.now()
    });

    console.log(`Player ${playerId} (Elo: ${elo}) joined the queue. Queue size: ${this.queue.length}`);
  }

  leave(playerId: string) {
    const initialLen = this.queue.length;
    this.queue = this.queue.filter(entry => entry.playerId !== playerId);
    if (this.queue.length < initialLen) {
      console.log(`Player ${playerId} left the queue. Queue size: ${this.queue.length}`);
    }
  }

  private tick() {
    const now = Date.now();
    const matchedIds = new Set<string>();

    // Sort queue by joined time to match oldest players first
    this.queue.sort((a, b) => a.joinedAt - b.joinedAt);

    for (let i = 0; i < this.queue.length; i++) {
      const playerA = this.queue[i];
      if (matchedIds.has(playerA.playerId)) continue;

      let bestMatchIdx = -1;
      let minEloDiff = Infinity;
      const elapsedSecondsA = (now - playerA.joinedAt) / 1000;

      // Check if we reached the 20-second timeout for a Bot match
      if (elapsedSecondsA >= 20) {
        console.log(`Matchmaker timeout for ${playerA.playerId}. Pairing with adaptive bot.`);
        matchedIds.add(playerA.playerId);
        
        // Remove from queue and start Bot game
        this.queue.splice(i, 1);
        i--; // Adjust index
        
        GameManager.createBotGame(playerA.playerId, playerA.socket, playerA.elo);
        continue;
      }

      // Look for a human opponent
      for (let j = i + 1; j < this.queue.length; j++) {
        const playerB = this.queue[j];
        if (matchedIds.has(playerB.playerId)) continue;

        const eloDiff = Math.abs(playerA.elo - playerB.elo);
        const elapsedSecondsB = (now - playerB.joinedAt) / 1000;
        
        // Allowable Elo window grows over time
        const maxEloDiff = 150 + Math.max(elapsedSecondsA, elapsedSecondsB) * 15;

        if (eloDiff <= maxEloDiff) {
          if (eloDiff < minEloDiff) {
            minEloDiff = eloDiff;
            bestMatchIdx = j;
          }
        }
      }

      if (bestMatchIdx !== -1) {
        const playerB = this.queue[bestMatchIdx];
        console.log(`Matched human players ${playerA.playerId} (Elo: ${playerA.elo}) and ${playerB.playerId} (Elo: ${playerB.elo}) with difference ${minEloDiff}`);
        
        matchedIds.add(playerA.playerId);
        matchedIds.add(playerB.playerId);

        // Remove both from queue (careful with indexing, splice higher index first)
        this.queue.splice(bestMatchIdx, 1);
        this.queue.splice(i, 1);
        i--; // Adjust index since we removed A

        GameManager.createGame(
          playerA.playerId, playerA.socket, playerA.elo,
          playerB.playerId, playerB.socket, playerB.elo
        );
      }
    }
  }
}

export const Matchmaker = new MatchmakerClass();
