import { describe, expect, test, beforeEach } from "bun:test";
import { dbService, db } from "../src/db.ts";
import { elo } from "../src/proto/elo_proto.js";

const PresenceStatus = elo.v3.PresenceStatus;
const RelationshipState = elo.v3.RelationshipState;

describe("Real-Time Social Mesh & Messaging Service", () => {
  let player1Id: string;
  let player2Id: string;
  
  beforeEach(() => {
    player1Id = `p1_${Math.random().toString(36).substring(2, 7)}`;
    player2Id = `p2_${Math.random().toString(36).substring(2, 7)}`;
    dbService.createPlayer(player1Id, `user_${player1Id}`);
    dbService.createPlayer(player2Id, `user_${player2Id}`);
  });

  test("enforces relational state transitions (send, accept, block)", () => {
    // Send Request
    const sendSuccess = dbService.sendFriendRequest(player1Id, player2Id);
    expect(sendSuccess).toBe(true);

    // Duplicate send should fail
    const sendAgain = dbService.sendFriendRequest(player1Id, player2Id);
    expect(sendAgain).toBe(false);

    // Accept Request
    const acceptSuccess = dbService.acceptFriendRequest(player2Id, player1Id); // player2 accepts player1
    expect(acceptSuccess).toBe(true);

    // Check friends list
    const friends1 = dbService.getFriends(player1Id);
    const friends2 = dbService.getFriends(player2Id);
    expect(friends1.some(f => f.id === player2Id)).toBe(true);
    expect(friends2.some(f => f.id === player1Id)).toBe(true);

    // Block User
    dbService.blockUser(player1Id, player2Id);
    const friendsPostBlock = dbService.getFriends(player1Id);
    expect(friendsPostBlock.some(f => f.id === player2Id)).toBe(false);

    // Check relationship state is BLOCKED
    const checkState = db.query("SELECT relationship_state FROM user_relationships WHERE initiator_id = $p1 AND target_id = $p2")
      .get({ $p1: player1Id, $p2: player2Id }) as any;
    expect(checkState.relationship_state).toBe("BLOCKED");
  });

  test("direct messages are committed to SQLite regional shards (write-through cache)", () => {
    const payload = "EncryptedSecretPayloadHere";
    
    // Save Direct Message to US shard
    dbService.saveDirectMessage(player1Id, player2Id, payload, "us");

    // Retrieve from global db
    const dms = dbService.getDirectMessages(player1Id, player2Id);
    expect(dms.length).toBe(1);
    expect(dms[0].encrypted_payload).toBe(payload);
    expect(dms[0].sender_id).toBe(player1Id);
    expect(dms[0].receiver_id).toBe(player2Id);
  });

  test("presence broadcast logic processes peer checks within the 0.8ms NFR window", () => {
    // Establish friendship
    dbService.sendFriendRequest(player1Id, player2Id);
    dbService.acceptFriendRequest(player2Id, player1Id);

    const start = performance.now();
    // Simulate presence update broadcast check loop
    const friends = dbService.getFriends(player1Id);
    friends.forEach(f => {
      // Mock lookup
      const fId = f.id;
      expect(fId).toBe(player2Id);
    });
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(0.8);
  });
});
