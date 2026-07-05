import { describe, expect, test, beforeEach } from "bun:test";
import { dbService } from "../src/db.ts";
import { GameRoom, GamePlayer } from "../src/game.ts";
import { IntegrityGuard } from "../src/security.ts";
import { elo } from "../src/proto/elo_proto.js";

const RoomType = elo.v3.RoomType;
const MatchState = elo.v3.MatchState;

describe("Enterprise Security & B2B Federation Tests", () => {

  // ─── Epic 1: Heuristic Anti-Cheat & Honeypots ───────────────────────────
  describe("Anti-Cheat Escalation Sandbox & Honeypots", () => {
    let room: GameRoom;
    let p1: GamePlayer;
    let p2: GamePlayer;

    beforeEach(() => {
      const p1Id = `cheat_p_${Math.random().toString(36).substring(2, 7)}`;
      const p2Id = `clean_p_${Math.random().toString(36).substring(2, 7)}`;
      const p1Username = `Speedy_${Math.random().toString(36).substring(2, 7)}`;
      const p2Username = `Fair_${Math.random().toString(36).substring(2, 7)}`;

      // Create test players dynamically
      dbService.createPlayer(p1Id, p1Username, true);
      dbService.createPlayer(p2Id, p2Username, true);

      p1 = {
        id: p1Id,
        username: p1Username,
        score: 0,
        streak: 0,
        maxStreak: 0,
        ghostInput: "",
        elo: 1000,
        isBot: false,
        socket: { send: () => {} },
        questionIndex: 0,
        level: 1,
        activeTitle: "",
        lastKeystrokeTime: 0,
        consecutiveFastInputs: 0,
        isFlaggedCheat: false,
      };

      p2 = {
        id: p2Id,
        username: p2Username,
        score: 0,
        streak: 0,
        maxStreak: 0,
        ghostInput: "",
        elo: 1000,
        isBot: false,
        socket: { send: () => {} },
        questionIndex: 0,
        level: 1,
        activeTitle: "",
        lastKeystrokeTime: 0,
        consecutiveFastInputs: 0,
        isFlaggedCheat: false,
      };

      const roomId = `test_room_sec_${Math.random().toString(36).substring(2, 9)}`;
      room = new GameRoom(roomId, p1, p2, RoomType.ROOM_TYPE_RANKED);
      room.state = MatchState.MATCH_STATE_ACTIVE;
    });

    test("consecutive keystroke inputs under 120ms transition player to SILENT_SANDBOX", () => {
      let baseTime = Date.now();
      for (let i = 0; i < 5; i++) {
        room.handleClientAction(p1.id, {
          payload: "currentInput",
          currentInput: "x",
          timestamp: BigInt(baseTime + i * 50)
        });
      }

      expect(p1.isSandboxed).toBe(true);
      expect(p1.isFlaggedCheat).toBe(true);
    });

    test("sandboxed player submitting the correct answer to hidden questions triggers a permanent ban", () => {
      p1.isSandboxed = true;
      const currentQuestion = room["questions"][p1.questionIndex];

      room.handleClientAction(p1.id, {
        payload: "submittedAnswer",
        submittedAnswer: currentQuestion.answer,
        timestamp: BigInt(Date.now())
      });

      const playerRecord = dbService.getPlayer(p1.id);
      expect(playerRecord?.is_banned).toBe(1);
    });
  });

  // ─── Epic 2: IntegrityGuard Attestation Checks ───────────────────────────
  describe("IntegrityGuard Hardware Attestation", () => {
    test("verifyAttestation validates valid tokens and flags invalid ones", () => {
      expect(IntegrityGuard.verifyAttestation("VALID_ATTESTATION_TOKEN")).toBe(true);
      expect(IntegrityGuard.verifyAttestation("SUSPICIOUS_MOCK_TOKEN")).toBe(false);
    });

    test("verification processing executes in under the 8ms threshold limit", () => {
      const start = performance.now();
      IntegrityGuard.verifyAttestation("VALID_ATTESTATION_TOKEN");
      const elapsed = performance.now() - start;
      expect(elapsed).toBeLessThan(8.0);
    });
  });

  // ─── Epic 3: B2B Tournament Provisioning ───────────────────────────────
  describe("B2B Corporate Federation Portal", () => {
    beforeEach(() => {
      dbService.registerB2BPartner("partner_1", "Global E-Sports Federation", "CORP_SECRET_KEY_123");
    });

    test("verifyB2BPartnerKey authenticates registered partner tokens", () => {
      const partner = dbService.verifyB2BPartnerKey("CORP_SECRET_KEY_123");
      expect(partner).not.toBeNil();
      expect(partner.organization_name).toBe("Global E-Sports Federation");
    });

    test("verifyB2BPartnerKey rejects invalid api keys", () => {
      const partner = dbService.verifyB2BPartnerKey("MALICIOUS_KEY_ABC");
      expect(partner).toBeNil();
    });
  });
});
