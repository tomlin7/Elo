import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace elo. */
export namespace elo {

    /** Namespace v2. */
    namespace v2 {

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
            ROOM_TYPE_PRIVATE = 1
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
            constructor(properties?: elo.v2.IPlayerIdentity);

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
            public static create(properties?: elo.v2.IPlayerIdentity): elo.v2.PlayerIdentity;

            /**
             * Encodes the specified PlayerIdentity message. Does not implicitly {@link elo.v2.PlayerIdentity.verify|verify} messages.
             * @param message PlayerIdentity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v2.IPlayerIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlayerIdentity message, length delimited. Does not implicitly {@link elo.v2.PlayerIdentity.verify|verify} messages.
             * @param message PlayerIdentity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v2.IPlayerIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlayerIdentity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PlayerIdentity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v2.PlayerIdentity;

            /**
             * Decodes a PlayerIdentity message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PlayerIdentity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v2.PlayerIdentity;

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
            public static fromObject(object: { [k: string]: any }): elo.v2.PlayerIdentity;

            /**
             * Creates a plain object from a PlayerIdentity message. Also converts values to other types if specified.
             * @param message PlayerIdentity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v2.PlayerIdentity, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            constructor(properties?: elo.v2.ICreateCustomRoomRequest);

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
            public static create(properties?: elo.v2.ICreateCustomRoomRequest): elo.v2.CreateCustomRoomRequest;

            /**
             * Encodes the specified CreateCustomRoomRequest message. Does not implicitly {@link elo.v2.CreateCustomRoomRequest.verify|verify} messages.
             * @param message CreateCustomRoomRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v2.ICreateCustomRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CreateCustomRoomRequest message, length delimited. Does not implicitly {@link elo.v2.CreateCustomRoomRequest.verify|verify} messages.
             * @param message CreateCustomRoomRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v2.ICreateCustomRoomRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateCustomRoomRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateCustomRoomRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v2.CreateCustomRoomRequest;

            /**
             * Decodes a CreateCustomRoomRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CreateCustomRoomRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v2.CreateCustomRoomRequest;

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
            public static fromObject(object: { [k: string]: any }): elo.v2.CreateCustomRoomRequest;

            /**
             * Creates a plain object from a CreateCustomRoomRequest message. Also converts values to other types if specified.
             * @param message CreateCustomRoomRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v2.CreateCustomRoomRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            constructor(properties?: elo.v2.IMatchSecurityLog);

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
            public static create(properties?: elo.v2.IMatchSecurityLog): elo.v2.MatchSecurityLog;

            /**
             * Encodes the specified MatchSecurityLog message. Does not implicitly {@link elo.v2.MatchSecurityLog.verify|verify} messages.
             * @param message MatchSecurityLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v2.IMatchSecurityLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MatchSecurityLog message, length delimited. Does not implicitly {@link elo.v2.MatchSecurityLog.verify|verify} messages.
             * @param message MatchSecurityLog message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v2.IMatchSecurityLog, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MatchSecurityLog message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MatchSecurityLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v2.MatchSecurityLog;

            /**
             * Decodes a MatchSecurityLog message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MatchSecurityLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v2.MatchSecurityLog;

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
            public static fromObject(object: { [k: string]: any }): elo.v2.MatchSecurityLog;

            /**
             * Creates a plain object from a MatchSecurityLog message. Also converts values to other types if specified.
             * @param message MatchSecurityLog
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v2.MatchSecurityLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            createCustomRoom?: (elo.v2.ICreateCustomRoomRequest|null);

            /** ClientAction joinPrivateRoomCode */
            joinPrivateRoomCode?: (string|null);

            /** ClientAction securityLog */
            securityLog?: (elo.v2.IMatchSecurityLog|null);
        }

        /** Represents a ClientAction. */
        class ClientAction implements IClientAction {

            /**
             * Constructs a new ClientAction.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v2.IClientAction);

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
            public createCustomRoom?: (elo.v2.ICreateCustomRoomRequest|null);

            /** ClientAction joinPrivateRoomCode. */
            public joinPrivateRoomCode?: (string|null);

            /** ClientAction securityLog. */
            public securityLog?: (elo.v2.IMatchSecurityLog|null);

            /** ClientAction payload. */
            public payload?: ("currentInput"|"submittedAnswer"|"joinQueuePlayerId"|"createCustomRoom"|"joinPrivateRoomCode"|"securityLog");

            /**
             * Creates a new ClientAction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClientAction instance
             */
            public static create(properties?: elo.v2.IClientAction): elo.v2.ClientAction;

