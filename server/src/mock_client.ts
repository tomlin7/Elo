import { elo } from "./proto/elo_proto.js";

const ClientAction = elo.v2.ClientAction;
const ServerGameStateUpdate = elo.v2.ServerGameStateUpdate;

const serverUrl = "ws://localhost:8080/ws?playerId=mock_player";
console.log(`Connecting to: ${serverUrl}`);

const ws = new WebSocket(serverUrl);
ws.binaryType = "arraybuffer";

let currentRoomId = "";
let lastSolvedQuestion = "";
let isSubmitting = false;

ws.onopen = () => {
  console.log("Mock client WebSocket connected. Joining queue...");
  
  // Send join queue request
  const action = ClientAction.create({
    joinQueuePlayerId: "mock_player",
    playerId: "mock_player"
  });
  const buffer = ClientAction.encode(action).finish();
  ws.send(buffer);
};

ws.onmessage = (event) => {
  try {
    const buffer = new Uint8Array(event.data as ArrayBuffer);
    const update = ServerGameStateUpdate.decode(buffer);
    
    currentRoomId = update.roomId;
    const isPlayerOne = update.playerOne.playerId === "mock_player";
    const me = isPlayerOne ? update.playerOne : update.playerTwo;
    const opponent = isPlayerOne ? update.playerTwo : update.playerOne;

    console.log(`\n[State Update] Room: ${update.roomId} | State: ${update.state} | Timer: ${update.timeRemainingSeconds}s`);
    if (update.playerOne) {
      console.log(`P1 (${update.playerOne.username}): Score=${update.playerOne.currentScore}, Streak=${update.playerOne.currentStreak}, Ghost=${update.playerOne.ghostInput}`);
    }
    if (update.playerTwo) {
      console.log(`P2 (${update.playerTwo.username}): Score=${update.playerTwo.currentScore}, Streak=${update.playerTwo.currentStreak}, Ghost=${update.playerTwo.ghostInput}`);
    }

    if (update.state === 2) { // ACTIVE
      const questionText = update.nextQuestionText;
      
      // Only trigger solving if we have a new question and are not already in the middle of typing/submitting
      if (questionText && questionText !== lastSolvedQuestion && !isSubmitting) {
        lastSolvedQuestion = questionText;
        isSubmitting = true;

        console.log(`>>> Solving New Question: ${questionText}`);
        
        try {
          const parts = questionText.split(" ");
          const num1 = parseInt(parts[0]);
          const op = parts[1];
          const num2 = parseInt(parts[2]);
          let answer = 0;
          if (op === "+") answer = num1 + num2;
          else if (op === "-") answer = num1 - num2;
          else if (op === "*") answer = num1 * num2;
          else if (op === "/") answer = Math.round(num1 / num2); // division solving support
          
          const ansStr = answer.toString();
          console.log(`>>> Calculated Answer: ${ansStr}`);

          // Simulate keystrokes sequentially (Fast cadence < 120ms to trigger server anti-cheat alerts!)
          let charIndex = 1;
          const typeNextChar = () => {
            if (charIndex <= ansStr.length) {
              const ghostInput = ansStr.slice(0, charIndex);
              const keystrokeAction = ClientAction.create({
                roomId: currentRoomId,
                playerId: "mock_player",
                timestamp: Date.now(),
                currentInput: ghostInput
              });
              const buffer = ClientAction.encode(keystrokeAction).finish();
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(buffer);
              }
              charIndex++;
              setTimeout(typeNextChar, 40); // 40ms interval triggers anti-cheat logic
            } else {
              // Final submission
              setTimeout(() => {
                const submitAction = ClientAction.create({
                  roomId: currentRoomId,
                  playerId: "mock_player",
                  timestamp: Date.now(),
                  submittedAnswer: ansStr
                });
                const buffer = ClientAction.encode(submitAction).finish();
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(buffer);
                  console.log(`>>> Sent Submission: ${ansStr}`);
                }
                isSubmitting = false; // Allow solving next question
              }, 40);
            }
          };

          // Start typing after a short thinking delay
          setTimeout(typeNextChar, 100);

        } catch (solveError) {
          console.error("Solver error:", solveError);
          isSubmitting = false;
        }
      }
    } else if (update.state === 4) { // FINISHED
      console.log(`\n========================================`);
      console.log(`Match finished! Winner: ${update.winnerId}`);
      if (isPlayerOne) {
        console.log(`My XP earned: +${update.playerOneXpChange} XP`);
        console.log(`My Elo change: ${update.playerOneEloChange}`);
      } else {
        console.log(`My XP earned: +${update.playerTwoXpChange} XP`);
        console.log(`My Elo change: ${update.playerTwoEloChange}`);
      }
      console.log(`========================================`);
      ws.close();
      process.exit(0);
    }
  } catch (err) {
    console.error("Failed to process server message:", err);
  }
};

ws.onclose = () => {
  console.log("Mock client disconnected.");
};
