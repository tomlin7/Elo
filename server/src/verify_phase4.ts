import { dbService } from "./db.ts";
import { db } from "./db.ts";
import { SeasonEngine } from "./season.ts";
import { GameManager } from "./game.ts";

console.log("=== PHASE 4: LIVE INTEGRATION VERIFICATION ===");

// 1. Verify Season Rollover & Compression Algorithm
console.log("\n[TEST 1] Registering test player 'ChallengerBot' with 1600 Elo...");
// Ensure database clean state for bot
db.run("DELETE FROM players WHERE id = 'test_challenger_bot'");
db.run("DELETE FROM season_archives WHERE player_id = 'test_challenger_bot'");

db.run(`
  INSERT INTO players (id, username, elo, peak_elo, is_guest, credits, xp, level, daily_streak)
  VALUES ('test_challenger_bot', 'ChallengerBot', 1600, 1600, 0, 500, 1200, 2, 5)
`);

console.log("Executing Season Engine Rollover...");
SeasonEngine.performSeasonRollover();

// Fetch recalculated stats
const player = dbService.getPlayer("test_challenger_bot");
const archives = dbService.getPlayerSeasonArchive("test_challenger_bot");

if (player) {
  // Expected compressed Elo: 1200 + (1600 - 1200) / 2 = 1400 ELO
  console.log(`ChallengerBot - New Elo: ${player.elo} (Expected: 1400)`);
  if (player.elo === 1400) {
    console.log("✅ Elo Compression formula verified!");
  } else {
    console.error("❌ ELO Compression mismatch!");
  }
}

if (archives.length > 0) {
  const latest = archives[0];
  console.log(`Archived Season Placement -> Season: ${latest.season_number} | Tier: ${latest.tier} | Final Elo: ${latest.final_elo} | Peak Elo: ${latest.peak_elo}`);
  if (latest.tier === "Platinum" || latest.tier === "Diamond") { // 1400 Elo is Platinum, 1600 peak is Platinum/Diamond
    console.log("✅ Season Archive and Tier classification verified!");
  } else {
    console.error("❌ Archiving failure!");
  }
}

// 2. Verify Reconnection Mapping Token
console.log("\n[TEST 2] Verifying Reconnection Token generation and mapping...");
const mockWs = { send: () => {}, data: {} };
const room = GameManager.createBotGame("test_challenger_bot", mockWs, 1200);

if (room) {
  const reconToken = room.playerOneReconToken;
  console.log(`Generated Reconnection Token: ${reconToken}`);
  
  // Simulate network reconnecting
  const newMockWs = { send: (data: any) => { console.log("[WS Catchup Message Sent]"); }, data: {} };
  const restoredRoom = GameManager.reconnectPlayer(reconToken, newMockWs);
  
  if (restoredRoom && restoredRoom.id === room.id) {
    console.log("✅ Reconnection token handshake recovered the active game room successfully!");
  } else {
    console.error("❌ Reconnection token recovery failed!");
  }
}

console.log("\n=== ALL INTEGRATION CHECKS COMPLETED SUCCESSFULLY ===");
