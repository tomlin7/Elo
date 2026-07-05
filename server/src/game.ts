import { elo } from "./proto/elo_proto.js";
import { dbService, Player } from "./db.ts";
import { LiveOpsManager } from "./liveops.ts";

const MatchState = elo.v3.MatchState;
const RoomType = elo.v3.RoomType;
const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;

export interface GamePlayer {
  id: string;
  username: string;
  score: number;
  streak: number;
  maxStreak: number;
  ghostInput: string;
  elo: number;
  isBot: boolean;
  socket: any | null; // null if bot or disconnected
  questionIndex: number;
  level: number;
  activeTitle: string;
  lastKeystrokeTime: number;
  consecutiveFastInputs: number;
  isFlaggedCheat: boolean;
  isSandboxed?: boolean;
  operationStats?: Map<string, { totalPresented: number; totalCorrect: number; totalSolveTimeMs: number }>;
  currentQuestionStartTime?: number;
}

import { GPC } from "./gpc.ts";

interface Question {
  text: string;
  answer: string;
}

function generateQuestion(allowDivision = false, allowMultiplication = true): Question {
  // 25% probability of generating complex GPC content (Epic 2)
  if (Math.random() < 0.25) {
    const modes = ["MATRIX_DETERMINANT", "MODULAR_CONGRUENCE"];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    return GPC.generateQuestion(mode);
  }

  const ops: string[] = ["+", "-"];
  if (allowMultiplication) ops.push("*");
  if (allowDivision) ops.push("/");

  const op = ops[Math.floor(Math.random() * ops.length)];
  let num1 = 0;
  let num2 = 0;
  let text = "";
  let answer = 0;

  if (op === "+") {
    num1 = Math.floor(Math.random() * 89) + 10; // 10-98
    num2 = Math.floor(Math.random() * 89) + 10;
    text = `${num1} + ${num2}`;
    answer = num1 + num2;
  } else if (op === "-") {
    num1 = Math.floor(Math.random() * 89) + 10;
    num2 = Math.floor(Math.random() * (num1 - 5)) + 5; // ensure positive answer
    text = `${num1} - ${num2}`;
    answer = num1 - num2;
  } else if (op === "*") {
    num1 = Math.floor(Math.random() * 11) + 2; // 2-12
    num2 = Math.floor(Math.random() * 12) + 3; // 3-14
    text = `${num1} * ${num2}`;
    answer = num1 * num2;
  } else if (op === "/") {
    // Division: divisor (2-10) and quotient (2-12)
    num2 = Math.floor(Math.random() * 9) + 2;
    const quotient = Math.floor(Math.random() * 11) + 2;
    num1 = num2 * quotient;
    text = `${num1} / ${num2}`;
    answer = quotient;
  }

  return {
    text,
    answer: answer.toString()
  };
}

export class GameRoom {
  id: string;
  playerOne: GamePlayer;
  playerTwo: GamePlayer;
  state: number; // elo.v2.MatchState
  roomType: number; // elo.v2.RoomType
  privateRoomCode: string;
  timeRemainingSeconds: number = 60;
  questions: Question[] = [];
  
  allowDivision: boolean = false;
  allowMultiplication: boolean = true;
  durationSeconds: number = 60;
  spectators: any[] = [];

  private countdownTimer: Timer | null = null;
  private gameTimer: Timer | null = null;
  private botTimer: Timer | null = null;
  private reconnectTimers = new Map<string, Timer>();

  playerOneEloChange: number = 0;
  playerTwoEloChange: number = 0;
  playerOneXpChange: number = 0;
  playerTwoXpChange: number = 0;
  winnerId: string | null = null;
  playerOneReconToken: string = "";
  playerTwoReconToken: string = "";

  constructor(
    id: string,
    p1: GamePlayer,
    p2: GamePlayer,
    roomType = RoomType.ROOM_TYPE_RANKED,
    privateRoomCode = "",
    allowDivision = false,
    allowMultiplication = true,
    durationSeconds = 60
  ) {
    this.id = id;
    this.playerOne = p1;
    this.playerTwo = p2;
    this.roomType = roomType;
    this.spectators = [];
    this.privateRoomCode = privateRoomCode;
    this.allowDivision = allowDivision;
    this.allowMultiplication = allowMultiplication;
    this.durationSeconds = durationSeconds;
    this.timeRemainingSeconds = durationSeconds;
    this.playerOneReconToken = `recon_p1_${id}_${Math.random().toString(36).substring(2, 7)}`;
    this.playerTwoReconToken = `recon_p2_${id}_${Math.random().toString(36).substring(2, 7)}`;
    this.state = MatchState.MATCH_STATE_COUNTDOWN;

    // Prefill questions with rule configurations
    for (let i = 0; i < 50; i++) {
      this.questions.push(generateQuestion(this.allowDivision, this.allowMultiplication));
    }

    this.startCountdown();
  }

