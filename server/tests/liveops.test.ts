import { describe, expect, test, beforeEach } from "bun:test";
import { dbService } from "../src/db.ts";
import { LiveOpsManager } from "../src/liveops.ts";

const SEASON = "season_1";

describe("Phase 9: Live-Ops Events & Battle Pass Ecosystem", () => {

  // ─── Epic 1: Combat Pass Tier Progression ────────────────────────────────
  describe("Combat Pass Tier Progression", () => {
    const playerId = `test_pass_player_${Date.now()}`;

    test("initializes empty Combat Pass record for a new player", () => {
      const pass = dbService.getUserCombatPass(playerId, SEASON);
      expect(pass).not.toBeNull();
      expect(pass.current_stars).toBe(0);
      expect(pass.current_tier).toBe(1);
      expect(pass.claimed_tiers_mask).toBe("");
    });

    test("incrementCombatStars accumulates stars and advances tiers (10 stars per tier)", () => {
      dbService.incrementCombatStars(playerId, SEASON, 10);
      const pass = dbService.getUserCombatPass(playerId, SEASON);
      expect(pass.current_stars).toBe(10);
      expect(pass.current_tier).toBe(2); // 10 stars → tier 2
    });

    test("claimBattlePassTier records tier in claimed_tiers_mask bitmask", () => {
      // Advance to tier 3
      dbService.incrementCombatStars(playerId, SEASON, 10);
      dbService.claimBattlePassTier(playerId, SEASON, 2);
      const pass = dbService.getUserCombatPass(playerId, SEASON);
      expect(pass.claimed_tiers_mask).toContain("2");
    });

    test("claiming the same tier twice does not duplicate the bitmask entry", () => {
      dbService.claimBattlePassTier(playerId, SEASON, 2);
      dbService.claimBattlePassTier(playerId, SEASON, 2); // duplicate
      const pass = dbService.getUserCombatPass(playerId, SEASON);
      const entries = pass.claimed_tiers_mask.split(",").filter((v: string) => v === "2");
      expect(entries.length).toBe(1);
    });

    test("tier progression never exceeds the 50-tier maximum cap", () => {
      // Add enough stars to push beyond tier 50
      dbService.incrementCombatStars(playerId, SEASON, 9999);
      const pass = dbService.getUserCombatPass(playerId, SEASON);
      expect(pass.current_tier).toBeLessThanOrEqual(50);
    });
  });

  // ─── Epic 2: Daily Challenge Objectives Broker ───────────────────────────
  describe("Daily Challenge Objectives", () => {
    const playerId = `test_challenge_player_${Date.now()}`;

    beforeEach(() => {
      dbService.generateDailyObjectives(playerId);
    });

    test("generateDailyObjectives provisions exactly 3 challenge slots per player", () => {
      const challenges = dbService.getUserChallenges(playerId);
      expect(challenges.length).toBe(3);
    });

    test("challenge slots cover SPEED_STREAK, ENDURANCE_STREAK, and WIN_COUNT types", () => {
      const challenges = dbService.getUserChallenges(playerId);
      const types = challenges.map((c: any) => c.challenge_type);
      expect(types).toContain("SPEED_STREAK");
      expect(types).toContain("ENDURANCE_STREAK");
      expect(types).toContain("WIN_COUNT");
    });

    test("incrementChallengeProgress advances objective current_value", () => {
      dbService.incrementChallengeProgress(playerId, "WIN_COUNT", 1);
      const challenges = dbService.getUserChallenges(playerId);
      const winCh = challenges.find((c: any) => c.challenge_type === "WIN_COUNT");
      expect(winCh.current_value).toBe(1);
    });

    test("completing an objective marks is_completed and auto-awards Combat Stars", () => {
      // WIN_COUNT target is 3; filling all 3 should complete it
      dbService.incrementChallengeProgress(playerId, "WIN_COUNT", 3);
      const challenges = dbService.getUserChallenges(playerId);
      const winCh = challenges.find((c: any) => c.challenge_type === "WIN_COUNT");
      expect(winCh.is_completed).toBe(1);

      // Stars should have been awarded to the player's Combat Pass
      const pass = dbService.getUserCombatPass(playerId, SEASON);
      expect(pass.current_stars).toBeGreaterThan(0);
    });

    test("regenerating daily objectives clears previous progress for the player", () => {
      dbService.incrementChallengeProgress(playerId, "WIN_COUNT", 2);
      dbService.generateDailyObjectives(playerId); // refresh
      const challenges = dbService.getUserChallenges(playerId);
      challenges.forEach((ch: any) => {
        expect(ch.current_value).toBe(0);
        expect(ch.is_completed).toBe(0);
      });
    });
  });

  // ─── Epic 3: Live-Ops Global Event Modifiers ─────────────────────────────
  describe("Live-Ops Global Event State Machine", () => {

    test("DOUBLE_XP multiplier returns 2.0 when event is active", () => {
      LiveOpsManager.addEvent("DOUBLE_XP");
      expect(LiveOpsManager.getMultiplierForXP()).toBe(2.0);
      LiveOpsManager.removeEvent("DOUBLE_XP");
    });

    test("XP multiplier defaults to 1.0 when no event is active", () => {
      LiveOpsManager.removeEvent("DOUBLE_XP");
      expect(LiveOpsManager.getMultiplierForXP()).toBe(1.0);
    });

    test("DOUBLE_CREDITS multiplier returns 2.0 when event is active", () => {
      LiveOpsManager.addEvent("DOUBLE_CREDITS");
      expect(LiveOpsManager.getMultiplierForCredits()).toBe(2.0);
      LiveOpsManager.removeEvent("DOUBLE_CREDITS");
    });

    test("Credits multiplier defaults to 1.0 when no event is active", () => {
      LiveOpsManager.removeEvent("DOUBLE_CREDITS");
      expect(LiveOpsManager.getMultiplierForCredits()).toBe(1.0);
    });

    test("multiple events can be stacked and listed simultaneously", () => {
      LiveOpsManager.addEvent("DOUBLE_XP");
      LiveOpsManager.addEvent("DOUBLE_CREDITS");
      const events = LiveOpsManager.getActiveEventsList();
      expect(events).toContain("DOUBLE_XP");
      expect(events).toContain("DOUBLE_CREDITS");
      // Cleanup
      LiveOpsManager.removeEvent("DOUBLE_XP");
      LiveOpsManager.removeEvent("DOUBLE_CREDITS");
    });

    test("removing an inactive event does not throw errors", () => {
      expect(() => LiveOpsManager.removeEvent("DOUBLE_XP")).not.toThrow();
    });
  });
});
