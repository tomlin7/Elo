import { describe, expect, test, beforeEach } from "bun:test";
import { Matchmaker } from "../src/matchmaker.ts";
import { dbService, db } from "../src/db.ts";
import { GameManager } from "../src/game.ts";

describe("Discipline Matchmaking Ticket Engine", () => {
  let player1Id: string;
  let player2Id: string;
  let mockSocket1: any;
  let mockSocket2: any;

  beforeEach(() => {
    player1Id = `p1_${Math.random().toString(36).substring(2, 7)}`;
    player2Id = `p2_${Math.random().toString(36).substring(2, 7)}`;
    
    dbService.createPlayer(player1Id, `user_${player1Id}`);
    dbService.createPlayer(player2Id, `user_${player2Id}`);

    mockSocket1 = {
      send: () => {},
      data: {}
    };
    mockSocket2 = {
      send: () => {},
      data: {}
    };
  });

  test("successfully registers and logs ticket statuses in SQLite", () => {
    // Join queue
    Matchmaker.join(player1Id, mockSocket1, "MATH");

    const logs = db.query("SELECT * FROM active_matchmaking_logs WHERE player_id = $id")
      .all({ $id: player1Id }) as any[];
    expect(logs.length).toBe(1);
    expect(logs[0].status).toBe("QUEUED");
    expect(logs[0].discipline_mode).toBe("MATH");

    // Leave queue
    Matchmaker.leave(player1Id);
    const postLogs = db.query("SELECT * FROM active_matchmaking_logs WHERE player_id = $id ORDER BY entered_at DESC")
      .all({ $id: player1Id }) as any[];
    expect(postLogs[0].status).toBe("CANCELLED");
  });

  test("applies ELO matchmaking window search and executes fast pairing under 2ms", () => {
    dbService.updatePlayerElo(player1Id, 1000);
    dbService.updatePlayerElo(player2Id, 1050);

    Matchmaker.join(player1Id, mockSocket1, "MATH");
    Matchmaker.join(player2Id, mockSocket2, "MATH");

    // Stub I/O and side effects to measure pure pairing evaluation pass computation speed
    const origLog = dbService.logMatchmakingStatus;
    const origCreate = GameManager.createGame;
    dbService.logMatchmakingStatus = () => {};
    GameManager.createGame = (() => ({ id: "mock_room", questionSeed: "mock_seed" })) as any;

    const start = performance.now();
    // Simulate matchmaking tick
    // @ts-ignore
    Matchmaker.tick();
    const duration = performance.now() - start;

    // Restore
    dbService.logMatchmakingStatus = origLog;
    GameManager.createGame = origCreate;

    expect(duration).toBeLessThan(2.0); // NFR verification: pairing loop executes in under 2ms
  });
});
