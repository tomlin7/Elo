import { dbService } from "./db.ts";
import { db } from "./db.ts";

export function getTierForElo(elo: number): string {
  if (elo < 1100) return "Bronze";
  if (elo < 1300) return "Silver";
  if (elo < 1500) return "Gold";
  if (elo < 1700) return "Platinum";
  if (elo < 1900) return "Diamond";
  if (elo < 2100) return "Master";
  return "Grandmaster";
}

export class SeasonEngine {
  static currentSeason = 1;

  static performSeasonRollover() {
    console.log(`[SEASON ENGINE] Initializing Season ${this.currentSeason} Rollover and Soft Reset...`);
    
    // Retrieve all player records
    const query = db.query("SELECT * FROM players");
    const players = query.all() as any[];

    let resetCount = 0;
    players.forEach(p => {
      const currentElo = p.elo;
      const peakElo = p.peak_elo || currentElo;
      const tier = getTierForElo(currentElo);

      // Archive placements
      dbService.archiveSeason(p.id, this.currentSeason, tier, peakElo, currentElo);

      // Compress Elo rating toward 1200 baseline to prevent inflation
      let newElo = currentElo;
      if (currentElo > 1200) {
        newElo = 1200 + Math.round((currentElo - 1200) / 2);
      }

      // Commit resets and refresh Peak Elo bounds
      db.run("UPDATE players SET elo = ?, peak_elo = ? WHERE id = ?", [newElo, newElo, p.id]);
      resetCount++;
    });

    console.log(`[SEASON ENGINE] Rollover completed. Season ${this.currentSeason} closed. Normalization applied to ${resetCount} players.`);
    this.currentSeason++;
  }
}
