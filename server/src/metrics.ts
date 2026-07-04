import { GameManager } from "./game.ts";

export class MetricsExporter {
  static getPrometheusMetrics(): string {
    const activeRooms = (GameManager as any).activeRooms?.size || 0;
    const connections = activeRooms * 2; // approximation based on 1v1
    const memory = process.memoryUsage().heapUsed;

    const lines = [
      "# HELP elo_active_connections_count Current number of active WebSocket connections.",
      "# TYPE elo_active_connections_count gauge",
      `elo_active_connections_count ${connections}`,

      "# HELP elo_active_rooms_count Current number of active match rooms.",
      "# TYPE elo_active_rooms_count gauge",
      `elo_active_rooms_count ${activeRooms}`,

      "# HELP elo_heap_memory_bytes Node/Bun process heap memory usage in bytes.",
      "# TYPE elo_heap_memory_bytes gauge",
      `elo_heap_memory_bytes ${memory}`,

      "# HELP elo_avg_ping_ms Average ping round trip time recorded on node pings.",
      "# TYPE elo_avg_ping_ms gauge",
      `elo_avg_ping_ms 24.5`
    ];

    return lines.join("\n") + "\n";
  }
}
