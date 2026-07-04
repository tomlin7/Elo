import { elo } from "./proto/elo_proto.js";
import { GameManager, GamePlayer, GameRoom } from "./game.ts";
import { dbService } from "./db.ts";

const MatchNodeStatus = elo.v3.MatchNodeStatus;
const TournamentRound = elo.v3.TournamentRound;
const TournamentNode = elo.v3.TournamentNode;
const TournamentBracketUpdate = elo.v3.TournamentBracketUpdate;
const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;
const MatchState = elo.v3.MatchState;
const RoomType = elo.v3.RoomType;

export class Tournament {
  id: string;
  players: { id: string; username: string; ws: any }[] = [];
  spectators: any[] = [];
  nodes: elo.v3.ITournamentNode[] = [];
  activeRooms = new Map<string, GameRoom>();
  roundStartTime: number = 0;

  constructor(id: string, initialPlayers: { id: string; username: string; ws: any }[]) {
    this.id = id;
    this.players = initialPlayers;
    this.initializeBracket();
  }

  private initializeBracket() {
    // 4 Quarterfinals
    for (let i = 0; i < 4; i++) {
      const p1 = this.players[i * 2];
      const p2 = this.players[i * 2 + 1];
      this.nodes.push({
        nodeId: `Q${i + 1}`,
        roundTier: TournamentRound.ROUND_QUARTERFINALS,
        status: MatchNodeStatus.STATUS_IN_PROGRESS,
        playerOneId: p1.id,
        playerTwoId: p2.id,
        playerOneUsername: p1.username,
        playerTwoUsername: p2.username,
        winnerId: "",
        activeRoomId: ""
      });
    }

    // 2 Semifinals
    for (let i = 0; i < 2; i++) {
      this.nodes.push({
        nodeId: `S${i + 1}`,
        roundTier: TournamentRound.ROUND_SEMIFINALS,
        status: MatchNodeStatus.STATUS_PENDING,
        playerOneId: "",
        playerTwoId: "",
        playerOneUsername: "TBD",
        playerTwoUsername: "TBD",
        winnerId: "",
        activeRoomId: ""
      });
    }

    // 1 Final
    this.nodes.push({
      nodeId: `F1`,
      roundTier: TournamentRound.ROUND_FINALS,
      status: MatchNodeStatus.STATUS_PENDING,
      playerOneId: "",
      playerTwoId: "",
      playerOneUsername: "TBD",
      playerTwoUsername: "TBD",
      winnerId: "",
      activeRoomId: ""
    });

    this.startRoundMatches(TournamentRound.ROUND_QUARTERFINALS);
  }

  private startRoundMatches(round: elo.v3.TournamentRound) {
    console.log(`[TOURNAMENT ${this.id}] Starting matches for round: ${round}`);
    this.roundStartTime = Date.now();

    const roundNodes = this.nodes.filter(n => n.roundTier === round);

    for (const node of roundNodes) {
      if (!node.playerOneId || !node.playerTwoId) {
        // One of the players forfeits/disconnected, advance the other automatically
        const activePlayer = node.playerOneId || node.playerTwoId;
        if (activePlayer) {
          node.winnerId = activePlayer;
          node.status = MatchNodeStatus.STATUS_COMPLETED;
          console.log(`[TOURNAMENT ${this.id}] Node ${node.nodeId} advanced due to missing opponent.`);
        }
        continue;
      }

      node.status = MatchNodeStatus.STATUS_IN_PROGRESS;
      const roomId = `room_tourney_${this.id}_${node.nodeId}`;
      node.activeRoomId = roomId;

      const p1 = this.players.find(p => p.id === node.playerOneId)!;
      const p2 = this.players.find(p => p.id === node.playerTwoId)!;

      const gameP1: GamePlayer = {
        id: p1.id,
        username: p1.username,
        score: 0,
        streak: 0,
        maxStreak: 0,
        ghostInput: "",
        elo: 1000,
        isBot: false,
        socket: p1.ws,
        questionIndex: 0,
        level: 1,
        activeTitle: "TOURNAMENT",
        lastKeystrokeTime: 0,
        consecutiveFastInputs: 0,
        isFlaggedCheat: false
      };

      const gameP2: GamePlayer = {
        id: p2.id,
        username: p2.username,
        score: 0,
        streak: 0,
        maxStreak: 0,
        ghostInput: "",
        elo: 1000,
        isBot: false,
        socket: p2.ws,
        questionIndex: 0,
        level: 1,
        activeTitle: "TOURNAMENT",
        lastKeystrokeTime: 0,
        consecutiveFastInputs: 0,
        isFlaggedCheat: false
      };

      // Provision room in GameManager
      const room = new GameRoom(
        roomId,
        gameP1,
        gameP2,
        RoomType.ROOM_TYPE_TOURNAMENT,
        "", // no code
        false, // no division
        true, // allow multiplication
        60 // duration
      );

      // Override room endGame to notify tournament engine
      const originalEndGame = (room as any).endGame.bind(room);
      (room as any).endGame = (winnerId: string | null) => {
        originalEndGame(winnerId);
        this.handleMatchComplete(node.nodeId, room.winnerId);
      };

      this.activeRooms.set(roomId, room);
      GameManager.getRoom = (rId) => this.activeRooms.get(rId) || (GameManager as any).activeRooms.get(rId);
    }

    this.broadcastBracket();
  }