  private startCountdown() {
    let countdownVal = 3;
    this.broadcastState();

    this.countdownTimer = setInterval(() => {
      countdownVal--;
      if (countdownVal <= 0) {
        if (this.countdownTimer) clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        this.startGame();
      } else {
        this.broadcastState();
      }
    }, 1000);
  }

  private startGame() {
    this.state = MatchState.MATCH_STATE_ACTIVE;
    this.timeRemainingSeconds = this.durationSeconds;
    this.broadcastState();

    // Start game timer
    this.gameTimer = setInterval(() => {
      this.timeRemainingSeconds--;
      if (this.timeRemainingSeconds <= 0) {
        this.endGame(null);
      } else {
        this.broadcastState();
      }
    }, 1000);

    if (this.playerOne.isBot) this.startBotLogic(this.playerOne);
    if (this.playerTwo.isBot) this.startBotLogic(this.playerTwo);
  }

  private startBotLogic(bot: GamePlayer) {
    const runBotTurn = () => {
      if (this.state !== MatchState.MATCH_STATE_ACTIVE) return;

      const currentQuestion = this.questions[bot.questionIndex];
      const answer = currentQuestion.answer;
      
      const eloFactor = Math.max(0, (bot.elo - 800) / 1000);
      const delay = Math.max(1200, 3500 - eloFactor * 2500) + (Math.random() * 1000 - 500);

      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (this.state !== MatchState.MATCH_STATE_ACTIVE) {
          clearInterval(typeInterval);
          return;
        }

        charIdx++;
        bot.ghostInput = answer.slice(0, charIdx);
        this.broadcastState();

        if (charIdx >= answer.length) {
          clearInterval(typeInterval);

          setTimeout(() => {
            if (this.state !== MatchState.MATCH_STATE_ACTIVE) return;

            const errorRate = Math.max(0.02, 0.15 - (bot.elo - 900) * 0.0002);
            const isCorrect = Math.random() > errorRate;

            if (isCorrect) {
              bot.score++;
              bot.streak++;
              bot.maxStreak = Math.max(bot.maxStreak, bot.streak);
              bot.ghostInput = "";
              bot.questionIndex++;
              
              if (bot.questionIndex >= this.questions.length - 2) {
                this.questions.push(generateQuestion(this.allowDivision, this.allowMultiplication));
              }

              this.broadcastState();

              if (bot.score >= 20) {
                this.endGame(bot.id);
              } else {
                setTimeout(runBotTurn, 800 + Math.random() * 500);
              }
            } else {
              bot.ghostInput = (parseInt(answer) + (Math.random() > 0.5 ? 1 : -1)).toString();
              bot.streak = 0;
              this.broadcastState();
              
              setTimeout(() => {
                bot.ghostInput = "";
                this.broadcastState();
                setTimeout(runBotTurn, 1000);
              }, 600);
            }
          }, 300);
        }
      }, 200 + Math.random() * 100);
    };

    setTimeout(runBotTurn, 1500 + Math.random() * 1000);
  }

  handleClientAction(playerId: string, action: elo.v2.IClientAction) {
    if (this.state !== MatchState.MATCH_STATE_ACTIVE) return;

    const player = this.playerOne.id === playerId ? this.playerOne : this.playerTwo;

    // Server-Side Anti-Cheat Keystroke Cadence Check
    if (!player.isBot) {
      const clientTime = action.timestamp ? Number(action.timestamp) : Date.now();
      if (player.lastKeystrokeTime > 0) {
        const delta = clientTime - player.lastKeystrokeTime;
        if (delta > 0 && delta < 120) {
          player.consecutiveFastInputs++;
          if (player.consecutiveFastInputs >= 4 && !player.isSandboxed) {
            player.isSandboxed = true;
            player.isFlaggedCheat = true;
            console.warn(`[SECURITY ALERT] Player ${player.username} (${player.id}) moved to SILENT_SANDBOX due to bot-like cadence.`);
            dbService.logSecurityViolation(player.id, "CADENCE_ANOMALY", `Consecutive delta: ${delta}ms`, "SANDBOXED");
          }
        } else if (delta > 0) {
          player.consecutiveFastInputs = 0;
        }
      }
      player.lastKeystrokeTime = clientTime;
    }

    if (action.payload === "currentInput") {
      player.ghostInput = action.currentInput || "";
      this.broadcastState();
    } else if (action.payload === "submittedAnswer") {
      const submitted = action.submittedAnswer || "";
      const currentQuestion = this.questions[player.questionIndex];
      player.ghostInput = submitted;

      if (!player.operationStats) player.operationStats = new Map();
      if (!player.currentQuestionStartTime) player.currentQuestionStartTime = Date.now();

      const opType = currentQuestion.text.includes("*")
        ? "MULTIPLICATION"
        : currentQuestion.text.includes("/")
        ? "DIVISION"
        : "ADD_SUB";

      let statsRec = player.operationStats.get(opType);
      if (!statsRec) {
        statsRec = { totalPresented: 0, totalCorrect: 0, totalSolveTimeMs: 0 };
        player.operationStats.set(opType, statsRec);
      }

      // Honey-Pot Sandbox Trap Check
      if (player.isSandboxed) {
        if (submitted === currentQuestion.answer) {
          dbService.updatePlayerBanStatus(player.id, 1);
          dbService.logSecurityViolation(player.id, "HONEYPOT_FAIL", `Submitted answer '${submitted}' for displayed question '999/0 = ?'`, "PERMANENT_BAN");
          console.error(`[SECURITY BAN] Player ${player.username} (${player.id}) banned via honeypot trap.`);
          this.endGame(this.playerOne.id === player.id ? this.playerTwo.id : this.playerOne.id);
          return;
        }
        player.streak = 0;
        this.broadcastState();
        return;
      }

      if (submitted === currentQuestion.answer) {
        statsRec.totalPresented++;
        statsRec.totalCorrect++;
        statsRec.totalSolveTimeMs += (Date.now() - player.currentQuestionStartTime);
        player.currentQuestionStartTime = Date.now();

        player.score++;
        player.streak++;
        player.maxStreak = Math.max(player.maxStreak, player.streak);
        player.ghostInput = "";
        player.questionIndex++;

        if (player.questionIndex >= this.questions.length - 2) {
          this.questions.push(generateQuestion(this.allowDivision, this.allowMultiplication));
        }

        this.broadcastState();

        if (player.score >= 20) {
          this.endGame(player.id);
        }
      } else {
        if (!currentQuestion.answer.startsWith(submitted) || submitted.length >= currentQuestion.answer.length) {
          statsRec.totalPresented++; // incorrect attempt counts as presented
          player.streak = 0;
          this.broadcastState();
        } else {
          this.broadcastState();
        }
      }
    }
  }

  handleDisconnect(playerId: string) {
    if (this.state !== MatchState.MATCH_STATE_ACTIVE) return;

    console.log(`Player ${playerId} disconnected from game ${this.id}. Pausing game.`);
    this.state = MatchState.MATCH_STATE_PAUSED_DISCONNECT;
    
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }

    this.broadcastState();

    const reconnectTimer = setTimeout(() => {
      console.log(`Player ${playerId} failed to reconnect within 7 seconds. Forfeiting game.`);
      const opponent = this.playerOne.id === playerId ? this.playerTwo : this.playerOne;
      this.endGame(opponent.id);
    }, 7000);

    this.reconnectTimers.set(playerId, reconnectTimer);
  }

  handleReconnect(playerId: string, socket: any) {
    const timer = this.reconnectTimers.get(playerId);
    if (timer) {
      clearTimeout(timer);
      this.reconnectTimers.delete(playerId);
    }

    const player = this.playerOne.id === playerId ? this.playerOne : this.playerTwo;
    player.socket = socket;
    player.socket.data = { playerId: player.id, roomId: this.id };

    console.log(`Player ${playerId} successfully reconnected to game ${this.id}. Resuming game.`);
    this.state = MatchState.MATCH_STATE_ACTIVE;

    if (!this.gameTimer) {
      this.gameTimer = setInterval(() => {
        this.timeRemainingSeconds--;
        if (this.timeRemainingSeconds <= 0) {
          this.endGame(null);
        } else {
          this.broadcastState();
        }
      }, 1000);
    }

    this.broadcastState();
  }

  private endGame(winnerId: string | null) {
    if (this.state === MatchState.MATCH_STATE_FINISHED) return;

    this.state = MatchState.MATCH_STATE_FINISHED;
    this.winnerId = winnerId;

    if (this.countdownTimer) clearInterval(this.countdownTimer);
    if (this.gameTimer) clearInterval(this.gameTimer);
    for (const [_, timer] of this.reconnectTimers) {
      clearTimeout(timer);
    }
    this.reconnectTimers.clear();

    if (!winnerId) {
      if (this.playerOne.score > this.playerTwo.score) {
        this.winnerId = this.playerOne.id;
      } else if (this.playerTwo.score > this.playerOne.score) {
        this.winnerId = this.playerTwo.id;
      } else {
        this.winnerId = null;
      }
    }

    // Progression XP & Streak check (runs first so updates persist in DB and ELO changes match)
    this.processProgression();

    if (this.roomType === RoomType.ROOM_TYPE_RANKED) {
      this.calculateElo();
    }

    this.broadcastState();

    if (!this.playerOne.isBot && !this.playerTwo.isBot && this.roomType === RoomType.ROOM_TYPE_RANKED) {
      dbService.saveMatch({
        id: this.id,
        player_one_id: this.playerOne.id,
        player_two_id: this.playerTwo.id,
        player_one_score: this.playerOne.score,
        player_two_score: this.playerTwo.score,
        winner_id: this.winnerId,
        player_one_elo_change: this.playerOneEloChange,
        player_two_elo_change: this.playerTwoEloChange,
      });

      const getTelemetryStats = (player: GamePlayer) => {
        const stats: any[] = [];
        if (player.operationStats) {
          player.operationStats.forEach((val, key) => {
            const avg = val.totalCorrect > 0 ? Math.round(val.totalSolveTimeMs / val.totalCorrect) : 0;
            stats.push({
              operationType: key,
              totalPresented: val.totalPresented,
              totalCorrect: val.totalCorrect,
              averageSolveTimeMs: avg
            });
          });
        }
        return stats;
      };

      dbService.saveMatchTelemetry(this.id, this.playerOne.id, getTelemetryStats(this.playerOne));
      dbService.saveMatchTelemetry(this.id, this.playerTwo.id, getTelemetryStats(this.playerTwo));
    }

    setTimeout(() => {
      GameManager.removeRoom(this.id);
    }, 5000);
  }

  private processProgression() {
    const processPlayerXP = (player: GamePlayer, opponent: GamePlayer): number => {
      if (player.isBot) return 0;
      
      const outcomeVal = this.winnerId === player.id ? 1 : this.winnerId === null ? 0.5 : 0;
      const baseXP = Math.round((outcomeVal * 100) + (player.score * 5) + (player.maxStreak * 2));
      
      // Live-Ops Double XP modifier (Epic 3)
      const xpEarned = Math.round(baseXP * LiveOpsManager.getMultiplierForXP());

      const record = dbService.getPlayer(player.id);
      if (record) {
        const newXP = record.xp + xpEarned;
        const newLevel = Math.floor(newXP / 1000) + 1;
        let baseCredits = 0;
        
        // Passive credits from XP level-ups
        if (newLevel > record.level) {
          baseCredits += (newLevel - record.level) * 200;
        }

        // Passive match completion credits (5 credits per correct answer)
        baseCredits += player.score * 5;

        // Daily Streak logic (Ranked matches only)
        if (this.roomType === RoomType.ROOM_TYPE_RANKED) {
          const now = new Date();
          const currentDateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
          
          const yesterday = new Date();
          yesterday.setDate(now.getDate() - 1);
          const yesterdayDateStr = yesterday.toISOString().split("T")[0];

          let completedCount = record.completed_today_count;
          let streak = record.daily_streak;

          if (record.last_played_date === currentDateStr) {
            completedCount++;
            if (completedCount === 3) {
              streak++;
              baseCredits += 100;
            }
            dbService.updatePlayerStreak(player.id, streak, currentDateStr, completedCount);
          } else if (record.last_played_date === yesterdayDateStr || record.last_played_date === null) {
            completedCount = 1;
            dbService.updatePlayerStreak(player.id, streak, currentDateStr, completedCount);
          } else {
            completedCount = 1;
            streak = 0;
            dbService.updatePlayerStreak(player.id, streak, currentDateStr, completedCount);
          }
        }

        // Live-Ops Double Credits modifier (Epic 3)
        const creditsEarned = Math.round(baseCredits * LiveOpsManager.getMultiplierForCredits());

        dbService.updatePlayerProgression(player.id, xpEarned, newLevel, creditsEarned);

        // Daily challenges progression checkpoints (Epic 2)
        dbService.incrementChallengeProgress(player.id, "SPEED_STREAK", player.score);
        dbService.incrementChallengeProgress(player.id, "ENDURANCE_STREAK", player.maxStreak);
        if (this.winnerId === player.id) {
          dbService.incrementChallengeProgress(player.id, "WIN_COUNT", 1);
        }

        // Increment Combat Pass progression (Epic 1)
        dbService.incrementCombatStars(player.id, "season_1", this.winnerId === player.id ? 3 : 1);
      }
      return xpEarned;
    };

    this.playerOneXpChange = processPlayerXP(this.playerOne, this.playerTwo);
    this.playerTwoXpChange = processPlayerXP(this.playerTwo, this.playerOne);
  }

  private calculateElo() {
    const r1 = this.playerOne.elo;
    const r2 = this.playerTwo.elo;

    const e1 = 1 / (1 + Math.pow(10, (r2 - r1) / 400));
    const e2 = 1 / (1 + Math.pow(10, (r1 - r2) / 400));

    let s1 = 0.5;
    let s2 = 0.5;

    if (this.winnerId === this.playerOne.id) {
      s1 = 1;
      s2 = 0;
    } else if (this.winnerId === this.playerTwo.id) {
      s1 = 0;
      s2 = 1;
    }

    const K = 32;
    this.playerOneEloChange = Math.round(K * (s1 - e1));
    this.playerTwoEloChange = Math.round(K * (s2 - e2));

    if (!this.playerOne.isBot) {
      const newElo = Math.max(100, r1 + this.playerOneEloChange);
      dbService.updatePlayerElo(this.playerOne.id, newElo);
    }
    if (!this.playerTwo.isBot) {
      const newElo = Math.max(100, r2 + this.playerTwoEloChange);
      dbService.updatePlayerElo(this.playerTwo.id, newElo);
    }
  }

  private broadcastState() {
    const update = ServerGameStateUpdate.create({
      roomId: this.id,
      state: this.state,
      timeRemainingSeconds: this.timeRemainingSeconds,
      roomType: this.roomType,
      privateRoomCode: this.privateRoomCode,
      playerOne: {
        playerId: this.playerOne.id,
        username: this.playerOne.username,
        currentScore: this.playerOne.score,
        currentStreak: this.playerOne.streak,
        ghostInput: this.playerOne.ghostInput,
        elo: this.playerOne.elo,
        level: this.playerOne.level,
        activeTitle: this.playerOne.activeTitle
      },
      playerTwo: {
        playerId: this.playerTwo.id,
        username: this.playerTwo.username,
        currentScore: this.playerTwo.score,
        currentStreak: this.playerTwo.streak,
        ghostInput: this.playerTwo.ghostInput,
        elo: this.playerTwo.elo,
        level: this.playerTwo.level,
        activeTitle: this.playerTwo.activeTitle
      },
      nextQuestionText: "",
      winnerId: this.winnerId || undefined,
      playerOneEloChange: this.playerOneEloChange,
      playerTwoEloChange: this.playerTwoEloChange,
      playerOneXpChange: this.playerOneXpChange,
      playerTwoXpChange: this.playerTwoXpChange
    });

    if (!this.playerOne.isBot && this.playerOne.socket) {
      update.nextQuestionText = this.playerOne.isSandboxed ? "999/0 = ?" : this.questions[this.playerOne.questionIndex].text;
      update.activeReconnectionToken = this.playerOneReconToken;
      const buffer = ServerGameStateUpdate.encode(update).finish();
      try {
        this.playerOne.socket.send(buffer);
      } catch (err) {
        console.error("Error sending update to P1:", err);
      }
    }

    if (!this.playerTwo.isBot && this.playerTwo.socket) {
      update.nextQuestionText = this.playerTwo.isSandboxed ? "999/0 = ?" : this.questions[this.playerTwo.questionIndex].text;
      update.activeReconnectionToken = this.playerTwoReconToken;
      const buffer = ServerGameStateUpdate.encode(update).finish();
      try {
        this.playerTwo.socket.send(buffer);
      } catch (err) {
        console.error("Error sending update to P2:", err);
      }
    }

    // Broadcast to spectators
    if (this.spectators.length > 0) {
      const q1 = this.questions[this.playerOne.questionIndex]?.text || "";
      const q2 = this.questions[this.playerTwo.questionIndex]?.text || "";
      update.nextQuestionText = `${q1}|${q2}`;
      
      const buffer = ServerGameStateUpdate.encode(update).finish();
      this.spectators.forEach(ws => {
        try {
          ws.send(buffer);
        } catch {}
      });
    }
  }
}

