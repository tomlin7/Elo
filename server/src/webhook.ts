import crypto from "crypto";
import { dbService } from "./db.ts";
import { Logger } from "./logger.ts";

export class WebhookDispatcher {
  static async dispatch(playerId: string, eventType: string, payload: any): Promise<void> {
    const webhooks = dbService.getWebhooks(playerId);
    if (webhooks.length === 0) return;

    const payloadString = JSON.stringify({
      event: eventType,
      timestamp: Date.now(),
      data: payload
    });

    for (const wh of webhooks) {
      try {
        // Calculate SHA-256 HMAC signature using secret token
        const hmac = crypto.createHmac("sha256", wh.secret_token);
        hmac.update(payloadString);
        const signature = hmac.digest("hex");

        Logger.info(`Dispatching webhook event '${eventType}' to target: ${wh.target_url}`);

        // Async dispatch
        fetch(wh.target_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Elo-Signature": signature
          },
          body: payloadString
        })
        .then(async (res) => {
          if (!res.ok) {
            Logger.warn(`Webhook endpoint returned status ${res.status} for event ${eventType}`);
          }
        })
        .catch(err => {
          Logger.error(`Network error delivering webhook event ${eventType}: ${err.message}`);
        });

      } catch (err: any) {
        Logger.error(`Failed to construct webhook payload: ${err.message}`);
      }
    }
  }
}
