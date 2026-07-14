import { elo } from "./proto/elo_proto.js";
import { dbService } from "./db.ts";
import { Matchmaker } from "./matchmaker.ts";
import { GameManager } from "./game.ts";
import { TournamentManager } from "./tournament.ts";
import { ClusterManager } from "./cluster.ts";
import { MetricsExporter } from "./metrics.ts";
import { LiveOpsManager } from "./liveops.ts";
import { IntegrityGuard } from "./security.ts";

const ClientAction = elo.v3.ClientAction;
const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;
const MatchState = elo.v3.MatchState;
const RoomType = elo.v3.RoomType;

const PresenceStatus = elo.v3.PresenceStatus;
const RelationshipState = elo.v3.RelationshipState;
const RelationshipAction = elo.v3.RelationshipAction;

export const playerConnections = new Map<string, any>();

function broadcastPresence(playerId: string | undefined, status: number) {
  if (!playerId) return;
  const friends = dbService.getFriends(playerId);
  const start = performance.now();
  friends.forEach(f => {
    const friendWs = playerConnections.get(f.id);
    if (friendWs) {
      const update = ServerGameStateUpdate.create({
        presenceUpdate: {
          playerId: playerId,
          status: status,
          timestamp: BigInt(Date.now())
        }
      });
      friendWs.send(ServerGameStateUpdate.encode(update).finish());
    }
  });
  const elapsed = performance.now() - start;
  if (elapsed > 0.8) {
    console.log(`[PERFORMANCE WARNING] Presence broadcast took ${elapsed.toFixed(3)}ms`);
  }
}

// Start cluster hot-standby replication
ClusterManager.start();

// Initialize dynamic live-ops seasonal catalog
dbService.initializeBattlePassSeason("season_1", 1, "Alpha Season");
LiveOpsManager.addEvent("DOUBLE_XP");

// Pre-provision enterprise B2B partner
dbService.registerB2BPartner("partner_1", "Global E-Sports Federation", "CORP_SECRET_KEY_123");

// Start matchmaker ticker
Matchmaker.start();

const PORT = process.env.PORT || 8080;

