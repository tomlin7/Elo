export class Logger {
  static log(level: "INFO" | "WARN" | "ERROR", message: string, meta?: any) {
    const scrub = (obj: any): any => {
      if (!obj) return obj;
      const cloned = JSON.parse(JSON.stringify(obj));
      if (cloned.ip) cloned.ip = "ANONYMIZED_IP";
      if (cloned.clientIp) cloned.clientIp = "ANONYMIZED_IP";
      if (cloned.deviceToken) cloned.deviceToken = "ANONYMIZED_TOKEN";
      if (cloned.password) cloned.password = "SCRUBBED";
      return cloned;
    };

    console.log(JSON.stringify({
      timestamp: Date.now(),
      level,
      message,
      meta: scrub(meta)
    }));
  }

  static info(message: string, meta?: any) {
    this.log("INFO", message, meta);
  }

  static warn(message: string, meta?: any) {
    this.log("WARN", message, meta);
  }

  static error(message: string, meta?: any) {
    this.log("ERROR", message, meta);
  }
}
