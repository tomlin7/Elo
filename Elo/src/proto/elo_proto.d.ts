import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace elo. */
export namespace elo {

    /** Namespace v3. */
    namespace v3 {

        /** MatchState enum. */
        enum MatchState {
            MATCH_STATE_UNSPECIFIED = 0,
            MATCH_STATE_COUNTDOWN = 1,
            MATCH_STATE_ACTIVE = 2,
            MATCH_STATE_PAUSED_DISCONNECT = 3,
            MATCH_STATE_FINISHED = 4
        }

        /** RoomType enum. */
        enum RoomType {
            ROOM_TYPE_RANKED = 0,
            ROOM_TYPE_PRIVATE = 1,
            ROOM_TYPE_TOURNAMENT = 2
        }

        /** TournamentRound enum. */
        enum TournamentRound {
            ROUND_UNSPECIFIED = 0,
            ROUND_QUARTERFINALS = 1,
            ROUND_SEMIFINALS = 2,
            ROUND_FINALS = 3
        }

        /** MatchNodeStatus enum. */
        enum MatchNodeStatus {
            STATUS_PENDING = 0,
            STATUS_IN_PROGRESS = 1,
            STATUS_COMPLETED = 2
        }

        /** Properties of a PlayerIdentity. */
        interface IPlayerIdentity {

            /** PlayerIdentity playerId */
            playerId?: (string|null);

            /** PlayerIdentity username */
            username?: (string|null);

            /** PlayerIdentity eloRating */
            eloRating?: (number|null);

            /** PlayerIdentity selectedThemeId */
            selectedThemeId?: (string|null);

            /** PlayerIdentity activeTitle */
            activeTitle?: (string|null);

            /** PlayerIdentity level */
            level?: (number|null);

            /** PlayerIdentity xp */
            xp?: (number|null);
        }

        /** Represents a PlayerIdentity. */
        class PlayerIdentity implements IPlayerIdentity {

            /**
             * Constructs a new PlayerIdentity.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.IPlayerIdentity);

            /** PlayerIdentity playerId. */
            public playerId: string;

            /** PlayerIdentity username. */
            public username: string;

            /** PlayerIdentity eloRating. */
            public eloRating: number;

            /** PlayerIdentity selectedThemeId. */
            public selectedThemeId: string;

            /** PlayerIdentity activeTitle. */
            public activeTitle: string;

            /** PlayerIdentity level. */
            public level: number;

            /** PlayerIdentity xp. */
            public xp: number;

            /**
             * Creates a new PlayerIdentity instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PlayerIdentity instance
             */
            public static create(properties?: elo.v3.IPlayerIdentity): elo.v3.PlayerIdentity;

            /**
             * Encodes the specified PlayerIdentity message. Does not implicitly {@link elo.v3.PlayerIdentity.verify|verify} messages.
             * @param message PlayerIdentity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.IPlayerIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlayerIdentity message, length delimited. Does not implicitly {@link elo.v3.PlayerIdentity.verify|verify} messages.
             * @param message PlayerIdentity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.IPlayerIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlayerIdentity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PlayerIdentity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.PlayerIdentity;

            /**
             * Decodes a PlayerIdentity message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PlayerIdentity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.PlayerIdentity;

            /**
             * Verifies a PlayerIdentity message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PlayerIdentity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PlayerIdentity
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.PlayerIdentity;

            /**
             * Creates a plain object from a PlayerIdentity message. Also converts values to other types if specified.
             * @param message PlayerIdentity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.PlayerIdentity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PlayerIdentity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for PlayerIdentity
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CreateCustomRoomRequest. */
        interface ICreateCustomRoomRequest {

            /** CreateCustomRoomRequest hostPlayerId */
            hostPlayerId?: (string|null);

            /** CreateCustomRoomRequest allowDivision */
            allowDivision?: (boolean|null);

            /** CreateCustomRoomRequest allowMultiplication */
            allowMultiplication?: (boolean|null);

            /** CreateCustomRoomRequest customDurationSeconds */
            customDurationSeconds?: (number|null);
        }

        /** Represents a CreateCustomRoomRequest. */
        class CreateCustomRoomRequest implements ICreateCustomRoomRequest {

