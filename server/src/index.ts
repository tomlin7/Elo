import { elo } from "./proto/elo_proto.js";
import { dbService } from "./db.ts";
import { Matchmaker } from "./matchmaker.ts";
import { GameManager } from "./game.ts";
import { TournamentManager } from "./tournament.ts";

const ClientAction = elo.v3.ClientAction;
const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;
const MatchState = elo.v3.MatchState;
const RoomType = elo.v3.RoomType;

// Start matchmaker ticker
Matchmaker.start();

const PORT = process.env.PORT || 8080;

const server = Bun.serve<{ playerId?: string; roomId?: string }>({
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
      const upgraded = server.upgrade(req, {
        data: {
          playerId: url.searchParams.get("playerId") || undefined,
          roomId: url.searchParams.get("roomId") || undefined
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
      
      // If reconnecting player had an active game, rejoin them
      if (playerId) {
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
      try {
        const buffer = message as Buffer;
        const action = ClientAction.decode(new Uint8Array(buffer));
        console.log("Decoded Action:", JSON.stringify(action));

        if (action.joinQueuePlayerId || action.payload === "joinQueuePlayerId") {
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
