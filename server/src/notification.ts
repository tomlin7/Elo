import { db } from "./db.ts";

export class NotificationService {
  static sendFCMNotification(playerId: string, title: string, body: string) {
    console.log(`\n=================== [MOCK FCM DISPATCH] ===================`);
    console.log(`Recipient Player ID: ${playerId}`);
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);
    console.log(`Priority: HIGH | Latency: 42ms`);
    console.log(`===========================================================\n`);
  }

  static checkStreakLossWarnings() {
    console.log("[MOCK FCM MONITOR] Evaluating active player streaks for warnings...");
    
    const query = db.query("SELECT * FROM players WHERE daily_streak > 0 AND completed_today_count < 3");
    const activeRiskPlayers = query.all() as any[];

    activeRiskPlayers.forEach(p => {
      this.sendFCMNotification(
        p.id,
        "🔥 Save Your Daily Streak!",
        `Hey ${p.username}, you have an active ${p.daily_streak}-day streak at risk! Complete your daily duels before midnight to save it.`
      );
    });
  }
}
