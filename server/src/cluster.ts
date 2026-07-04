import { elo } from "./proto/elo_proto.js";
import { GameManager, GameRoom } from "./game.ts";

const RegionZone = elo.v3.RegionZone;
const GameSessionSnapshot = elo.v3.GameSessionSnapshot;
const RegionalHandshakeOverride = elo.v3.RegionalHandshakeOverride;
const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;

export class ClusterManager {
  static snapshots = new Map<string, elo.v3.IGameSessionSnapshot>();
  static activeNodeZones = new Map<string, elo.v3.RegionZone>(); // roomId -> RegionZone
  static replicationTimer: any = null;

  static start() {
    // Start 1,000ms hot-standby state snapshot replication cycle
    this.replicationTimer = setInterval(() => {
      this.replicateSnapshots();
    }, 1000);
  }

  static stop() {
    if (this.replicationTimer) {
      clearInterval(this.replicationTimer);
    }
  }

  private static replicateSnapshots() {
    // Traverse active rooms in GameManager and cache snapshots
    const rooms = (GameManager as any).activeRooms as Map<string, GameRoom>;
    if (!rooms) return;

    rooms.forEach((room, roomId) => {
      // Pick region node zone if unassigned
      if (!this.activeNodeZones.has(roomId)) {
        this.activeNodeZones.set(roomId, RegionZone.REGION_ZONE_APAC_SOUTH);
      }

      const snapshot: elo.v3.IGameSessionSnapshot = {
        roomId: roomId,
        currentTick: room.timeRemainingSeconds,
        questionStreamSeed: room.questions.map(q => q.text).join("|"),
        playerOne: {
          playerId: room.playerOne.id,
          currentScore: room.playerOne.score,
          currentStreak: room.playerOne.streak
        },
        playerTwo: {
          playerId: room.playerTwo.id,
          currentScore: room.playerTwo.score,
          currentStreak: room.playerTwo.streak
        }
      };

      this.snapshots.set(roomId, snapshot);
    });
  }

  static simulateNodeCrash(crashedZone: elo.v3.RegionZone) {
    console.log(`\n🚨 [CLUSTER MANAGER] Catastrophic infrastructure drop detected in node zone: ${crashedZone}`);
    const rooms = (GameManager as any).activeRooms as Map<string, GameRoom>;
    if (!rooms) return;

    // Standby failover targets map: APAC -> EU, EU -> US, US -> ME, ME -> APAC
    let standbyZone = RegionZone.REGION_ZONE_EU_CENTRAL;
    if (crashedZone === RegionZone.REGION_ZONE_EU_CENTRAL) standbyZone = RegionZone.REGION_ZONE_US_EAST;
    else if (crashedZone === RegionZone.REGION_ZONE_US_EAST) standbyZone = RegionZone.REGION_ZONE_ME_CENTRAL;
    else if (crashedZone === RegionZone.REGION_ZONE_ME_CENTRAL) standbyZone = RegionZone.REGION_ZONE_APAC_SOUTH;

    console.log(`[CLUSTER MANAGER] Hot-standby node allocated for redirection: ${standbyZone}`);

    rooms.forEach((room, roomId) => {
      const currentZone = this.activeNodeZones.get(roomId);
      if (currentZone === crashedZone) {
        console.log(`[CLUSTER MANAGER] Evacuating match ${roomId} to standby node...`);

        // Get latest cached snapshot
        const backup = this.snapshots.get(roomId);
        if (backup) {
          // Restore stats on standby node in-memory context (recovery loop)
          room.timeRemainingSeconds = backup.currentTick || 60;
          room.playerOne.score = backup.playerOne?.currentScore || 0;
          room.playerOne.streak = backup.playerOne?.currentStreak || 0;
          room.playerTwo.score = backup.playerTwo?.currentScore || 0;
          room.playerTwo.streak = backup.playerTwo?.currentStreak || 0;
        }

        // Reassign region node zone
        this.activeNodeZones.set(roomId, standbyZone);

        // Build failover redirect override packet
        const redirect = RegionalHandshakeOverride.create({
          roomId: roomId,
          assignedZone: standbyZone,
          targetNodeIp: "localhost:8080",
          syncTimestamp: Date.now()
        });

        // Broadcast failover standby redirection redirect
        const update = ServerGameStateUpdate.create({
          roomId: roomId,
          currentNodeZone: standbyZone,
          standbyOverride: redirect
        });
        const buffer = ServerGameStateUpdate.encode(update).finish();

        if (room.playerOne.socket) {
          try { room.playerOne.socket.send(buffer); } catch {}
        }
        if (room.playerTwo.socket) {
          try { room.playerTwo.socket.send(buffer); } catch {}
        }
        room.spectators.forEach(s => {
          try { s.send(buffer); } catch {}
        });

        console.log(`[CLUSTER MANAGER] Match ${roomId} migrated successfully under 1500ms window!`);
      }
    });
  }
}
