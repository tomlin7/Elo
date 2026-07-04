import { elo } from "./proto/elo_proto.js";

const ClientAction = elo.v3.ClientAction;
const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;

const BOT_COUNT = 8;
const serverUrl = "ws://localhost:8080/ws";

class TournamentBot {
  id: string;
  username: string;
  ws: WebSocket;
  currentRoomId: string = "";
  lastSolvedQuestion: string = "";
  isSubmitting: boolean = false;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
    this.ws = new WebSocket(`${serverUrl}?playerId=${id}`);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      console.log(`[BOT ${username}] Connected. Joining tournament queue...`);
      const action = ClientAction.create({
        playerId: this.id,
        joinTournamentPlayerId: this.id
      });
      this.ws.send(ClientAction.encode(action).finish());
    };

    this.ws.onmessage = (event) => {
      try {
        const buffer = new Uint8Array(event.data as ArrayBuffer);
        const update = ServerGameStateUpdate.decode(buffer);

        if (update.bracketUpdate) {
          this.printBracket(update.bracketUpdate);
        }

        if (update.state === 2) { // ACTIVE
          this.currentRoomId = update.roomId;
          this.solveQuestion(update.nextQuestionText);
        }

        if (update.state === 4 && update.winnerId === this.id) {
          console.log(`\n🎉 [BOT ${this.username}] VICTORY! Advanced to next round.`);
        }
      } catch (err) {
        console.error("Bot error processing message:", err);
      }
    };
  }

  private solveQuestion(questionText: string) {
    if (!questionText || questionText === this.lastSolvedQuestion || this.isSubmitting) return;

    this.lastSolvedQuestion = questionText;
    this.isSubmitting = true;

    try {
      const parts = questionText.split(" ");
      const num1 = parseInt(parts[0]);
      const op = parts[1];
      const num2 = parseInt(parts[2]);
      let answer = 0;

      if (op === "+") answer = num1 + num2;
      else if (op === "-") answer = num1 - num2;
      else if (op === "*") answer = num1 * num2;
      else if (op === "/") answer = Math.round(num1 / num2);

      const ansStr = answer.toString();

      // Submit correct answer after a short delay (simulating fast human solver)
      setTimeout(() => {
        const action = ClientAction.create({
          roomId: this.currentRoomId,
          playerId: this.id,
          timestamp: Date.now(),
          submittedAnswer: ansStr
        });
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(ClientAction.encode(action).finish());
        }
        this.isSubmitting = false;
      }, 500);
    } catch {
      this.isSubmitting = false;
    }
  }

  private printBracket(bracket: elo.v3.ITournamentBracketUpdate) {
    // Only bot 1 prints the bracket to prevent console spam
    if (this.id !== "bot_player_1") return;

    console.log(`\n=== TOURNAMENT BRACKET UPDATE (${bracket.tournamentId}) ===`);
    bracket.bracketNodes?.forEach(node => {
      const statusStr = node.status === 0 ? "PENDING" : node.status === 1 ? "IN_PROGRESS" : "COMPLETED";
      console.log(
        `Node ${node.nodeId} (${node.playerOneUsername || "TBD"} vs ${node.playerTwoUsername || "TBD"}) -> Status: ${statusStr} | Winner: ${node.winnerId || "None"}`
      );
    });
    console.log(`====================================================`);
  }
}

// Start 8 concurrent bots
console.log("Spawning 8 bots for live tournament test...");
for (let i = 1; i <= BOT_COUNT; i++) {
  new TournamentBot(`bot_player_${i}`, `TourneyBot_${i}`);
}