            /**
             * Constructs a new CreateCustomRoomRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.ICreateCustomRoomRequest);

            /** CreateCustomRoomRequest hostPlayerId. */
            public hostPlayerId: string;

            /** CreateCustomRoomRequest allowDivision. */
            public allowDivision: boolean;

            /** CreateCustomRoomRequest allowMultiplication. */
            public allowMultiplication: boolean;

            /** CreateCustomRoomRequest customDurationSeconds. */
            public customDurationSeconds: number;

            /**
             * Creates a new CreateCustomRoomRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CreateCustomRoomRequest instance
             */
            public static create(properties?: elo.v3.ICreateCustomRoomRequest): elo.v3.CreateCustomRoomRequest;

            /**
             * Encodes the specified CreateCustomRoomRequest message. Does not implicitly {@link elo.v3.CreateCustomRoomRequest.verify|verify} messages.
             * @param message CreateCustomRoomRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.ICreateCustomRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CreateCustomRoomRequest message, length delimited. Does not implicitly {@link elo.v3.CreateCustomRoomRequest.verify|verify} messages.
             * @param message CreateCustomRoomRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.ICreateCustomRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateCustomRoomRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateCustomRoomRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.CreateCustomRoomRequest;

            /**
             * Decodes a CreateCustomRoomRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CreateCustomRoomRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.CreateCustomRoomRequest;

            /**
             * Verifies a CreateCustomRoomRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateCustomRoomRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateCustomRoomRequest
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.CreateCustomRoomRequest;

            /**
             * Creates a plain object from a CreateCustomRoomRequest message. Also converts values to other types if specified.
             * @param message CreateCustomRoomRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.CreateCustomRoomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateCustomRoomRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CreateCustomRoomRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a MatchSecurityLog. */
        interface IMatchSecurityLog {

            /** MatchSecurityLog actionSequenceId */
            actionSequenceId?: (string|null);

            /** MatchSecurityLog keystrokeDeltaMs */
            keystrokeDeltaMs?: (number|Long|null);

            /** MatchSecurityLog inputValue */
            inputValue?: (string|null);
        }

        /** Represents a MatchSecurityLog. */
        class MatchSecurityLog implements IMatchSecurityLog {

            /**
             * Constructs a new MatchSecurityLog.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.IMatchSecurityLog);

            /** MatchSecurityLog actionSequenceId. */
            public actionSequenceId: string;

            /** MatchSecurityLog keystrokeDeltaMs. */
            public keystrokeDeltaMs: (number|Long);

            /** MatchSecurityLog inputValue. */
            public inputValue: string;

            /**
             * Creates a new MatchSecurityLog instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MatchSecurityLog instance
             */
            public static create(properties?: elo.v3.IMatchSecurityLog): elo.v3.MatchSecurityLog;

            /**
             * Encodes the specified MatchSecurityLog message. Does not implicitly {@link elo.v3.MatchSecurityLog.verify|verify} messages.
             * @param message MatchSecurityLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.IMatchSecurityLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MatchSecurityLog message, length delimited. Does not implicitly {@link elo.v3.MatchSecurityLog.verify|verify} messages.
             * @param message MatchSecurityLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.IMatchSecurityLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MatchSecurityLog message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MatchSecurityLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.MatchSecurityLog;

            /**
             * Decodes a MatchSecurityLog message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MatchSecurityLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.MatchSecurityLog;

            /**
             * Verifies a MatchSecurityLog message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MatchSecurityLog message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MatchSecurityLog
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.MatchSecurityLog;

            /**
             * Creates a plain object from a MatchSecurityLog message. Also converts values to other types if specified.
             * @param message MatchSecurityLog
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.MatchSecurityLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MatchSecurityLog to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for MatchSecurityLog
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a TournamentNode. */
        interface ITournamentNode {

            /** TournamentNode nodeId */
            nodeId?: (string|null);

            /** TournamentNode roundTier */
            roundTier?: (elo.v3.TournamentRound|null);

            /** TournamentNode status */
            status?: (elo.v3.MatchNodeStatus|null);

            /** TournamentNode playerOneId */
            playerOneId?: (string|null);

            /** TournamentNode playerTwoId */
            playerTwoId?: (string|null);

