import { elo } from "../proto/elo_proto.js";

export const ClientAction = elo.v3.ClientAction;
export const ServerGameStateUpdate = elo.v3.ServerGameStateUpdate;
export const MatchState = elo.v3.MatchState;

export function encodeClientAction(payload: elo.v3.IClientAction): Uint8Array {
  const action = ClientAction.create(payload);
  return ClientAction.encode(action).finish();
}

export function decodeServerState(buffer: Uint8Array): elo.v3.IServerGameStateUpdate {
  return ServerGameStateUpdate.decode(buffer);
}
