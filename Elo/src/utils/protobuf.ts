import { elo } from "../proto/elo_proto.js";

export const ClientAction = elo.v1.ClientAction;
export const ServerGameStateUpdate = elo.v1.ServerGameStateUpdate;
export const MatchState = elo.v1.MatchState;

export function encodeClientAction(payload: elo.v1.IClientAction): Uint8Array {
  const action = ClientAction.create(payload);
  return ClientAction.encode(action).finish();
}

export function decodeServerState(buffer: Uint8Array): elo.v1.IServerGameStateUpdate {
  return ServerGameStateUpdate.decode(buffer);
}