            /** TournamentNode winnerId */
            winnerId?: (string|null);

            /** TournamentNode activeRoomId */
            activeRoomId?: (string|null);

            /** TournamentNode playerOneUsername */
            playerOneUsername?: (string|null);

            /** TournamentNode playerTwoUsername */
            playerTwoUsername?: (string|null);
        }

        /** Represents a TournamentNode. */
        class TournamentNode implements ITournamentNode {

            /**
             * Constructs a new TournamentNode.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.ITournamentNode);

            /** TournamentNode nodeId. */
            public nodeId: string;

            /** TournamentNode roundTier. */
            public roundTier: elo.v3.TournamentRound;

            /** TournamentNode status. */
            public status: elo.v3.MatchNodeStatus;

            /** TournamentNode playerOneId. */
            public playerOneId: string;

            /** TournamentNode playerTwoId. */
            public playerTwoId: string;

            /** TournamentNode winnerId. */
            public winnerId: string;

            /** TournamentNode activeRoomId. */
            public activeRoomId: string;

            /** TournamentNode playerOneUsername. */
            public playerOneUsername: string;

            /** TournamentNode playerTwoUsername. */
            public playerTwoUsername: string;

            /**
             * Creates a new TournamentNode instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TournamentNode instance
             */
            public static create(properties?: elo.v3.ITournamentNode): elo.v3.TournamentNode;

            /**
             * Encodes the specified TournamentNode message. Does not implicitly {@link elo.v3.TournamentNode.verify|verify} messages.
             * @param message TournamentNode message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.ITournamentNode, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TournamentNode message, length delimited. Does not implicitly {@link elo.v3.TournamentNode.verify|verify} messages.
             * @param message TournamentNode message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.ITournamentNode, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TournamentNode message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TournamentNode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.TournamentNode;

            /**
             * Decodes a TournamentNode message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TournamentNode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.TournamentNode;

            /**
             * Verifies a TournamentNode message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TournamentNode message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TournamentNode
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.TournamentNode;

            /**
             * Creates a plain object from a TournamentNode message. Also converts values to other types if specified.
             * @param message TournamentNode
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.TournamentNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TournamentNode to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TournamentNode
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a TournamentBracketUpdate. */
        interface ITournamentBracketUpdate {

            /** TournamentBracketUpdate tournamentId */
            tournamentId?: (string|null);

            /** TournamentBracketUpdate bracketNodes */
            bracketNodes?: (elo.v3.ITournamentNode[]|null);

            /** TournamentBracketUpdate nextRoundGlobalStartTime */
            nextRoundGlobalStartTime?: (number|Long|null);
        }

        /** Represents a TournamentBracketUpdate. */
        class TournamentBracketUpdate implements ITournamentBracketUpdate {

            /**
             * Constructs a new TournamentBracketUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.ITournamentBracketUpdate);

            /** TournamentBracketUpdate tournamentId. */
            public tournamentId: string;

            /** TournamentBracketUpdate bracketNodes. */
            public bracketNodes: elo.v3.ITournamentNode[];

            /** TournamentBracketUpdate nextRoundGlobalStartTime. */
            public nextRoundGlobalStartTime: (number|Long);

            /**
             * Creates a new TournamentBracketUpdate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TournamentBracketUpdate instance
             */
            public static create(properties?: elo.v3.ITournamentBracketUpdate): elo.v3.TournamentBracketUpdate;

            /**
             * Encodes the specified TournamentBracketUpdate message. Does not implicitly {@link elo.v3.TournamentBracketUpdate.verify|verify} messages.
             * @param message TournamentBracketUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.ITournamentBracketUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TournamentBracketUpdate message, length delimited. Does not implicitly {@link elo.v3.TournamentBracketUpdate.verify|verify} messages.
             * @param message TournamentBracketUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.ITournamentBracketUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TournamentBracketUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TournamentBracketUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.TournamentBracketUpdate;

            /**
             * Decodes a TournamentBracketUpdate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TournamentBracketUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.TournamentBracketUpdate;

            /**
             * Verifies a TournamentBracketUpdate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TournamentBracketUpdate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TournamentBracketUpdate
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.TournamentBracketUpdate;

            /**
             * Creates a plain object from a TournamentBracketUpdate message. Also converts values to other types if specified.
             * @param message TournamentBracketUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.TournamentBracketUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TournamentBracketUpdate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TournamentBracketUpdate
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a SpectatorEmojiBurst. */
        interface ISpectatorEmojiBurst {

