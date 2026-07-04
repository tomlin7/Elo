import { describe, expect, test } from "bun:test";
import { elo } from "../src/proto/elo_proto.js";
import { GameManager } from "../src/game.ts";
import { ClusterManager } from "../src/cluster.ts";

const RegionZone = elo.v3.RegionZone;

describe("Multi-Region Edge Topology & Standby Failover", () => {
  test("creates active room snapshots and evacuates states to standby nodes on crash", async () => {
    // 1. Setup a test game room
    const mockWs = { send: () => {}, data: {} };
    const room = GameManager.createBotGame("player_apac_test", mockWs, 1200);
    expect(room).not.toBeNil();

    // 2. Start Cluster replication snapshot tracking and sync once
    ClusterManager.start();
    
    // Set mock scores
    room!.playerOne.score = 8;
    room!.playerOne.streak = 5;
    room!.playerTwo.score = 4;
    room!.playerTwo.streak = 2;

    // Simulate 1,000ms replication window
    await new Promise(resolve => setTimeout(resolve, 1050));

    // Assert a snapshot was successfully archived
    const snapshot = ClusterManager.snapshots.get(room!.id);
    expect(snapshot).not.toBeNil();
    expect(snapshot!.playerOne?.currentScore).toBe(8);

    // 3. Simulate regional node crash (evacuation failover)
    const startTime = Date.now();
    ClusterManager.simulateNodeCrash(RegionZone.REGION_ZONE_APAC_SOUTH);
    const duration = Date.now() - startTime;

    // Assert NFR benchmark: failover executes under 1,500ms (practically instant in-memory)
    expect(duration).toBeLessThan(1500);

    // Assert that the room zone has migrated to the hot-standby (EU-Central)
    const activeZone = ClusterManager.activeNodeZones.get(room!.id);
    expect(activeZone).toBe(RegionZone.REGION_ZONE_EU_CENTRAL);

    // Clean up
    ClusterManager.stop();
  });
});
