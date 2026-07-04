import { describe, expect, test } from "bun:test";
import { getTierForElo, SeasonEngine } from "../src/season.ts";
import { db } from "../src/db.ts";

describe("Season Rollover Engine", () => {
  test("getTierForElo maps competitive ratings to tiers correctly", () => {
    expect(getTierForElo(900)).toBe("Bronze");
    expect(getTierForElo(1150)).toBe("Silver");
    expect(getTierForElo(1350)).toBe("Gold");
    expect(getTierForElo(1550)).toBe("Platinum");
    expect(getTierForElo(1750)).toBe("Diamond");
    expect(getTierForElo(1950)).toBe("Master");
    expect(getTierForElo(2200)).toBe("Grandmaster");
  });

  test("performSeasonRollover compresses rating scores above 1200 toward the mean", () => {
    db.run("DELETE FROM players WHERE id = 'test_season_bot'");
    db.run("DELETE FROM season_archives WHERE player_id = 'test_season_bot'");
    
    db.run(`
      INSERT INTO players (id, username, elo, peak_elo, is_guest, credits, xp, level, daily_streak)
      VALUES ('test_season_bot', 'SeasonBot', 1600, 1600, 0, 500, 1200, 2, 5)
    `);

    SeasonEngine.performSeasonRollover();

    const pQuery = db.query("SELECT elo FROM players WHERE id = 'test_season_bot'");
    const p = pQuery.get() as any;
    expect(p.elo).toBe(1400); // 1200 + (1600 - 1200) / 2 = 1400 ELO

    const archiveQuery = db.query("SELECT * FROM season_archives WHERE player_id = 'test_season_bot'");
    const archive = archiveQuery.get() as any;
    expect(archive).not.toBeNil();
    expect(archive.tier).toBe("Platinum");

    // Clean up
    db.run("DELETE FROM players WHERE id = 'test_season_bot'");
    db.run("DELETE FROM season_archives WHERE player_id = 'test_season_bot'");
  });
});
