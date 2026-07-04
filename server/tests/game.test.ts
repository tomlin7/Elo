import { describe, expect, test } from "bun:test";
import { GameManager } from "../src/game.ts";

describe("Connection Resilience and Reconnection Token Handshake", () => {
  test("registers tokens and reconnects players correctly on socket dropouts", () => {
    const mockWs = { send: () => {}, data: {} };
    const room = GameManager.createBotGame("test_recon_bot", mockWs, 1200);

    expect(room).not.toBeNil();
    expect(room!.playerOneReconToken).toStartWith("recon_p1_");

    // Handshake test: reconnection maps back to same GameRoom instance
    const newMockWs = { send: () => {}, data: {} };
    const recoveredRoom = GameManager.reconnectPlayer(room!.playerOneReconToken, newMockWs);

    expect(recoveredRoom).not.toBeNil();
    expect(recoveredRoom!.id).toBe(room!.id);
  });
});
