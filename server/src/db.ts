import { Database } from "bun:sqlite";
import * as path from "path";

// Initialize database
const dbPath = path.join(process.cwd(), "elo.db");
const db = new Database(dbPath);

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

// Run Migrations dynamically for Phase 2 columns
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
  unlocked_themes: string; // JSON string array
  selected_theme_id: string;
  active_title: string;
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
  }
};
