import { Database } from "bun:sqlite";
import * as path from "path";

// Initialize database
const dbPath = path.join(process.cwd(), "elo.db");
export const db = new Database(dbPath);

// Initialize tables
db.run(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    elo INTEGER NOT NULL DEFAULT 1000,
    is_guest INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    player_one_id TEXT NOT NULL,
    player_two_id TEXT NOT NULL,
    player_one_score INTEGER NOT NULL,
    player_two_score INTEGER NOT NULL,
    winner_id TEXT,
    player_one_elo_change INTEGER NOT NULL,
    player_two_elo_change INTEGER NOT NULL,
    played_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Composite B-Tree Indexes on Matches Table
db.run(`CREATE INDEX IF NOT EXISTS idx_matches_p1_date ON matches (player_one_id, played_at)`);
db.run(`CREATE INDEX IF NOT EXISTS idx_matches_p2_date ON matches (player_two_id, played_at)`);

// Season Placement Archive Table
db.run(`
  CREATE TABLE IF NOT EXISTS season_archives (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL,
    season_number INTEGER NOT NULL,
    tier TEXT NOT NULL,
    peak_elo INTEGER NOT NULL,
    final_elo INTEGER NOT NULL,
    archived_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
db.run(`CREATE INDEX IF NOT EXISTS idx_season_player ON season_archives (player_id)`);

// Aggregated Match Telemetry Table
db.run(`
  CREATE TABLE IF NOT EXISTS match_telemetry (
    match_id TEXT NOT NULL,
    player_id TEXT NOT NULL,
    operation_type TEXT NOT NULL,
    total_presented INTEGER NOT NULL,
    total_correct INTEGER NOT NULL,
    average_solve_time_ms INTEGER NOT NULL,
    PRIMARY KEY (match_id, player_id, operation_type)
  )
`);
db.run(`CREATE INDEX IF NOT EXISTS idx_telemetry_player ON match_telemetry (player_id)`);

// Webhooks Table
db.run(`
  CREATE TABLE IF NOT EXISTS webhooks (
    id TEXT PRIMARY KEY,
    player_id TEXT NOT NULL,
    target_url TEXT NOT NULL,
    secret_token TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at INTEGER NOT NULL
  )
`);

// Deletion Queue Table
db.run(`
  CREATE TABLE IF NOT EXISTS deletion_queue (
    player_id TEXT PRIMARY KEY,
    scheduled_for INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  )
`);

// Community Plugin Registry Catalog
db.run(`
  CREATE TABLE IF NOT EXISTS community_plugins (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL,
    plugin_name TEXT NOT NULL,
    version_tag TEXT NOT NULL,
    source_url TEXT NOT NULL,
    sha256_fingerprint TEXT NOT NULL,
    is_verified INTEGER DEFAULT 0,
    created_at INTEGER NOT NULL
  )
`);

// Generative Problem Templates Index
db.run(`
  CREATE TABLE IF NOT EXISTS problem_templates (
    id TEXT PRIMARY KEY,
    mode_name TEXT NOT NULL,
    difficulty_tier INTEGER NOT NULL,
    template_json TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at INTEGER NOT NULL
  )
`);

// Run Migrations dynamically for Phase 2, 4 & 6 columns
const addColumn = (col: string, defVal: string) => {
  try {
    db.run(`ALTER TABLE players ADD COLUMN ${col} ${defVal}`);
    console.log(`Migration: Added column ${col} to players table`);
  } catch (e) {
    // Column already exists, ignore
  }
};

addColumn("credits", "INTEGER NOT NULL DEFAULT 0");
addColumn("xp", "INTEGER NOT NULL DEFAULT 0");
addColumn("level", "INTEGER NOT NULL DEFAULT 1");
addColumn("daily_streak", "INTEGER NOT NULL DEFAULT 0");
addColumn("last_played_date", "TEXT");
addColumn("completed_today_count", "INTEGER NOT NULL DEFAULT 0");
addColumn("unlocked_themes", "TEXT NOT NULL DEFAULT '[\"dark\"]'");
addColumn("selected_theme_id", "TEXT NOT NULL DEFAULT 'dark'");
addColumn("active_title", "TEXT NOT NULL DEFAULT ''");
addColumn("peak_elo", "INTEGER NOT NULL DEFAULT 1000"); // Peak Elo tracking for season placement
addColumn("privacy_consent_version", "TEXT DEFAULT ''");
addColumn("privacy_consent_timestamp", "INTEGER DEFAULT 0");

export interface Player {
  id: string;
  username: string;
  elo: number;
  is_guest: number;
  created_at: string;
  credits: number;
  xp: number;
  level: number;
  daily_streak: number;
  last_played_date: string | null;
  completed_today_count: number;
  unlocked_themes: string;
  selected_theme_id: string;
  active_title: string;
  peak_elo: number;
  privacy_consent_version: string;
  privacy_consent_timestamp: number;
}

export interface MatchRecord {
  id: string;
  player_one_id: string;
  player_two_id: string;
  player_one_score: number;
  player_two_score: number;
  winner_id: string | null;
  player_one_elo_change: number;
  player_two_elo_change: number;
}

export const dbService = {
  getPlayer(id: string): Player | null {
    const query = db.query("SELECT * FROM players WHERE id = $id LIMIT 1");
    const result = query.get({ $id: id }) as Player | null;
    return result;
  },

  getPlayerByUsername(username: string): Player | null {
    const query = db.query("SELECT * FROM players WHERE username = $username LIMIT 1");
    const result = query.get({ $username: username }) as Player | null;
    return result;
  },

  createPlayer(id: string, username: string, isGuest: boolean = true): Player {
    const insert = db.query(
      "INSERT INTO players (id, username, elo, is_guest, unlocked_themes, selected_theme_id) VALUES ($id, $username, 1000, $is_guest, '[\"dark\"]', 'dark') RETURNING *"
    );
    return insert.get({
      $id: id,
      $username: username,
      $is_guest: isGuest ? 1 : 0,
    }) as Player;
  },

  updatePlayerElo(id: string, newElo: number): void {
    const update = db.query("UPDATE players SET elo = $elo WHERE id = $id");
    update.run({ $elo: newElo, $id: id });
  },

  updatePlayerProgression(id: string, xpChange: number, level: number, creditsChange: number): void {
    const update = db.query(`
      UPDATE players 
      SET xp = xp + $xpChange, level = $level, credits = credits + $creditsChange 
      WHERE id = $id
    `);
    update.run({ $xpChange: xpChange, $level: level, $creditsChange: creditsChange, $id: id });
  },

  updatePlayerStreak(id: string, streak: number, lastPlayedDate: string, completedTodayCount: number): void {
    const update = db.query(`
      UPDATE players 
      SET daily_streak = $streak, last_played_date = $lastPlayedDate, completed_today_count = $completedTodayCount 
      WHERE id = $id
    `);
    update.run({ $streak: streak, $lastPlayedDate: lastPlayedDate, $completedTodayCount: completedTodayCount, $id: id });
  },

  updatePlayerThemeAndTitle(id: string, themeId: string, title: string): void {
    const update = db.query("UPDATE players SET selected_theme_id = $themeId, active_title = $title WHERE id = $id");
    update.run({ $themeId: themeId, $title: title, $id: id });
  },

  unlockTheme(id: string, themeId: string, cost: number): boolean {
    const player = this.getPlayer(id);
    if (!player || player.credits < cost) return false;

    let unlocked: string[] = [];
    try {
      unlocked = JSON.parse(player.unlocked_themes);
    } catch {
      unlocked = ["dark"];
    }

    if (!unlocked.includes(themeId)) {
      unlocked.push(themeId);
      const update = db.query(`
        UPDATE players 
        SET credits = credits - $cost, unlocked_themes = $unlocked 
        WHERE id = $id
      `);
      update.run({ $cost: cost, $unlocked: JSON.stringify(unlocked), $id: id });
      return true;
    }
    return false;
  },

  updatePlayerElo(id: string, newElo: number): void {
    const update = db.query("UPDATE players SET elo = $elo, peak_elo = MAX(peak_elo, $elo) WHERE id = $id");
    update.run({ $elo: newElo, $id: id });
  },

  saveMatchTelemetry(matchId: string, playerId: string, telemetry: any[]): void {
    const insert = db.query(`
      INSERT INTO match_telemetry (match_id, player_id, operation_type, total_presented, total_correct, average_solve_time_ms)
      VALUES ($matchId, $playerId, $opType, $totalPresented, $totalCorrect, $avgSolveTime)
    `);
    telemetry.forEach(t => {
      insert.run({
        $matchId: matchId,
        $playerId: playerId,
        $opType: t.operationType,
        $totalPresented: t.totalPresented,
        $totalCorrect: t.totalCorrect,
        $avgSolveTime: t.averageSolveTimeMs
      });
    });
  },

  getPlayerMatchHistory(playerId: string, limit = 50): any[] {
    const query = db.query(`
      SELECT 
        m.id as match_id,
        CASE WHEN m.player_one_id = $playerId THEN p2.username ELSE p1.username END as opponent_username,
        CASE WHEN m.winner_id = $playerId THEN 1 ELSE 0 END as is_victory,
        CASE WHEN m.player_one_id = $playerId THEN m.player_one_elo_change ELSE m.player_two_elo_change END as elo_delta,
        strftime('%s', m.played_at) * 1000 as match_timestamp
      FROM matches m
      JOIN players p1 ON m.player_one_id = p1.id
      JOIN players p2 ON m.player_two_id = p2.id
      WHERE m.player_one_id = $playerId OR m.player_two_id = $playerId
      ORDER BY m.played_at DESC
      LIMIT $limit
    `);
    const matchesList = query.all({ $playerId: playerId }) as any[];

    const telQuery = db.query(`
      SELECT operation_type, total_presented, total_correct, average_solve_time_ms
      FROM match_telemetry
      WHERE match_id = $matchId AND player_id = $playerId
    `);

    return matchesList.map(m => {
      const stats = telQuery.all({ $matchId: m.match_id, $playerId: playerId }) as any[];
      return {
        matchId: m.match_id,
        opponentUsername: m.opponent_username,
        isVictory: m.is_victory === 1,
        eloDelta: m.elo_delta,
        matchTimestamp: m.match_timestamp,
        stats: stats.map(s => ({
          operationType: s.operation_type,
          totalPresented: s.total_presented,
          totalCorrect: s.total_correct,
          averageSolveTimeMs: s.average_solve_time_ms
        }))
      };
    });
  },

  archiveSeason(playerId: string, seasonNum: number, tier: string, peakElo: number, finalElo: number): void {
    const id = `archive_${seasonNum}_${playerId}_${Date.now()}`;
    const insert = db.query(`
      INSERT INTO season_archives (id, player_id, season_number, tier, peak_elo, final_elo)
      VALUES ($id, $playerId, $seasonNum, $tier, $peakElo, $finalElo)
    `);
    insert.run({
      $id: id,
      $playerId: playerId,
      $seasonNum: seasonNum,
      $tier: tier,
      $peakElo: peakElo,
      $finalElo: finalElo
    });
  },

  getPlayerSeasonArchive(playerId: string): any[] {
    const query = db.query("SELECT * FROM season_archives WHERE player_id = $playerId ORDER BY season_number DESC");
    return query.all({ $playerId: playerId }) as any[];
  },

  getLeaderboard(limit = 50): Player[] {
    const query = db.query("SELECT * FROM players ORDER BY elo DESC, username ASC LIMIT $limit");
    return query.all({ $limit: limit }) as Player[];
  },

  saveMatch(match: MatchRecord): void {
    const insert = db.query(`
      INSERT INTO matches (
        id, player_one_id, player_two_id, player_one_score, player_two_score, winner_id, player_one_elo_change, player_two_elo_change
      ) VALUES (
        $id, $player_one_id, $player_two_id, $player_one_score, $player_two_score, $winner_id, $player_one_elo_change, $player_two_elo_change
      )
    `);
    insert.run({
      $id: match.id,
      $player_one_id: match.player_one_id,
      $player_two_id: match.player_two_id,
      $player_one_score: match.player_one_score,
      $player_two_score: match.player_two_score,
      $winner_id: match.winner_id,
      $player_one_elo_change: match.player_one_elo_change,
      $player_two_elo_change: match.player_two_elo_change,
    });
  },

  scheduleAccountDeletion(playerId: string): void {
    const scheduledTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days grace
    const query = db.query(`
      INSERT OR REPLACE INTO deletion_queue (player_id, scheduled_for, created_at)
      VALUES ($playerId, $scheduled, $now)
    `);
    query.run({ $playerId: playerId, $scheduled: scheduledTime, $now: Date.now() });
  },

  cancelAccountDeletion(playerId: string): void {
    const query = db.query("DELETE FROM deletion_queue WHERE player_id = $playerId");
    query.run({ $playerId: playerId });
  },

  executeDueDeletions(): number {
    const now = Date.now();
    const query = db.query("SELECT player_id FROM deletion_queue WHERE scheduled_for <= $now");
    const due = query.all({ $now: now }) as any[];

    due.forEach(d => {
      const playerId = d.player_id;
      console.log(`[PRIVACY] Purging account logs dynamically for player: ${playerId}`);
      db.transaction(() => {
        db.run("DELETE FROM match_telemetry WHERE player_id = ?", [playerId]);
        db.run("DELETE FROM matches WHERE player_one_id = ? OR player_two_id = ?", [playerId, playerId]);
        db.run("DELETE FROM season_archives WHERE player_id = ?", [playerId]);
        db.run("DELETE FROM webhooks WHERE player_id = ?", [playerId]);
        db.run("DELETE FROM deletion_queue WHERE player_id = ?", [playerId]);
        db.run("DELETE FROM players WHERE id = ?", [playerId]);
      })();
    });

    return due.length;
  },

  registerWebhook(playerId: string, targetUrl: string, secret: string): void {
    const id = `wh_${playerId}_${Date.now()}`;
    const insert = db.query(`
      INSERT OR REPLACE INTO webhooks (id, player_id, target_url, secret_token, created_at)
      VALUES ($id, $playerId, $targetUrl, $secret, $now)
    `);
    insert.run({
      $id: id,
      $playerId: playerId,
      $targetUrl: targetUrl,
      $secret: secret,
      $now: Date.now()
    });
  },

  getWebhooks(playerId: string): any[] {
    const query = db.query("SELECT * FROM webhooks WHERE player_id = $playerId AND is_active = 1");
    return query.all({ $playerId: playerId }) as any[];
  },

  saveConsentLog(playerId: string, version: string): void {
    const update = db.query(`
      UPDATE players 
      SET privacy_consent_version = $version, privacy_consent_timestamp = $now 
      WHERE id = $id
    `);
    update.run({ $version: version, $now: Date.now(), $id: playerId });
  },

  registerPlugin(plugin: { id: string; authorId: string; pluginName: string; versionTag: string; sourceUrl: string; sha256Fingerprint: string }): void {
    const query = db.query(`
      INSERT OR REPLACE INTO community_plugins (id, author_id, plugin_name, version_tag, source_url, sha256_fingerprint, created_at)
      VALUES ($id, $authorId, $pluginName, $versionTag, $sourceUrl, $sha256, $now)
    `);
    query.run({
      $id: plugin.id,
      $authorId: plugin.authorId,
      $pluginName: plugin.pluginName,
      $versionTag: plugin.versionTag,
      $sourceUrl: plugin.sourceUrl,
      $sha256: plugin.sha256Fingerprint,
      $now: Date.now()
    });
  },

  getVerifiedPlugins(): any[] {
    const query = db.query("SELECT * FROM community_plugins WHERE is_verified = 1 ORDER BY created_at DESC");
    return query.all() as any[];
  },

  saveProblemTemplate(template: { id: string; modeName: string; difficultyTier: number; templateJson: string }): void {
    const query = db.query(`
      INSERT OR REPLACE INTO problem_templates (id, mode_name, difficulty_tier, template_json, created_at)
      VALUES ($id, $modeName, $difficulty, $template, $now)
    `);
    query.run({
      $id: template.id,
      $modeName: template.modeName,
      $difficulty: template.difficultyTier,
      $template: template.templateJson,
      $now: Date.now()
    });
  },

  getActiveTemplates(): any[] {
    const query = db.query("SELECT * FROM problem_templates WHERE is_active = 1");
    return query.all() as any[];
  }
};