const server = Bun.serve<{ playerId?: string; roomId?: string; region?: string }>({
  port: PORT,
  fetch(req, server) {
    const url = new URL(req.url);

    // Enable CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // REST API routes
    if (url.pathname === "/api/ping") {
      return new Response("pong", { headers: corsHeaders });
    }

    if (url.pathname === "/api/ping-region" && req.method === "GET") {
      return new Response(JSON.stringify({
        closestZone: "REGION_ZONE_APAC_SOUTH",
        regionLabel: "APAC-South",
        nodes: [
          { zone: "REGION_ZONE_APAC_SOUTH", label: "APAC-South", latencyMs: 24 },
          { zone: "REGION_ZONE_EU_CENTRAL", label: "EU-Central", latencyMs: 142 },
          { zone: "REGION_ZONE_US_EAST", label: "US-East", latencyMs: 220 },
          { zone: "REGION_ZONE_ME_CENTRAL", label: "ME-Central", latencyMs: 88 }
        ]
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/metrics" && req.method === "GET") {
      return new Response(MetricsExporter.getPrometheusMetrics(), {
        headers: { ...corsHeaders, "Content-Type": "text/plain; version=0.0.4; charset=utf-8" }
      });
    }

    if (url.pathname === "/api/social/friends" && req.method === "GET") {
      const playerId = url.searchParams.get("playerId");
      if (!playerId) {
        return new Response(JSON.stringify({ error: "Missing playerId" }), { status: 400, headers: corsHeaders });
      }
      const friends = dbService.getFriends(playerId);
      return new Response(JSON.stringify({ friends }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/social/pending" && req.method === "GET") {
      const playerId = url.searchParams.get("playerId");
      if (!playerId) {
        return new Response(JSON.stringify({ error: "Missing playerId" }), { status: 400, headers: corsHeaders });
      }
      const pending = dbService.getPendingRequests(playerId);
      return new Response(JSON.stringify({ pending }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/social/messages" && req.method === "GET") {
      const p1 = url.searchParams.get("playerId1");
      const p2 = url.searchParams.get("playerId2");
      if (!p1 || !p2) {
        return new Response(JSON.stringify({ error: "Missing playerId1 or playerId2" }), { status: 400, headers: corsHeaders });
      }
      const messages = dbService.getDirectMessages(p1, p2);
      return new Response(JSON.stringify({ messages }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname.startsWith("/api/cdn/plugins/") && req.method === "GET") {
      const parts = url.pathname.split("/");
      const pluginId = parts[parts.length - 1];
      return new Response(JSON.stringify({
        id: pluginId,
        cachedAt: Date.now(),
        status: "cached_at_edge",
        sourceUrl: `https://elo.cdn.planet/artifacts/${pluginId}.js`
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" }
      });
    }

    if (url.pathname === "/api/config" && req.method === "GET") {
      return new Response(JSON.stringify({
        tournamentEnabled: true,
        antiCheatIntervalMs: 120,
        maintenanceBanner: ""
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/profile/delete" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { playerId } = body;
          if (!playerId) {
            return new Response("Missing parameters", { status: 400, headers: corsHeaders });
          }
          dbService.scheduleAccountDeletion(playerId);
          return new Response(JSON.stringify({ success: true, message: "Deletion scheduled. 7 days grace window open." }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => new Response(err.message, { status: 500, headers: corsHeaders }));
    }

    if (url.pathname === "/api/profile/consent" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { playerId, version } = body;
          if (!playerId || !version) {
            return new Response("Missing parameters", { status: 400, headers: corsHeaders });
          }
          dbService.saveConsentLog(playerId, version);
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => new Response(err.message, { status: 500, headers: corsHeaders }));
    }

    if (url.pathname === "/api/developer/webhook" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { playerId, targetUrl, secret } = body;
          if (!playerId || !targetUrl || !secret) {
            return new Response("Missing parameters", { status: 400, headers: corsHeaders });
          }
          dbService.registerWebhook(playerId, targetUrl, secret);
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => new Response(err.message, { status: 500, headers: corsHeaders }));
    }

    // ── Live-Ops Events ──────────────────────────────────────────────────
    if (url.pathname === "/api/events/active" && req.method === "GET") {
      return new Response(JSON.stringify({ events: LiveOpsManager.getActiveEventsList() }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // ── Battle Pass ──────────────────────────────────────────────────────
    if (url.pathname === "/api/profile/battlepass" && req.method === "GET") {
      const playerId = url.searchParams.get("playerId");
      if (!playerId) return new Response("Missing playerId", { status: 400, headers: corsHeaders });
      const pass = dbService.getUserCombatPass(playerId, "season_1");
      return new Response(JSON.stringify(pass), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/profile/battlepass/claim" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { playerId, tier } = body;
          if (!playerId || tier == null) return new Response("Missing parameters", { status: 400, headers: corsHeaders });
          dbService.claimBattlePassTier(playerId, "season_1", tier);
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => new Response(err.message, { status: 500, headers: corsHeaders }));
    }

    // ── Daily Challenges ─────────────────────────────────────────────────
    if (url.pathname === "/api/profile/challenges" && req.method === "GET") {
      const playerId = url.searchParams.get("playerId");
      if (!playerId) return new Response("Missing playerId", { status: 400, headers: corsHeaders });
      const challenges = dbService.getUserChallenges(playerId);
      return new Response(JSON.stringify(challenges), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/admin/refresh-challenges" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { playerId } = body;
          if (!playerId) return new Response("Missing playerId", { status: 400, headers: corsHeaders });
          dbService.generateDailyObjectives(playerId);
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => new Response(err.message, { status: 500, headers: corsHeaders }));
    }

    if (url.pathname === "/api/v1/federation/tournaments/create" && req.method === "POST") {
      const authHeader = req.headers.get("Authorization") || "";
      const apiKey = authHeader.replace("Bearer ", "").trim();
      
      const partner = dbService.verifyB2BPartnerKey(apiKey);
      if (!partner) {
        return new Response(JSON.stringify({ error: "Unauthorized B2B access key" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return req.json()
        .then((body: any) => {
          const { title, customConfig } = body;
          if (!title || !customConfig) {
            return new Response("Missing parameters", { status: 400, headers: corsHeaders });
          }
          const tId = `fed_tour_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          dbService.createFederatedTournament(tId, partner.id, title, JSON.stringify(customConfig));
          return new Response(JSON.stringify({ success: true, tournamentId: tId, is_corporate: 1 }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => new Response(err.message, { status: 500, headers: corsHeaders }));
    }

    if (url.pathname === "/api/auth/guest" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { id, username } = body;
          if (!id) {
            return new Response(JSON.stringify({ error: "Missing player ID" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }

          // Fetch player from DB
          let player = dbService.getPlayer(id);

          if (!player) {
            // Validate username if provided
            let finalUsername = username || `Guest_${Math.floor(1000 + Math.random() * 9000)}`;
            finalUsername = finalUsername.trim().replace(/[^a-zA-Z0-9]/g, "").slice(0, 14);

            if (!finalUsername) {
              finalUsername = `Guest_${Math.floor(1000 + Math.random() * 9000)}`;
            }

            // Check uniqueness
            let attempts = 0;
            while (dbService.getPlayerByUsername(finalUsername) && attempts < 10) {
              finalUsername = `${finalUsername.slice(0, 10)}${Math.floor(10 + Math.random() * 90)}`;
              attempts++;
            }

            player = dbService.createPlayer(id, finalUsername, true);
          } else if (username && username !== player.username) {
            // Update username / validate
            const cleanUsername = username.trim().replace(/[^a-zA-Z0-9]/g, "").slice(0, 14);
            if (cleanUsername && cleanUsername.length > 0 && !dbService.getPlayerByUsername(cleanUsername)) {
              // Re-create player / update not implemented, but we can do update if needed.
              // For Phase 1, username is set once at onboarding. Let's keep existing.
            }
          }

          return new Response(JSON.stringify(player), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        });
    }

    if (url.pathname === "/api/leaderboard" && req.method === "GET") {
      const top50 = dbService.getLeaderboard(50);
      return new Response(JSON.stringify(top50), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/shop/buy" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { playerId, itemId, cost } = body;
          if (!playerId || !itemId || cost === undefined) {
            return new Response(JSON.stringify({ error: "Missing parameters" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }

          const success = dbService.unlockTheme(playerId, itemId, cost);
          if (success) {
            const player = dbService.getPlayer(playerId);
            return new Response(JSON.stringify({ success: true, unlockedThemes: player ? JSON.parse(player.unlocked_themes) : [itemId] }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          } else {
            return new Response(JSON.stringify({ error: "Insufficient credits or theme already unlocked" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }
        })
        .catch(err => {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        });
    }

    if (url.pathname === "/api/profile/history" && req.method === "GET") {
      const playerId = url.searchParams.get("playerId");
      if (!playerId) {
        return new Response(JSON.stringify({ error: "Missing playerId" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const history = dbService.getPlayerMatchHistory(playerId);
      return new Response(JSON.stringify({ history }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/profile/archives" && req.method === "GET") {
      const playerId = url.searchParams.get("playerId");
      if (!playerId) {
        return new Response(JSON.stringify({ error: "Missing playerId" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      const archives = dbService.getPlayerSeasonArchive(playerId);
      return new Response(JSON.stringify({ archives }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (url.pathname === "/api/shop/select-theme" && req.method === "POST") {
      return req.json()
        .then((body: any) => {
          const { playerId, themeId, activeTitle } = body;
          if (!playerId || !themeId) {
            return new Response(JSON.stringify({ error: "Missing parameters" }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" }
            });
          }

          dbService.updatePlayerThemeAndTitle(playerId, themeId, activeTitle || "");
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        })
        .catch(err => {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        });
    }

    // WebSocket Upgrade
    if (url.pathname === "/ws") {
      const attestation = url.searchParams.get("attestationToken");
      if (attestation && !IntegrityGuard.verifyAttestation(attestation)) {
        return new Response("Tampered client runtime or root detection flagged", {
          status: 400,
          headers: corsHeaders
        });
      }

      const upgraded = server.upgrade(req, {
        data: {
          playerId: url.searchParams.get("playerId") || undefined,
          roomId: url.searchParams.get("roomId") || undefined,
          region: url.searchParams.get("region") || "us"
        }
      });
      if (upgraded) return;
      return new Response("Upgrade failed", { status: 400 });
    }

    return new Response("Not Found", { status: 404 });
  },

  websocket: {
    open(ws) {
      const playerId = ws.data.playerId;
      console.log(`WebSocket open. PlayerId: ${playerId}`);
      
      if (playerId) {
        playerConnections.set(playerId, ws);
        broadcastPresence(playerId, PresenceStatus.PRESENCE_ONLINE);

        const roomId = ws.data.roomId;
        if (roomId) {
          const room = GameManager.getRoom(roomId);
          if (room) {
            room.handleReconnect(playerId, ws);
          }
        }
      }
    },

    message(ws, message) {
      if (typeof message === "string" && message === "ping") {
        ws.send("pong");
        return;
      }

      try {
        const buffer = message as Buffer;
        const action = ClientAction.decode(new Uint8Array(buffer));
        console.log("Decoded Action:", JSON.stringify(action));

        if (action.payload === "updatePresence" && action.updatePresence !== undefined) {
          const status = action.updatePresence;
          broadcastPresence(ws.data.playerId, status);
          return;
        } else if (action.payload === "relationshipAction" && action.relationshipAction) {
          const targetPlayerId = action.relationshipAction.targetPlayerId;
          const relAction = action.relationshipAction.action;
          const playerId = ws.data.playerId;
          if (playerId && targetPlayerId) {
            let success = false;
            let state = RelationshipState.RELATION_NONE;

            if (relAction === RelationshipAction.ACTION_SEND_REQUEST) {
              success = dbService.sendFriendRequest(playerId, targetPlayerId);
              state = RelationshipState.RELATION_PENDING_A;
            } else if (relAction === RelationshipAction.ACTION_ACCEPT_REQUEST) {
              success = dbService.acceptFriendRequest(playerId, targetPlayerId);
              state = RelationshipState.RELATION_FRIENDS;
            } else if (relAction === RelationshipAction.ACTION_BLOCK_USER) {
              dbService.blockUser(playerId, targetPlayerId);
              success = true;
              state = RelationshipState.RELATION_BLOCKED;
            }

            if (success) {
              const updateInitiator = ServerGameStateUpdate.create({
                relationshipUpdate: {
                  initiatorId: playerId,
                  targetId: targetPlayerId,
                  state: state,
                  timestamp: BigInt(Date.now())
                }
              });
              ws.send(ServerGameStateUpdate.encode(updateInitiator).finish());

              const targetWs = playerConnections.get(targetPlayerId);
              if (targetWs) {
                const updateTarget = ServerGameStateUpdate.create({
                  relationshipUpdate: {
                    initiatorId: playerId,
                    targetId: targetPlayerId,
                    state: state,
                    timestamp: BigInt(Date.now())
                  }
                });
                targetWs.send(ServerGameStateUpdate.encode(updateTarget).finish());
              }
              
              if (state === RelationshipState.RELATION_FRIENDS) {
                broadcastPresence(playerId, PresenceStatus.PRESENCE_ONLINE);
                broadcastPresence(targetPlayerId, PresenceStatus.PRESENCE_ONLINE);
              }
            }
          }
          return;
        } else if (action.payload === "sendDirectMessage" && action.sendDirectMessage) {
          const dm = action.sendDirectMessage;
          const senderId = ws.data.playerId;
          const receiverId = dm.receiverId;
          const text = dm.messageText;
          if (senderId && receiverId && text) {
            const region = ws.data.region || "us";
            dbService.saveDirectMessage(senderId, receiverId, text, region);

            const targetWs = playerConnections.get(receiverId);
            if (targetWs) {
              const messageUpdate = ServerGameStateUpdate.create({
                directMessage: {
                  id: dm.id || `dm_${senderId}_${receiverId}_${Date.now()}`,
                  senderId: senderId,
                  receiverId: receiverId,
                  messageText: text,
                  timestamp: BigInt(Date.now())
                }
              });
              targetWs.send(ServerGameStateUpdate.encode(messageUpdate).finish());
            }
          }
          return;
        }

        if (action.payload === "connectionHandshake" && action.connectionHandshake) {
          const token = action.connectionHandshake.reconnectionToken;
          console.log(`[HANDSHAKE] Player reconnecting with token: ${token}`);
          const room = GameManager.reconnectPlayer(token, ws);
          if (room) {
            ws.data.playerId = action.connectionHandshake.playerId;
            ws.data.roomId = room.id;
          } else {
            console.log(`[HANDSHAKE] Invalid or expired reconnection token: ${token}`);
            const responseUpdate = ServerGameStateUpdate.create({
              roomId: "",
              state: MatchState.MATCH_STATE_FINISHED,
              winnerId: "error_handshake_failed"
            });
            ws.send(ServerGameStateUpdate.encode(responseUpdate).finish());
          }
        } else if (action.joinQueuePlayerId || action.payload === "joinQueuePlayerId") {
          const pId = action.joinQueuePlayerId || action.playerId;
          console.log(`Join Queue Request for ${pId}`);
          Matchmaker.join(pId, ws);
          ws.data.playerId = pId;
        } else if (action.payload === "joinTournamentPlayerId") {
          console.log(`Join Tournament Request for ${action.joinTournamentPlayerId}`);
          TournamentManager.joinQueue(action.joinTournamentPlayerId, ws);
          ws.data.playerId = action.joinTournamentPlayerId;
        } else if (action.payload === "spectateRoomId") {
          console.log(`Spectate Room Request for ${action.spectateRoomId}`);
          const room = GameManager.getRoom(action.spectateRoomId);
          if (room) {
            room.spectators.push(ws);
            room.broadcastState();
          }
        } else if (action.payload === "emojiBurst") {
          const room = GameManager.getRoom(action.roomId);
          if (room && action.emojiBurst) {
            const burstUpdate = ServerGameStateUpdate.create({
              roomId: action.roomId,
              emojiBurst: action.emojiBurst
            });
            const burstBuffer = ServerGameStateUpdate.encode(burstUpdate).finish();
            room.playerOne.socket?.send(burstBuffer);
            room.playerTwo.socket?.send(burstBuffer);
            room.spectators.forEach(s => {
              try { s.send(burstBuffer); } catch {}
            });
          }
        } else if (action.payload === "createCustomRoom") {
          const code = GameManager.createPrivateLobby(action.playerId, ws, action.createCustomRoom);
          const responseUpdate = ServerGameStateUpdate.create({
            roomId: `lobby_${code}`,
            state: MatchState.MATCH_STATE_UNSPECIFIED,
            roomType: RoomType.ROOM_TYPE_PRIVATE,
            privateRoomCode: code
          });
          const responseBuffer = ServerGameStateUpdate.encode(responseUpdate).finish();
          ws.send(responseBuffer);
          ws.data.playerId = action.playerId;
        } else if (action.payload === "joinPrivateRoomCode") {
          const room = GameManager.joinPrivateLobby(action.playerId, ws, action.joinPrivateRoomCode);
          if (!room) {
            const responseUpdate = ServerGameStateUpdate.create({
              roomId: "",
              state: MatchState.MATCH_STATE_FINISHED,
              roomType: RoomType.ROOM_TYPE_PRIVATE,
              winnerId: "error_invalid_code"
            });
            const responseBuffer = ServerGameStateUpdate.encode(responseUpdate).finish();
            ws.send(responseBuffer);
          } else {
            ws.data.playerId = action.playerId;
          }
        } else if (action.roomId && action.playerId) {
          console.log(`Gameplay Action for Room: ${action.roomId}, Player: ${action.playerId}`);
          const room = GameManager.getRoom(action.roomId);
          if (room) {
            room.handleClientAction(action.playerId, action);
          } else {
            console.log(`Room not found: ${action.roomId}`);
          }
        } else {
          console.log("Action lacks roomId/playerId or payload details:", JSON.stringify(action));
        }
      } catch (err) {
        console.error("Failed to process WebSocket message:", err);
      }
    },

    close(ws, code, reason) {
      const playerId = ws.data.playerId;
      const roomId = ws.data.roomId;
      
      console.log(`WebSocket closed. PlayerId: ${playerId}, Code: ${code}`);

      if (playerId) {
        playerConnections.delete(playerId);
        broadcastPresence(playerId, PresenceStatus.PRESENCE_OFFLINE);

        Matchmaker.leave(playerId);
        
        if (roomId) {
          const room = GameManager.getRoom(roomId);
          if (room) {
            room.handleDisconnect(playerId);
          }
        }
      }
    }
  }
});

console.log(`Elo Backend Server running on http://localhost:${server.port}`);
