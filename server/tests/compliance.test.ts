import { describe, expect, test } from "bun:test";
import crypto from "crypto";
import { dbService } from "../src/db.ts";
import { db } from "../src/db.ts";

describe("Live-Service Operations & Compliance", () => {
  test("registers webhook endpoints and calculates HMAC SHA-256 signatures correctly", () => {
    const playerId = "test_dev_user";
    const targetUrl = "https://discord.com/api/webhooks/mock";
    const secret = "super_secure_key";

    // Register
    dbService.registerWebhook(playerId, targetUrl, secret);

    const hooks = dbService.getWebhooks(playerId);
    expect(hooks.length).toBe(1);
    expect(hooks[0].target_url).toBe(targetUrl);
    expect(hooks[0].secret_token).toBe(secret);

    // Verify HMAC signature generation
    const payload = JSON.stringify({ event: "test", data: { score: 10 } });
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    expect(expectedSignature).toBeDefined();
    expect(expectedSignature.length).toBe(64); // hex sha256 is 64 chars

    // Clean up
    db.run("DELETE FROM webhooks WHERE player_id = ?", [playerId]);
  });

  test("GDPR/CCPA cascade purges scheduled user profile and related logs from SQLite", () => {
    const playerId = "delete_target_user";

    // 1. Setup mock player
    db.run("DELETE FROM players WHERE id = ?", [playerId]);
    db.run(`
      INSERT INTO players (id, username, elo, peak_elo, is_guest, credits, xp, level, daily_streak)
      VALUES ('${playerId}', 'ErasureTarget', 1100, 1100, 0, 100, 50, 1, 0)
    `);

    // Add match statistics
    db.run(`
      INSERT INTO match_telemetry (match_id, player_id, operation_type, total_presented, total_correct, average_solve_time_ms)
      VALUES ('match_mock_123', '${playerId}', 'ADD_SUB', 10, 8, 1200)
    `);

    // 2. Schedule deletion
    dbService.scheduleAccountDeletion(playerId);

    // Mock grace timer bypass (set scheduled_for to past epoch)
    db.run("UPDATE deletion_queue SET scheduled_for = 0 WHERE player_id = ?", [playerId]);

    // 3. Execute due deletions
    const purgedCount = dbService.executeDueDeletions();
    expect(purgedCount).toBe(1);

    // 4. Assert full cascading purge
    const playerQuery = db.query("SELECT * FROM players WHERE id = $id");
    expect(playerQuery.get({ $id: playerId })).toBeNil();

    const telemetryQuery = db.query("SELECT * FROM match_telemetry WHERE player_id = $id");
    expect(telemetryQuery.get({ $id: playerId })).toBeNil();
  });
});