            /** SpectatorEmojiBurst roomId */
            roomId?: (string|null);

            /** SpectatorEmojiBurst emojiType */
            emojiType?: (string|null);

            /** SpectatorEmojiBurst executionCoordinateX */
            executionCoordinateX?: (number|null);
        }

        /** Represents a SpectatorEmojiBurst. */
        class SpectatorEmojiBurst implements ISpectatorEmojiBurst {

            /**
             * Constructs a new SpectatorEmojiBurst.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.ISpectatorEmojiBurst);

            /** SpectatorEmojiBurst roomId. */
            public roomId: string;

            /** SpectatorEmojiBurst emojiType. */
            public emojiType: string;

            /** SpectatorEmojiBurst executionCoordinateX. */
            public executionCoordinateX: number;

            /**
             * Creates a new SpectatorEmojiBurst instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SpectatorEmojiBurst instance
             */
            public static create(properties?: elo.v3.ISpectatorEmojiBurst): elo.v3.SpectatorEmojiBurst;

            /**
             * Encodes the specified SpectatorEmojiBurst message. Does not implicitly {@link elo.v3.SpectatorEmojiBurst.verify|verify} messages.
             * @param message SpectatorEmojiBurst message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.ISpectatorEmojiBurst, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SpectatorEmojiBurst message, length delimited. Does not implicitly {@link elo.v3.SpectatorEmojiBurst.verify|verify} messages.
             * @param message SpectatorEmojiBurst message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.ISpectatorEmojiBurst, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SpectatorEmojiBurst message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SpectatorEmojiBurst
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.SpectatorEmojiBurst;

            /**
             * Decodes a SpectatorEmojiBurst message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SpectatorEmojiBurst
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.SpectatorEmojiBurst;

            /**
             * Verifies a SpectatorEmojiBurst message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SpectatorEmojiBurst message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SpectatorEmojiBurst
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.SpectatorEmojiBurst;

            /**
             * Creates a plain object from a SpectatorEmojiBurst message. Also converts values to other types if specified.
             * @param message SpectatorEmojiBurst
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.SpectatorEmojiBurst, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SpectatorEmojiBurst to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for SpectatorEmojiBurst
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a NetworkHandshake. */
        interface INetworkHandshake {

            /** NetworkHandshake playerId */
            playerId?: (string|null);

            /** NetworkHandshake sessionToken */
            sessionToken?: (string|null);

            /** NetworkHandshake reconnectionToken */
            reconnectionToken?: (string|null);

            /** NetworkHandshake lastReceivedServerTick */
            lastReceivedServerTick?: (number|Long|null);
        }

        /** Represents a NetworkHandshake. */
        class NetworkHandshake implements INetworkHandshake {

            /**
             * Constructs a new NetworkHandshake.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.INetworkHandshake);

            /** NetworkHandshake playerId. */
            public playerId: string;

            /** NetworkHandshake sessionToken. */
            public sessionToken: string;

            /** NetworkHandshake reconnectionToken. */
            public reconnectionToken: string;

            /** NetworkHandshake lastReceivedServerTick. */
            public lastReceivedServerTick: (number|Long);

            /**
             * Creates a new NetworkHandshake instance using the specified properties.
             * @param [properties] Properties to set
             * @returns NetworkHandshake instance
             */
            public static create(properties?: elo.v3.INetworkHandshake): elo.v3.NetworkHandshake;

            /**
             * Encodes the specified NetworkHandshake message. Does not implicitly {@link elo.v3.NetworkHandshake.verify|verify} messages.
             * @param message NetworkHandshake message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.INetworkHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified NetworkHandshake message, length delimited. Does not implicitly {@link elo.v3.NetworkHandshake.verify|verify} messages.
             * @param message NetworkHandshake message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.INetworkHandshake, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a NetworkHandshake message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns NetworkHandshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.NetworkHandshake;

            /**
             * Decodes a NetworkHandshake message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns NetworkHandshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.NetworkHandshake;

            /**
             * Verifies a NetworkHandshake message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a NetworkHandshake message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns NetworkHandshake
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.NetworkHandshake;

            /**
             * Creates a plain object from a NetworkHandshake message. Also converts values to other types if specified.
             * @param message NetworkHandshake
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.NetworkHandshake, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this NetworkHandshake to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for NetworkHandshake
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an OperationTelemetry. */
        interface IOperationTelemetry {