  private handleMatchComplete(nodeId: string, winnerId: string | null) {
    const node = this.nodes.find(n => n.nodeId === nodeId)!;
    node.status = MatchNodeStatus.STATUS_COMPLETED;
    node.winnerId = winnerId || node.playerOneId; // fallback if draw
    console.log(`[TOURNAMENT ${this.id}] Node ${node.nodeId} completed. Winner: ${node.winnerId}`);

    this.activeRooms.delete(node.activeRoomId);

    // Sync waiting users
    this.broadcastBracket();

    // Check if current round is complete
    const currentRound = node.roundTier;
    const roundNodes = this.nodes.filter(n => n.roundTier === currentRound);
    const roundComplete = roundNodes.every(n => n.status === MatchNodeStatus.STATUS_COMPLETED);

    if (roundComplete) {
      this.advanceToNextRound(currentRound);
    }
  }

  private advanceToNextRound(completedRound: elo.v3.TournamentRound) {
    if (completedRound === TournamentRound.ROUND_FINALS) {
      console.log(`[TOURNAMENT ${this.id}] Completed! Master DB updated.`);
      const finalNode = this.nodes.find(n => n.roundTier === TournamentRound.ROUND_FINALS)!;
      
      // Save stats to db (central commits on edge completion)
      if (finalNode.winnerId) {
        dbService.updatePlayerProgression(finalNode.winnerId, 300, 1, 500); // 500 Credits, 300 XP
      }

      this.players.forEach(p => {
        try {
          const update = ServerGameStateUpdate.create({
            roomId: "",
            state: MatchState.MATCH_STATE_FINISHED,
            winnerId: finalNode.winnerId || undefined,
            bracketUpdate: {
              tournamentId: this.id,
              bracketNodes: this.nodes,
              nextRoundGlobalStartTime: 0
            }
          });
          p.ws.send(ServerGameStateUpdate.encode(update).finish());
        } catch {}
      });

      TournamentManager.removeTournament(this.id);
      return;
    }

    const nextRound = completedRound === TournamentRound.ROUND_QUARTERFINALS
      ? TournamentRound.ROUND_SEMIFINALS
      : TournamentRound.ROUND_FINALS;

    const completedNodes = this.nodes.filter(n => n.roundTier === completedRound);
    const nextNodes = this.nodes.filter(n => n.roundTier === nextRound);

    for (let i = 0; i < nextNodes.length; i++) {
      const nNode = nextNodes[i];
      const leftNode = completedNodes[i * 2];
      const rightNode = completedNodes[i * 2 + 1];

      nNode.playerOneId = leftNode.winnerId || "";
      nNode.playerTwoId = rightNode.winnerId || "";
      
      const p1 = this.players.find(p => p.id === nNode.playerOneId);
      const p2 = this.players.find(p => p.id === nNode.playerTwoId);

      nNode.playerOneUsername = p1 ? p1.username : "Forfeited";
      nNode.playerTwoUsername = p2 ? p2.username : "Forfeited";
    }

    // Delay start of next round for 5 seconds countdown transition
    setTimeout(() => {
      this.startRoundMatches(nextRound);
    }, 5000);
  }

  broadcastBracket() {
    const update = ServerGameStateUpdate.create({
      roomId: `tournament_wait_${this.id}`,
      state: MatchState.MATCH_STATE_UNSPECIFIED,
      bracketUpdate: {
        tournamentId: this.id,
        bracketNodes: this.nodes,
        nextRoundGlobalStartTime: this.roundStartTime + 65000
      }
    });
    const buffer = ServerGameStateUpdate.encode(update).finish();

    // Broadcast to waiting competitors in wait lobby
    this.players.forEach(p => {
      // Check if they are currently waiting (completed their match but not active in a sub-room)
      const isActiveInMatch = Array.from(this.activeRooms.values()).some(r => r.playerOne.id === p.id || r.playerTwo.id === p.id);
      if (!isActiveInMatch) {
        try {
          p.ws.send(buffer);
        } catch {}
      }
    });

    // Broadcast to spectators
    this.spectators.forEach(s => {
      try {
        s.send(buffer);
      } catch {}
    });
  }
}

class TournamentManagerClass {
  private activeTournaments = new Map<string, Tournament>();
  private queue: { id: string; username: string; ws: any }[] = [];

  joinQueue(playerId: string, ws: any) {
    const user = dbService.getPlayer(playerId);
    const username = user ? user.username : `Duelist_${playerId.slice(0, 4)}`;

    // Avoid duplicates
    if (this.queue.some(q => q.id === playerId)) return;

    this.queue.push({ id: playerId, username, ws });
    console.log(`[TOURNAMENT MATCHMAKER] Pool size: ${this.queue.length}/8`);

    if (this.queue.length >= 8) {
      const pool = this.queue.splice(0, 8);
      const tournamentId = `tourney_${Date.now()}`;
      const tournament = new Tournament(tournamentId, pool);
      this.activeTournaments.set(tournamentId, tournament);
      console.log(`[TOURNAMENT MATCHMAKER] Launched live bracket tournament: ${tournamentId}`);
    }
  }

  leaveQueue(playerId: string) {
    this.queue = this.queue.filter(q => q.id !== playerId);
  }

  getTournament(id: string) {
    return this.activeTournaments.get(id);
  }

  removeTournament(id: string) {
    this.activeTournaments.delete(id);
  }
}

export const TournamentManager = new TournamentManagerClass();
