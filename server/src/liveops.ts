export class LiveOpsManager {
  private static activeEvents = new Set<string>();

  static addEvent(event: "DOUBLE_XP" | "DOUBLE_CREDITS") {
    this.activeEvents.add(event);
    console.log(`[LIVEOPS] Enabled global modifier event: ${event}`);
  }

  static removeEvent(event: "DOUBLE_XP" | "DOUBLE_CREDITS") {
    this.activeEvents.delete(event);
    console.log(`[LIVEOPS] Disabled global modifier event: ${event}`);
  }

  static getMultiplierForXP(): number {
    return this.activeEvents.has("DOUBLE_XP") ? 2.0 : 1.0;
  }

  static getMultiplierForCredits(): number {
    return this.activeEvents.has("DOUBLE_CREDITS") ? 2.0 : 1.0;
  }

  static getActiveEventsList(): string[] {
    return Array.from(this.activeEvents);
  }
}