            /** OperationTelemetry operationType */
            operationType?: (string|null);

            /** OperationTelemetry totalPresented */
            totalPresented?: (number|null);

            /** OperationTelemetry totalCorrect */
            totalCorrect?: (number|null);

            /** OperationTelemetry averageSolveTimeMs */
            averageSolveTimeMs?: (number|Long|null);
        }

        /** Represents an OperationTelemetry. */
        class OperationTelemetry implements IOperationTelemetry {

            /**
             * Constructs a new OperationTelemetry.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.IOperationTelemetry);

            /** OperationTelemetry operationType. */
            public operationType: string;

            /** OperationTelemetry totalPresented. */
            public totalPresented: number;

            /** OperationTelemetry totalCorrect. */
            public totalCorrect: number;

            /** OperationTelemetry averageSolveTimeMs. */
            public averageSolveTimeMs: (number|Long);

            /**
             * Creates a new OperationTelemetry instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OperationTelemetry instance
             */
            public static create(properties?: elo.v3.IOperationTelemetry): elo.v3.OperationTelemetry;

            /**
             * Encodes the specified OperationTelemetry message. Does not implicitly {@link elo.v3.OperationTelemetry.verify|verify} messages.
             * @param message OperationTelemetry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.IOperationTelemetry, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OperationTelemetry message, length delimited. Does not implicitly {@link elo.v3.OperationTelemetry.verify|verify} messages.
             * @param message OperationTelemetry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.IOperationTelemetry, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OperationTelemetry message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OperationTelemetry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.OperationTelemetry;

            /**
             * Decodes an OperationTelemetry message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OperationTelemetry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.OperationTelemetry;

            /**
             * Verifies an OperationTelemetry message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OperationTelemetry message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OperationTelemetry
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.OperationTelemetry;

            /**
             * Creates a plain object from an OperationTelemetry message. Also converts values to other types if specified.
             * @param message OperationTelemetry
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.OperationTelemetry, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OperationTelemetry to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for OperationTelemetry
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a HistoricalMatchSummary. */
        interface IHistoricalMatchSummary {

            /** HistoricalMatchSummary matchId */
            matchId?: (string|null);

            /** HistoricalMatchSummary opponentUsername */
            opponentUsername?: (string|null);

            /** HistoricalMatchSummary isVictory */
            isVictory?: (boolean|null);

            /** HistoricalMatchSummary eloDelta */
            eloDelta?: (number|null);

            /** HistoricalMatchSummary matchTimestamp */
            matchTimestamp?: (number|Long|null);

            /** HistoricalMatchSummary stats */
            stats?: (elo.v3.IOperationTelemetry[]|null);
        }

        /** Represents a HistoricalMatchSummary. */
        class HistoricalMatchSummary implements IHistoricalMatchSummary {

            /**
             * Constructs a new HistoricalMatchSummary.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.IHistoricalMatchSummary);

            /** HistoricalMatchSummary matchId. */
            public matchId: string;

            /** HistoricalMatchSummary opponentUsername. */
            public opponentUsername: string;

            /** HistoricalMatchSummary isVictory. */
            public isVictory: boolean;

            /** HistoricalMatchSummary eloDelta. */
            public eloDelta: number;

            /** HistoricalMatchSummary matchTimestamp. */
            public matchTimestamp: (number|Long);

            /** HistoricalMatchSummary stats. */
            public stats: elo.v3.IOperationTelemetry[];

            /**
             * Creates a new HistoricalMatchSummary instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HistoricalMatchSummary instance
             */
            public static create(properties?: elo.v3.IHistoricalMatchSummary): elo.v3.HistoricalMatchSummary;