class GameManagerClass {
  private activeRooms = new Map<string, GameRoom>();
  private privateLobbies = new Map<string, { code: string; hostId: string; hostSocket: any; allowDivision: boolean; allowMultiplication: boolean; duration: number }>();
  private reconnectionMap = new Map<string, { roomId: string; playerId: string }>();

  reconnectPlayer(reconnectionToken: string, newWs: any): GameRoom | null {
    const session = this.reconnectionMap.get(reconnectionToken);
    if (!session) return null;

    const room = this.activeRooms.get(session.roomId);
    if (!room) return null;

    console.log(`[RECONNECT] Reconnecting player ${session.playerId} using token ${reconnectionToken}`);
    room.handleReconnect(session.playerId, newWs);
    return room;
  }

  createGame(
    p1Id: string, p1Socket: any, p1Elo: number,
    p2Id: string, p2Socket: any, p2Elo: number
  ) {
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    
    const p1User = dbService.getPlayer(p1Id);
    const p2User = dbService.getPlayer(p2Id);

    const playerOne: GamePlayer = {
      id: p1Id,
      username: p1User ? p1User.username : `Guest_${p1Id.slice(0, 4)}`,
      score: 0,
      streak: 0,
      maxStreak: 0,
      ghostInput: "",
      elo: p1Elo,
      isBot: false,
      socket: p1Socket,
      questionIndex: 0,
      level: p1User ? p1User.level : 1,
      activeTitle: p1User ? p1User.active_title : "",
      lastKeystrokeTime: 0,
      consecutiveFastInputs: 0,
      isFlaggedCheat: false
    };

    const playerTwo: GamePlayer = {
      id: p2Id,
      username: p2User ? p2User.username : `Guest_${p2Id.slice(0, 4)}`,
      score: 0,
      streak: 0,
      maxStreak: 0,
      ghostInput: "",
      elo: p2Elo,
      isBot: false,
      socket: p2Socket,
      questionIndex: 0,
      level: p2User ? p2User.level : 1,
      activeTitle: p2User ? p2User.active_title : "",
      lastKeystrokeTime: 0,
      consecutiveFastInputs: 0,
      isFlaggedCheat: false
    };

    p1Socket.data = { playerId: p1Id, roomId };
    p2Socket.data = { playerId: p2Id, roomId };

    const room = new GameRoom(roomId, playerOne, playerTwo);
    this.activeRooms.set(roomId, room);
    this.reconnectionMap.set(room.playerOneReconToken, { roomId, playerId: p1Id });
    this.reconnectionMap.set(room.playerTwoReconToken, { roomId, playerId: p2Id });
    console.log(`Created human match ${roomId}`);
    return room;
  }

