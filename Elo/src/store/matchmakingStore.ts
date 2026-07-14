import { create } from "zustand";
import { getBackendUrls } from "../utils/auth.ts";
import { encodeClientAction, decodeServerState } from "../utils/protobuf.ts";

export interface MatchReadyData {
  roomId: string;
  opponentName: string;
  opponentAvatarUrl: string;
  opponentElo: number;
  seed: string;
}

interface MatchmakingState {
  isQueued: boolean;
  disciplineMode: string;
  queueTime: number;
  matchReadyData: MatchReadyData | null;
  ws: WebSocket | null;
  startQueue: (playerId: string, disciplineMode: string) => void;
  cancelQueue: () => void;
  tickQueueTime: () => void;
  reset: () => void;
}

export const useMatchmakingStore = create<MatchmakingState>((set, get) => {
  let timerId: any = null;

  return {
    isQueued: false,
    disciplineMode: "MATH",
    queueTime: 0,
    matchReadyData: null,
    ws: null,

    startQueue: (playerId, disciplineMode) => {
      const state = get();
      if (state.isQueued) return;

      const urls = getBackendUrls();
      const wsUrl = `${urls.ws}?playerId=${playerId}`;
      const socket = new WebSocket(wsUrl);
      socket.binaryType = "arraybuffer";

      socket.onopen = () => {
        console.log("[MATCHMAKING WS] Socket open, joining matchmaking queue...");
        const payload = encodeClientAction({
          playerId,
          joinMatchmaking: {
            playerId,
            disciplineMode,
            currentElo: 1000,
            ticketTimestamp: BigInt(Date.now())
          }
        });
        socket.send(payload);
        set({ isQueued: true, disciplineMode, queueTime: 0, ws: socket });

        if (timerId) clearInterval(timerId);
        timerId = setInterval(() => {
          get().tickQueueTime();
        }, 1000);
      };

      socket.onmessage = (event) => {
        try {
          const buffer = new Uint8Array(event.data as ArrayBuffer);
          const update = decodeServerState(buffer);
          if (update.matchReady) {
            console.log("[MATCHMAKING WS] Matched! MatchReadySignal received:", update.matchReady);
            
            if (timerId) {
              clearInterval(timerId);
              timerId = null;
            }

            set({
              matchReadyData: {
                roomId: update.matchReady.roomId,
                opponentName: update.matchReady.opponentName,
                opponentAvatarUrl: update.matchReady.opponentAvatarUrl,
                opponentElo: update.matchReady.opponentElo,
                seed: update.matchReady.seed
              },
              isQueued: false
            });
          }
        } catch (e) {
          console.error("Error decoding server update in matchmaking socket:", e);
        }
      };

      socket.onclose = () => {
        console.log("[MATCHMAKING WS] Socket closed.");
        get().cancelQueue();
      };
    },

    cancelQueue: () => {
      const state = get();
      if (state.ws) {
        try {
          state.ws.close();
        } catch {}
      }
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      set({ isQueued: false, queueTime: 0, ws: null, matchReadyData: null });
    },

    tickQueueTime: () => {
      set((state) => ({ queueTime: state.queueTime + 1 }));
    },

    reset: () => {
      get().cancelQueue();
    }
  };
});