            /**
             * Encodes the specified HistoricalMatchSummary message. Does not implicitly {@link elo.v3.HistoricalMatchSummary.verify|verify} messages.
             * @param message HistoricalMatchSummary message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.IHistoricalMatchSummary, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HistoricalMatchSummary message, length delimited. Does not implicitly {@link elo.v3.HistoricalMatchSummary.verify|verify} messages.
             * @param message HistoricalMatchSummary message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.IHistoricalMatchSummary, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HistoricalMatchSummary message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HistoricalMatchSummary
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.HistoricalMatchSummary;

            /**
             * Decodes a HistoricalMatchSummary message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HistoricalMatchSummary
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.HistoricalMatchSummary;

            /**
             * Verifies a HistoricalMatchSummary message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HistoricalMatchSummary message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HistoricalMatchSummary
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.HistoricalMatchSummary;

            /**
             * Creates a plain object from a HistoricalMatchSummary message. Also converts values to other types if specified.
             * @param message HistoricalMatchSummary
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.HistoricalMatchSummary, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HistoricalMatchSummary to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for HistoricalMatchSummary
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ClientAction. */
        interface IClientAction {

            /** ClientAction roomId */
            roomId?: (string|null);

            /** ClientAction playerId */
            playerId?: (string|null);

            /** ClientAction timestamp */
            timestamp?: (number|Long|null);

            /** ClientAction currentInput */
            currentInput?: (string|null);

            /** ClientAction submittedAnswer */
            submittedAnswer?: (string|null);

            /** ClientAction joinQueuePlayerId */
            joinQueuePlayerId?: (string|null);

            /** ClientAction createCustomRoom */
            createCustomRoom?: (elo.v3.ICreateCustomRoomRequest|null);

            /** ClientAction joinPrivateRoomCode */
            joinPrivateRoomCode?: (string|null);

            /** ClientAction securityLog */
            securityLog?: (elo.v3.IMatchSecurityLog|null);

            /** ClientAction joinTournamentPlayerId */
            joinTournamentPlayerId?: (string|null);

            /** ClientAction spectateRoomId */
            spectateRoomId?: (string|null);

            /** ClientAction emojiBurst */
            emojiBurst?: (elo.v3.ISpectatorEmojiBurst|null);

            /** ClientAction connectionHandshake */
            connectionHandshake?: (elo.v3.INetworkHandshake|null);
        }

        /** Represents a ClientAction. */
        class ClientAction implements IClientAction {

            /**
             * Constructs a new ClientAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.IClientAction);

            /** ClientAction roomId. */
            public roomId: string;

            /** ClientAction playerId. */
            public playerId: string;

            /** ClientAction timestamp. */
            public timestamp: (number|Long);

            /** ClientAction currentInput. */
            public currentInput?: (string|null);

            /** ClientAction submittedAnswer. */
            public submittedAnswer?: (string|null);

            /** ClientAction joinQueuePlayerId. */
            public joinQueuePlayerId?: (string|null);

            /** ClientAction createCustomRoom. */
            public createCustomRoom?: (elo.v3.ICreateCustomRoomRequest|null);

            /** ClientAction joinPrivateRoomCode. */
            public joinPrivateRoomCode?: (string|null);

            /** ClientAction securityLog. */
            public securityLog?: (elo.v3.IMatchSecurityLog|null);

            /** ClientAction joinTournamentPlayerId. */
            public joinTournamentPlayerId?: (string|null);

            /** ClientAction spectateRoomId. */
            public spectateRoomId?: (string|null);

            /** ClientAction emojiBurst. */
            public emojiBurst?: (elo.v3.ISpectatorEmojiBurst|null);

            /** ClientAction connectionHandshake. */
            public connectionHandshake?: (elo.v3.INetworkHandshake|null);

            /** ClientAction payload. */
            public payload?: ("currentInput"|"submittedAnswer"|"joinQueuePlayerId"|"createCustomRoom"|"joinPrivateRoomCode"|"securityLog"|"joinTournamentPlayerId"|"spectateRoomId"|"emojiBurst"|"connectionHandshake");

            /**
             * Creates a new ClientAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientAction instance
             */
            public static create(properties?: elo.v3.IClientAction): elo.v3.ClientAction;