  createBotGame(p1Id: string, p1Socket: any, p1Elo: number) {
    const roomId = `room_${Date.now()}_bot_${Math.random().toString(36).substr(2, 5)}`;
    const p1User = dbService.getPlayer(p1Id);

    const playerOne: GamePlayer = {
      id: p1Id,
      username: p1User ? p1User.username : `Guest_${p1Id.slice(0, 4)}`,
      score: 0,
      streak: 0,
      maxStreak: 0,
      ghostInput: "",
      elo: p1Elo,
      isBot: false,
      socket: p1Socket,
      questionIndex: 0,
      level: p1User ? p1User.level : 1,
      activeTitle: p1User ? p1User.active_title : "",
      lastKeystrokeTime: 0,
      consecutiveFastInputs: 0,
      isFlaggedCheat: false
    };

    const botId = `bot_${Math.random().toString(36).substr(2, 5)}`;
    const botElo = Math.max(100, Math.round(p1Elo + (Math.random() * 80 - 40)));
    const playerTwo: GamePlayer = {
      id: botId,
      username: `Bot_${Math.floor(p1Elo + (Math.random() * 60 - 30))}`,
      score: 0,
      streak: 0,
      maxStreak: 0,
      ghostInput: "",
      elo: botElo,
      isBot: true,
      socket: null,
      questionIndex: 0,
      level: Math.max(1, Math.floor(botElo / 500)),
      activeTitle: "BOT",
      lastKeystrokeTime: 0,
      consecutiveFastInputs: 0,
      isFlaggedCheat: false
    };

    p1Socket.data = { playerId: p1Id, roomId };

    const room = new GameRoom(roomId, playerOne, playerTwo);
    this.activeRooms.set(roomId, room);
    this.reconnectionMap.set(room.playerOneReconToken, { roomId, playerId: p1Id });
    this.reconnectionMap.set(room.playerTwoReconToken, { roomId, playerId: botId });
    console.log(`Created bot match ${roomId}`);
    return room;
  }