            /**
             * Encodes the specified ClientAction message. Does not implicitly {@link elo.v2.ClientAction.verify|verify} messages.
             * @param message ClientAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v2.IClientAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClientAction message, length delimited. Does not implicitly {@link elo.v2.ClientAction.verify|verify} messages.
             * @param message ClientAction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v2.IClientAction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClientAction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClientAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v2.ClientAction;

            /**
             * Decodes a ClientAction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClientAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v2.ClientAction;

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
            public static fromObject(object: { [k: string]: any }): elo.v2.ClientAction;

            /**
             * Creates a plain object from a ClientAction message. Also converts values to other types if specified.
             * @param message ClientAction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v2.ClientAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            state?: (elo.v2.MatchState|null);

            /** ServerGameStateUpdate timeRemainingSeconds */
            timeRemainingSeconds?: (number|null);

            /** ServerGameStateUpdate roomType */
            roomType?: (elo.v2.RoomType|null);

            /** ServerGameStateUpdate privateRoomCode */
            privateRoomCode?: (string|null);

            /** ServerGameStateUpdate playerOne */
            playerOne?: (elo.v2.ServerGameStateUpdate.IPlayerProgress|null);

            /** ServerGameStateUpdate playerTwo */
            playerTwo?: (elo.v2.ServerGameStateUpdate.IPlayerProgress|null);

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
        }

        /** Represents a ServerGameStateUpdate. */
        class ServerGameStateUpdate implements IServerGameStateUpdate {

            /**
             * Constructs a new ServerGameStateUpdate.
             * @param [properties] Properties to set
             */
            constructor(properties?: elo.v2.IServerGameStateUpdate);

            /** ServerGameStateUpdate roomId. */
            public roomId: string;

            /** ServerGameStateUpdate state. */
            public state: elo.v2.MatchState;

            /** ServerGameStateUpdate timeRemainingSeconds. */
            public timeRemainingSeconds: number;

            /** ServerGameStateUpdate roomType. */
            public roomType: elo.v2.RoomType;

            /** ServerGameStateUpdate privateRoomCode. */
            public privateRoomCode: string;

            /** ServerGameStateUpdate playerOne. */
            public playerOne?: (elo.v2.ServerGameStateUpdate.IPlayerProgress|null);

            /** ServerGameStateUpdate playerTwo. */
            public playerTwo?: (elo.v2.ServerGameStateUpdate.IPlayerProgress|null);

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

            /**
             * Creates a new ServerGameStateUpdate instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServerGameStateUpdate instance
             */
            public static create(properties?: elo.v2.IServerGameStateUpdate): elo.v2.ServerGameStateUpdate;

            /**
             * Encodes the specified ServerGameStateUpdate message. Does not implicitly {@link elo.v2.ServerGameStateUpdate.verify|verify} messages.
             * @param message ServerGameStateUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: elo.v2.IServerGameStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServerGameStateUpdate message, length delimited. Does not implicitly {@link elo.v2.ServerGameStateUpdate.verify|verify} messages.
             * @param message ServerGameStateUpdate message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: elo.v2.IServerGameStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServerGameStateUpdate message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServerGameStateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v2.ServerGameStateUpdate;

            /**
             * Decodes a ServerGameStateUpdate message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServerGameStateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v2.ServerGameStateUpdate;

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
            public static fromObject(object: { [k: string]: any }): elo.v2.ServerGameStateUpdate;

            /**
             * Creates a plain object from a ServerGameStateUpdate message. Also converts values to other types if specified.
             * @param message ServerGameStateUpdate
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: elo.v2.ServerGameStateUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
                constructor(properties?: elo.v2.ServerGameStateUpdate.IPlayerProgress);

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
                public static create(properties?: elo.v2.ServerGameStateUpdate.IPlayerProgress): elo.v2.ServerGameStateUpdate.PlayerProgress;

                /**
                 * Encodes the specified PlayerProgress message. Does not implicitly {@link elo.v2.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @param message PlayerProgress message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: elo.v2.ServerGameStateUpdate.IPlayerProgress, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PlayerProgress message, length delimited. Does not implicitly {@link elo.v2.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @param message PlayerProgress message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: elo.v2.ServerGameStateUpdate.IPlayerProgress, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PlayerProgress message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PlayerProgress
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): elo.v2.ServerGameStateUpdate.PlayerProgress;

                /**
                 * Decodes a PlayerProgress message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PlayerProgress
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): elo.v2.ServerGameStateUpdate.PlayerProgress;

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
                public static fromObject(object: { [k: string]: any }): elo.v2.ServerGameStateUpdate.PlayerProgress;

                /**
                 * Creates a plain object from a PlayerProgress message. Also converts values to other types if specified.
                 * @param message PlayerProgress
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: elo.v2.ServerGameStateUpdate.PlayerProgress, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