            /**
             * Encodes the specified ClientAction message. Does not implicitly {@link elo.v3.ClientAction.verify|verify} messages.
             * @param message ClientAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.IClientAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientAction message, length delimited. Does not implicitly {@link elo.v3.ClientAction.verify|verify} messages.
             * @param message ClientAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.IClientAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.ClientAction;

            /**
             * Decodes a ClientAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.ClientAction;

            /**
             * Verifies a ClientAction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClientAction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClientAction
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.ClientAction;

            /**
             * Creates a plain object from a ClientAction message. Also converts values to other types if specified.
             * @param message ClientAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.ClientAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClientAction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ClientAction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ServerGameStateUpdate. */
        interface IServerGameStateUpdate {

            /** ServerGameStateUpdate roomId */
            roomId?: (string|null);

            /** ServerGameStateUpdate state */
            state?: (elo.v3.MatchState|null);

            /** ServerGameStateUpdate timeRemainingSeconds */
            timeRemainingSeconds?: (number|null);

            /** ServerGameStateUpdate roomType */
            roomType?: (elo.v3.RoomType|null);

            /** ServerGameStateUpdate privateRoomCode */
            privateRoomCode?: (string|null);

            /** ServerGameStateUpdate playerOne */
            playerOne?: (elo.v3.ServerGameStateUpdate.IPlayerProgress|null);

            /** ServerGameStateUpdate playerTwo */
            playerTwo?: (elo.v3.ServerGameStateUpdate.IPlayerProgress|null);

            /** ServerGameStateUpdate nextQuestionText */
            nextQuestionText?: (string|null);

            /** ServerGameStateUpdate winnerId */
            winnerId?: (string|null);

            /** ServerGameStateUpdate playerOneEloChange */
            playerOneEloChange?: (number|null);

            /** ServerGameStateUpdate playerTwoEloChange */
            playerTwoEloChange?: (number|null);

            /** ServerGameStateUpdate playerOneXpChange */
            playerOneXpChange?: (number|null);

            /** ServerGameStateUpdate playerTwoXpChange */
            playerTwoXpChange?: (number|null);

            /** ServerGameStateUpdate bracketUpdate */
            bracketUpdate?: (elo.v3.ITournamentBracketUpdate|null);

            /** ServerGameStateUpdate emojiBurst */
            emojiBurst?: (elo.v3.ISpectatorEmojiBurst|null);

            /** ServerGameStateUpdate activeReconnectionToken */
            activeReconnectionToken?: (string|null);
        }

        /** Represents a ServerGameStateUpdate. */
        class ServerGameStateUpdate implements IServerGameStateUpdate {

            /**
             * Constructs a new ServerGameStateUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v3.IServerGameStateUpdate);

            /** ServerGameStateUpdate roomId. */
            public roomId: string;

            /** ServerGameStateUpdate state. */
            public state: elo.v3.MatchState;

            /** ServerGameStateUpdate timeRemainingSeconds. */
            public timeRemainingSeconds: number;

            /** ServerGameStateUpdate roomType. */
            public roomType: elo.v3.RoomType;

            /** ServerGameStateUpdate privateRoomCode. */
            public privateRoomCode: string;

            /** ServerGameStateUpdate playerOne. */
            public playerOne?: (elo.v3.ServerGameStateUpdate.IPlayerProgress|null);

            /** ServerGameStateUpdate playerTwo. */
            public playerTwo?: (elo.v3.ServerGameStateUpdate.IPlayerProgress|null);

            /** ServerGameStateUpdate nextQuestionText. */
            public nextQuestionText: string;

            /** ServerGameStateUpdate winnerId. */
            public winnerId: string;

            /** ServerGameStateUpdate playerOneEloChange. */
            public playerOneEloChange: number;

            /** ServerGameStateUpdate playerTwoEloChange. */
            public playerTwoEloChange: number;

            /** ServerGameStateUpdate playerOneXpChange. */
            public playerOneXpChange: number;

            /** ServerGameStateUpdate playerTwoXpChange. */
            public playerTwoXpChange: number;

            /** ServerGameStateUpdate bracketUpdate. */
            public bracketUpdate?: (elo.v3.ITournamentBracketUpdate|null);

            /** ServerGameStateUpdate emojiBurst. */
            public emojiBurst?: (elo.v3.ISpectatorEmojiBurst|null);