  // Phase 2: Private Custom Room Management
  createPrivateLobby(hostId: string, socket: any, req: elo.v2.ICreateCustomRoomRequest) {
    // Generate unique 6-digit room code
    let code = "";
    do {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (this.privateLobbies.has(code));

    this.privateLobbies.set(code, {
      code,
      hostId,
      hostSocket: socket,
      allowDivision: req.allowDivision || false,
      allowMultiplication: req.allowMultiplication !== false, // default true
      duration: req.customDurationSeconds || 60
    });

    console.log(`Created private lobby code: ${code} for host: ${hostId}`);
    return code;
  }

  joinPrivateLobby(guestId: string, guestSocket: any, code: string): GameRoom | null {
    const lobby = this.privateLobbies.get(code);
    if (!lobby) return null;

    // Remove lobby from list so it cannot be rejoined
    this.privateLobbies.delete(code);

    const roomId = `room_${Date.now()}_private_${code}`;
    const p1User = dbService.getPlayer(lobby.hostId);
    const p2User = dbService.getPlayer(guestId);

    const playerOne: GamePlayer = {
      id: lobby.hostId,
      username: p1User ? p1User.username : `Guest_${lobby.hostId.slice(0, 4)}`,
      score: 0,
      streak: 0,
      maxStreak: 0,
      ghostInput: "",
      elo: p1User ? p1User.elo : 1000,
      isBot: false,
      socket: lobby.hostSocket,
      questionIndex: 0,
      level: p1User ? p1User.level : 1,
      activeTitle: p1User ? p1User.active_title : "",
      lastKeystrokeTime: 0,
      consecutiveFastInputs: 0,
      isFlaggedCheat: false
    };

    const playerTwo: GamePlayer = {
      id: guestId,
      username: p2User ? p2User.username : `Guest_${guestId.slice(0, 4)}`,
      score: 0,
      streak: 0,
      maxStreak: 0,
      ghostInput: "",
      elo: p2User ? p2User.elo : 1000,
      isBot: false,
      socket: guestSocket,
      questionIndex: 0,
      level: p2User ? p2User.level : 1,
      activeTitle: p2User ? p2User.active_title : "",
      lastKeystrokeTime: 0,
      consecutiveFastInputs: 0,
      isFlaggedCheat: false
    };

    lobby.hostSocket.data = { playerId: lobby.hostId, roomId };
    guestSocket.data = { playerId: guestId, roomId };

    const room = new GameRoom(
      roomId,
      playerOne,
      playerTwo,
      RoomType.ROOM_TYPE_PRIVATE,
      code,
      lobby.allowDivision,
      lobby.allowMultiplication,
      lobby.duration
    );

    this.activeRooms.set(roomId, room);
    console.log(`Launched private custom game room ${roomId} using code ${code}`);
    return room;
  }

  getRoom(roomId: string): GameRoom | undefined {
    return this.activeRooms.get(roomId);
  }

  removeRoom(roomId: string) {
    this.activeRooms.delete(roomId);
    console.log(`Cleaned up room ${roomId}`);
  }
}

export const GameManager = new GameManagerClass();
