import { describe, expect, test } from "bun:test";
import { ShardRouter } from "../src/db.ts";
import { MetricsExporter } from "../src/metrics.ts";

describe("Planetary Sharded Persistence & Telemetry Scrapers", () => {
  test("geographic ShardRouter isolates player data within target regional SQLite shards", () => {
    const p1 = "player_asia";
    const p2 = "player_america";

    // Route to separate shards
    ShardRouter.routeRegistration(p1, "AsiaFighter", 1400, "apac");
    ShardRouter.routeRegistration(p2, "USFighter", 1200, "us");

    // Retrieve and verify isolations
    const userAsia = ShardRouter.getPlayerFromShard(p1, "apac");
    expect(userAsia).not.toBeNil();
    expect(userAsia.username).toBe("AsiaFighter");

    // Cross-pollution check: player_asia should NOT exist in US database shard
    const crossCheck = ShardRouter.getPlayerFromShard(p1, "us");
    expect(crossCheck).toBeNil();

    const userUS = ShardRouter.getPlayerFromShard(p2, "us");
    expect(userUS).not.toBeNil();
    expect(userUS.username).toBe("USFighter");
  });

  test("MetricsExporter constructs valid Prometheus-compatible scraping metric strings", () => {
    const metrics = MetricsExporter.getPrometheusMetrics();
    expect(metrics).toContain("elo_active_connections_count");
    expect(metrics).toContain("elo_active_rooms_count");
    expect(metrics).toContain("elo_heap_memory_bytes");
    expect(metrics).toContain("elo_avg_ping_ms");
  });
});