            /** ServerGameStateUpdate activeReconnectionToken. */
            public activeReconnectionToken: string;

            /**
             * Creates a new ServerGameStateUpdate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerGameStateUpdate instance
             */
            public static create(properties?: elo.v3.IServerGameStateUpdate): elo.v3.ServerGameStateUpdate;

            /**
             * Encodes the specified ServerGameStateUpdate message. Does not implicitly {@link elo.v3.ServerGameStateUpdate.verify|verify} messages.
             * @param message ServerGameStateUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v3.IServerGameStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerGameStateUpdate message, length delimited. Does not implicitly {@link elo.v3.ServerGameStateUpdate.verify|verify} messages.
             * @param message ServerGameStateUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v3.IServerGameStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerGameStateUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerGameStateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.ServerGameStateUpdate;

            /**
             * Decodes a ServerGameStateUpdate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerGameStateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.ServerGameStateUpdate;

            /**
             * Verifies a ServerGameStateUpdate message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServerGameStateUpdate message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServerGameStateUpdate
             */
            public static fromObject(object: { [k: string]: any }): elo.v3.ServerGameStateUpdate;

            /**
             * Creates a plain object from a ServerGameStateUpdate message. Also converts values to other types if specified.
             * @param message ServerGameStateUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v3.ServerGameStateUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServerGameStateUpdate to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ServerGameStateUpdate
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace ServerGameStateUpdate {

            /** Properties of a PlayerProgress. */
            interface IPlayerProgress {

                /** PlayerProgress playerId */
                playerId?: (string|null);

                /** PlayerProgress username */
                username?: (string|null);

                /** PlayerProgress currentScore */
                currentScore?: (number|null);

                /** PlayerProgress currentStreak */
                currentStreak?: (number|null);

                /** PlayerProgress ghostInput */
                ghostInput?: (string|null);

                /** PlayerProgress elo */
                elo?: (number|null);

                /** PlayerProgress activeTitle */
                activeTitle?: (string|null);

                /** PlayerProgress level */
                level?: (number|null);
            }

            /** Represents a PlayerProgress. */
            class PlayerProgress implements IPlayerProgress {

                /**
                 * Constructs a new PlayerProgress.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: elo.v3.ServerGameStateUpdate.IPlayerProgress);

                /** PlayerProgress playerId. */
                public playerId: string;

                /** PlayerProgress username. */
                public username: string;

                /** PlayerProgress currentScore. */
                public currentScore: number;

                /** PlayerProgress currentStreak. */
                public currentStreak: number;

                /** PlayerProgress ghostInput. */
                public ghostInput: string;

                /** PlayerProgress elo. */
                public elo: number;

                /** PlayerProgress activeTitle. */
                public activeTitle: string;

                /** PlayerProgress level. */
                public level: number;

                /**
                 * Creates a new PlayerProgress instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PlayerProgress instance
                 */
                public static create(properties?: elo.v3.ServerGameStateUpdate.IPlayerProgress): elo.v3.ServerGameStateUpdate.PlayerProgress;

                /**
                 * Encodes the specified PlayerProgress message. Does not implicitly {@link elo.v3.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @param message PlayerProgress message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: elo.v3.ServerGameStateUpdate.IPlayerProgress, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PlayerProgress message, length delimited. Does not implicitly {@link elo.v3.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @param message PlayerProgress message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: elo.v3.ServerGameStateUpdate.IPlayerProgress, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PlayerProgress message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PlayerProgress
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v3.ServerGameStateUpdate.PlayerProgress;

                /**
                 * Decodes a PlayerProgress message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PlayerProgress
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v3.ServerGameStateUpdate.PlayerProgress;

                /**
                 * Verifies a PlayerProgress message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PlayerProgress message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PlayerProgress
                 */
                public static fromObject(object: { [k: string]: any }): elo.v3.ServerGameStateUpdate.PlayerProgress;

                /**
                 * Creates a plain object from a PlayerProgress message. Also converts values to other types if specified.
                 * @param message PlayerProgress
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: elo.v3.ServerGameStateUpdate.PlayerProgress, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PlayerProgress to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PlayerProgress
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }
}
