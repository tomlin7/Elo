/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const elo = $root.elo = (() => {

    /**
     * Namespace elo.
     * @exports elo
     * @namespace
     */
    const elo = {};

    elo.v3 = (function() {

        /**
         * Namespace v3.
         * @memberof elo
         * @namespace
         */
        const v3 = {};

        /**
         * MatchState enum.
         * @name elo.v3.MatchState
         * @enum {number}
         * @property {number} MATCH_STATE_UNSPECIFIED=0 MATCH_STATE_UNSPECIFIED value
         * @property {number} MATCH_STATE_COUNTDOWN=1 MATCH_STATE_COUNTDOWN value
         * @property {number} MATCH_STATE_ACTIVE=2 MATCH_STATE_ACTIVE value
         * @property {number} MATCH_STATE_PAUSED_DISCONNECT=3 MATCH_STATE_PAUSED_DISCONNECT value
         * @property {number} MATCH_STATE_FINISHED=4 MATCH_STATE_FINISHED value
         */
        v3.MatchState = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "MATCH_STATE_UNSPECIFIED"] = 0;
            values[valuesById[1] = "MATCH_STATE_COUNTDOWN"] = 1;
            values[valuesById[2] = "MATCH_STATE_ACTIVE"] = 2;
            values[valuesById[3] = "MATCH_STATE_PAUSED_DISCONNECT"] = 3;
            values[valuesById[4] = "MATCH_STATE_FINISHED"] = 4;
            return values;
        })();

        /**
         * RoomType enum.
         * @name elo.v3.RoomType
         * @enum {number}
         * @property {number} ROOM_TYPE_RANKED=0 ROOM_TYPE_RANKED value
         * @property {number} ROOM_TYPE_PRIVATE=1 ROOM_TYPE_PRIVATE value
         * @property {number} ROOM_TYPE_TOURNAMENT=2 ROOM_TYPE_TOURNAMENT value
         */
        v3.RoomType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ROOM_TYPE_RANKED"] = 0;
            values[valuesById[1] = "ROOM_TYPE_PRIVATE"] = 1;
            values[valuesById[2] = "ROOM_TYPE_TOURNAMENT"] = 2;
            return values;
        })();

        /**
         * TournamentRound enum.
         * @name elo.v3.TournamentRound
         * @enum {number}
         * @property {number} ROUND_UNSPECIFIED=0 ROUND_UNSPECIFIED value
         * @property {number} ROUND_QUARTERFINALS=1 ROUND_QUARTERFINALS value
         * @property {number} ROUND_SEMIFINALS=2 ROUND_SEMIFINALS value
         * @property {number} ROUND_FINALS=3 ROUND_FINALS value
         */
        v3.TournamentRound = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ROUND_UNSPECIFIED"] = 0;
            values[valuesById[1] = "ROUND_QUARTERFINALS"] = 1;
            values[valuesById[2] = "ROUND_SEMIFINALS"] = 2;
            values[valuesById[3] = "ROUND_FINALS"] = 3;
            return values;
        })();

        /**
         * MatchNodeStatus enum.
         * @name elo.v3.MatchNodeStatus
         * @enum {number}
         * @property {number} STATUS_PENDING=0 STATUS_PENDING value
         * @property {number} STATUS_IN_PROGRESS=1 STATUS_IN_PROGRESS value
         * @property {number} STATUS_COMPLETED=2 STATUS_COMPLETED value
         */
        v3.MatchNodeStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STATUS_PENDING"] = 0;
            values[valuesById[1] = "STATUS_IN_PROGRESS"] = 1;
            values[valuesById[2] = "STATUS_COMPLETED"] = 2;
            return values;
        })();

        /**
         * RegionZone enum.
         * @name elo.v3.RegionZone
         * @enum {number}
         * @property {number} REGION_ZONE_UNSPECIFIED=0 REGION_ZONE_UNSPECIFIED value
         * @property {number} REGION_ZONE_APAC_SOUTH=1 REGION_ZONE_APAC_SOUTH value
         * @property {number} REGION_ZONE_EU_CENTRAL=2 REGION_ZONE_EU_CENTRAL value
         * @property {number} REGION_ZONE_US_EAST=3 REGION_ZONE_US_EAST value
         * @property {number} REGION_ZONE_ME_CENTRAL=4 REGION_ZONE_ME_CENTRAL value
         */
        v3.RegionZone = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "REGION_ZONE_UNSPECIFIED"] = 0;
            values[valuesById[1] = "REGION_ZONE_APAC_SOUTH"] = 1;
            values[valuesById[2] = "REGION_ZONE_EU_CENTRAL"] = 2;
            values[valuesById[3] = "REGION_ZONE_US_EAST"] = 3;
            values[valuesById[4] = "REGION_ZONE_ME_CENTRAL"] = 4;
            return values;
        })();

        v3.PlayerIdentity = (function() {

            /**
             * Properties of a PlayerIdentity.
             * @memberof elo.v3
             * @interface IPlayerIdentity
             * @property {string|null} [playerId] PlayerIdentity playerId
             * @property {string|null} [username] PlayerIdentity username
             * @property {number|null} [eloRating] PlayerIdentity eloRating
             * @property {string|null} [selectedThemeId] PlayerIdentity selectedThemeId
             * @property {string|null} [activeTitle] PlayerIdentity activeTitle
             * @property {number|null} [level] PlayerIdentity level
             * @property {number|null} [xp] PlayerIdentity xp
             */

            /**
             * Constructs a new PlayerIdentity.
             * @memberof elo.v3
             * @classdesc Represents a PlayerIdentity.
             * @implements IPlayerIdentity
             * @constructor
             * @param {elo.v3.IPlayerIdentity=} [properties] Properties to set
             */
            function PlayerIdentity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PlayerIdentity playerId.
             * @member {string} playerId
             * @memberof elo.v3.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.playerId = "";

            /**
             * PlayerIdentity username.
             * @member {string} username
             * @memberof elo.v3.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.username = "";

            /**
             * PlayerIdentity eloRating.
             * @member {number} eloRating
             * @memberof elo.v3.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.eloRating = 0;

            /**
             * PlayerIdentity selectedThemeId.
             * @member {string} selectedThemeId
             * @memberof elo.v3.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.selectedThemeId = "";

            /**
             * PlayerIdentity activeTitle.
             * @member {string} activeTitle
             * @memberof elo.v3.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.activeTitle = "";

            /**
             * PlayerIdentity level.
             * @member {number} level
             * @memberof elo.v3.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.level = 0;

            /**
             * PlayerIdentity xp.
             * @member {number} xp
             * @memberof elo.v3.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.xp = 0;

            /**
             * Creates a new PlayerIdentity instance using the specified properties.
             * @function create
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {elo.v3.IPlayerIdentity=} [properties] Properties to set
             * @returns {elo.v3.PlayerIdentity} PlayerIdentity instance
             */
            PlayerIdentity.create = function create(properties) {
                return new PlayerIdentity(properties);
            };

            /**
             * Encodes the specified PlayerIdentity message. Does not implicitly {@link elo.v3.PlayerIdentity.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {elo.v3.IPlayerIdentity} message PlayerIdentity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerIdentity.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.eloRating != null && Object.hasOwnProperty.call(message, "eloRating"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.eloRating);
                if (message.selectedThemeId != null && Object.hasOwnProperty.call(message, "selectedThemeId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.selectedThemeId);
                if (message.activeTitle != null && Object.hasOwnProperty.call(message, "activeTitle"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.activeTitle);
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.level);
                if (message.xp != null && Object.hasOwnProperty.call(message, "xp"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int32(message.xp);
                return writer;
            };

            /**
             * Encodes the specified PlayerIdentity message, length delimited. Does not implicitly {@link elo.v3.PlayerIdentity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {elo.v3.IPlayerIdentity} message PlayerIdentity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerIdentity.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a PlayerIdentity message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.PlayerIdentity} PlayerIdentity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerIdentity.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.PlayerIdentity();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.playerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.username = reader.string();
                            break;
                        }
                    case 3: {
                            message.eloRating = reader.int32();
                            break;
                        }
                    case 4: {
                            message.selectedThemeId = reader.string();
                            break;
                        }
                    case 5: {
                            message.activeTitle = reader.string();
                            break;
                        }
                    case 6: {
                            message.level = reader.int32();
                            break;
                        }
                    case 7: {
                            message.xp = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PlayerIdentity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.PlayerIdentity} PlayerIdentity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerIdentity.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PlayerIdentity message.
             * @function verify
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PlayerIdentity.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    if (!$util.isString(message.playerId))
                        return "playerId: string expected";
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.eloRating != null && Object.hasOwnProperty.call(message, "eloRating"))
                    if (!$util.isInteger(message.eloRating))
                        return "eloRating: integer expected";
                if (message.selectedThemeId != null && Object.hasOwnProperty.call(message, "selectedThemeId"))
                    if (!$util.isString(message.selectedThemeId))
                        return "selectedThemeId: string expected";
                if (message.activeTitle != null && Object.hasOwnProperty.call(message, "activeTitle"))
                    if (!$util.isString(message.activeTitle))
                        return "activeTitle: string expected";
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    if (!$util.isInteger(message.level))
                        return "level: integer expected";
                if (message.xp != null && Object.hasOwnProperty.call(message, "xp"))
                    if (!$util.isInteger(message.xp))
                        return "xp: integer expected";
                return null;
            };

            /**
             * Creates a PlayerIdentity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.PlayerIdentity} PlayerIdentity
             */
            PlayerIdentity.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.PlayerIdentity)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.PlayerIdentity: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.PlayerIdentity();
                if (object.playerId != null)
                    message.playerId = String(object.playerId);
                if (object.username != null)
                    message.username = String(object.username);
                if (object.eloRating != null)
                    message.eloRating = object.eloRating | 0;
                if (object.selectedThemeId != null)
                    message.selectedThemeId = String(object.selectedThemeId);
                if (object.activeTitle != null)
                    message.activeTitle = String(object.activeTitle);
                if (object.level != null)
                    message.level = object.level | 0;
                if (object.xp != null)
                    message.xp = object.xp | 0;
                return message;
            };

            /**
             * Creates a plain object from a PlayerIdentity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {elo.v3.PlayerIdentity} message PlayerIdentity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PlayerIdentity.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.playerId = "";
                    object.username = "";
                    object.eloRating = 0;
                    object.selectedThemeId = "";
                    object.activeTitle = "";
                    object.level = 0;
                    object.xp = 0;
                }
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    object.playerId = message.playerId;
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    object.username = message.username;
                if (message.eloRating != null && Object.hasOwnProperty.call(message, "eloRating"))
                    object.eloRating = message.eloRating;
                if (message.selectedThemeId != null && Object.hasOwnProperty.call(message, "selectedThemeId"))
                    object.selectedThemeId = message.selectedThemeId;
                if (message.activeTitle != null && Object.hasOwnProperty.call(message, "activeTitle"))
                    object.activeTitle = message.activeTitle;
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    object.level = message.level;
                if (message.xp != null && Object.hasOwnProperty.call(message, "xp"))
                    object.xp = message.xp;
                return object;
            };

            /**
             * Converts this PlayerIdentity to JSON.
             * @function toJSON
             * @memberof elo.v3.PlayerIdentity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PlayerIdentity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PlayerIdentity
             * @function getTypeUrl
             * @memberof elo.v3.PlayerIdentity
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PlayerIdentity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.PlayerIdentity";
            };

            return PlayerIdentity;
        })();

        v3.CreateCustomRoomRequest = (function() {

            /**
             * Properties of a CreateCustomRoomRequest.
             * @memberof elo.v3
             * @interface ICreateCustomRoomRequest
             * @property {string|null} [hostPlayerId] CreateCustomRoomRequest hostPlayerId
             * @property {boolean|null} [allowDivision] CreateCustomRoomRequest allowDivision
             * @property {boolean|null} [allowMultiplication] CreateCustomRoomRequest allowMultiplication
             * @property {number|null} [customDurationSeconds] CreateCustomRoomRequest customDurationSeconds
             */

            /**
             * Constructs a new CreateCustomRoomRequest.
             * @memberof elo.v3
             * @classdesc Represents a CreateCustomRoomRequest.
             * @implements ICreateCustomRoomRequest
             * @constructor
             * @param {elo.v3.ICreateCustomRoomRequest=} [properties] Properties to set
             */
            function CreateCustomRoomRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateCustomRoomRequest hostPlayerId.
             * @member {string} hostPlayerId
             * @memberof elo.v3.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.hostPlayerId = "";

            /**
             * CreateCustomRoomRequest allowDivision.
             * @member {boolean} allowDivision
             * @memberof elo.v3.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.allowDivision = false;

            /**
             * CreateCustomRoomRequest allowMultiplication.
             * @member {boolean} allowMultiplication
             * @memberof elo.v3.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.allowMultiplication = false;

            /**
             * CreateCustomRoomRequest customDurationSeconds.
             * @member {number} customDurationSeconds
             * @memberof elo.v3.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.customDurationSeconds = 0;

            /**
             * Creates a new CreateCustomRoomRequest instance using the specified properties.
             * @function create
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {elo.v3.ICreateCustomRoomRequest=} [properties] Properties to set
             * @returns {elo.v3.CreateCustomRoomRequest} CreateCustomRoomRequest instance
             */
            CreateCustomRoomRequest.create = function create(properties) {
                return new CreateCustomRoomRequest(properties);
            };

            /**
             * Encodes the specified CreateCustomRoomRequest message. Does not implicitly {@link elo.v3.CreateCustomRoomRequest.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {elo.v3.ICreateCustomRoomRequest} message CreateCustomRoomRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateCustomRoomRequest.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.hostPlayerId != null && Object.hasOwnProperty.call(message, "hostPlayerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.hostPlayerId);
                if (message.allowDivision != null && Object.hasOwnProperty.call(message, "allowDivision"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.allowDivision);
                if (message.allowMultiplication != null && Object.hasOwnProperty.call(message, "allowMultiplication"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.allowMultiplication);
                if (message.customDurationSeconds != null && Object.hasOwnProperty.call(message, "customDurationSeconds"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.customDurationSeconds);
                return writer;
            };

            /**
             * Encodes the specified CreateCustomRoomRequest message, length delimited. Does not implicitly {@link elo.v3.CreateCustomRoomRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {elo.v3.ICreateCustomRoomRequest} message CreateCustomRoomRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateCustomRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a CreateCustomRoomRequest message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.CreateCustomRoomRequest} CreateCustomRoomRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateCustomRoomRequest.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.CreateCustomRoomRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.hostPlayerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.allowDivision = reader.bool();
                            break;
                        }
                    case 3: {
                            message.allowMultiplication = reader.bool();
                            break;
                        }
                    case 4: {
                            message.customDurationSeconds = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CreateCustomRoomRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.CreateCustomRoomRequest} CreateCustomRoomRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateCustomRoomRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CreateCustomRoomRequest message.
             * @function verify
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateCustomRoomRequest.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.hostPlayerId != null && Object.hasOwnProperty.call(message, "hostPlayerId"))
                    if (!$util.isString(message.hostPlayerId))
                        return "hostPlayerId: string expected";
                if (message.allowDivision != null && Object.hasOwnProperty.call(message, "allowDivision"))
                    if (typeof message.allowDivision !== "boolean")
                        return "allowDivision: boolean expected";
                if (message.allowMultiplication != null && Object.hasOwnProperty.call(message, "allowMultiplication"))
                    if (typeof message.allowMultiplication !== "boolean")
                        return "allowMultiplication: boolean expected";
                if (message.customDurationSeconds != null && Object.hasOwnProperty.call(message, "customDurationSeconds"))
                    if (!$util.isInteger(message.customDurationSeconds))
                        return "customDurationSeconds: integer expected";
                return null;
            };

            /**
             * Creates a CreateCustomRoomRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.CreateCustomRoomRequest} CreateCustomRoomRequest
             */
            CreateCustomRoomRequest.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.CreateCustomRoomRequest)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.CreateCustomRoomRequest: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.CreateCustomRoomRequest();
                if (object.hostPlayerId != null)
                    message.hostPlayerId = String(object.hostPlayerId);
                if (object.allowDivision != null)
                    message.allowDivision = Boolean(object.allowDivision);
                if (object.allowMultiplication != null)
                    message.allowMultiplication = Boolean(object.allowMultiplication);
                if (object.customDurationSeconds != null)
                    message.customDurationSeconds = object.customDurationSeconds | 0;
                return message;
            };

            /**
             * Creates a plain object from a CreateCustomRoomRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {elo.v3.CreateCustomRoomRequest} message CreateCustomRoomRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateCustomRoomRequest.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.hostPlayerId = "";
                    object.allowDivision = false;
                    object.allowMultiplication = false;
                    object.customDurationSeconds = 0;
                }
                if (message.hostPlayerId != null && Object.hasOwnProperty.call(message, "hostPlayerId"))
                    object.hostPlayerId = message.hostPlayerId;
                if (message.allowDivision != null && Object.hasOwnProperty.call(message, "allowDivision"))
                    object.allowDivision = message.allowDivision;
                if (message.allowMultiplication != null && Object.hasOwnProperty.call(message, "allowMultiplication"))
                    object.allowMultiplication = message.allowMultiplication;
                if (message.customDurationSeconds != null && Object.hasOwnProperty.call(message, "customDurationSeconds"))
                    object.customDurationSeconds = message.customDurationSeconds;
                return object;
            };

            /**
             * Converts this CreateCustomRoomRequest to JSON.
             * @function toJSON
             * @memberof elo.v3.CreateCustomRoomRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateCustomRoomRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CreateCustomRoomRequest
             * @function getTypeUrl
             * @memberof elo.v3.CreateCustomRoomRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CreateCustomRoomRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.CreateCustomRoomRequest";
            };

            return CreateCustomRoomRequest;
        })();

        v3.MatchSecurityLog = (function() {

            /**
             * Properties of a MatchSecurityLog.
             * @memberof elo.v3
             * @interface IMatchSecurityLog
             * @property {string|null} [actionSequenceId] MatchSecurityLog actionSequenceId
             * @property {number|Long|null} [keystrokeDeltaMs] MatchSecurityLog keystrokeDeltaMs
             * @property {string|null} [inputValue] MatchSecurityLog inputValue
             */

            /**
             * Constructs a new MatchSecurityLog.
             * @memberof elo.v3
             * @classdesc Represents a MatchSecurityLog.
             * @implements IMatchSecurityLog
             * @constructor
             * @param {elo.v3.IMatchSecurityLog=} [properties] Properties to set
             */
            function MatchSecurityLog(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MatchSecurityLog actionSequenceId.
             * @member {string} actionSequenceId
             * @memberof elo.v3.MatchSecurityLog
             * @instance
             */
            MatchSecurityLog.prototype.actionSequenceId = "";

            /**
             * MatchSecurityLog keystrokeDeltaMs.
             * @member {number|Long} keystrokeDeltaMs
             * @memberof elo.v3.MatchSecurityLog
             * @instance
             */
            MatchSecurityLog.prototype.keystrokeDeltaMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MatchSecurityLog inputValue.
             * @member {string} inputValue
             * @memberof elo.v3.MatchSecurityLog
             * @instance
             */
            MatchSecurityLog.prototype.inputValue = "";

            /**
             * Creates a new MatchSecurityLog instance using the specified properties.
             * @function create
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {elo.v3.IMatchSecurityLog=} [properties] Properties to set
             * @returns {elo.v3.MatchSecurityLog} MatchSecurityLog instance
             */
            MatchSecurityLog.create = function create(properties) {
                return new MatchSecurityLog(properties);
            };

            /**
             * Encodes the specified MatchSecurityLog message. Does not implicitly {@link elo.v3.MatchSecurityLog.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {elo.v3.IMatchSecurityLog} message MatchSecurityLog message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchSecurityLog.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.actionSequenceId != null && Object.hasOwnProperty.call(message, "actionSequenceId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.actionSequenceId);
                if (message.keystrokeDeltaMs != null && Object.hasOwnProperty.call(message, "keystrokeDeltaMs"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.keystrokeDeltaMs);
                if (message.inputValue != null && Object.hasOwnProperty.call(message, "inputValue"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.inputValue);
                return writer;
            };

            /**
             * Encodes the specified MatchSecurityLog message, length delimited. Does not implicitly {@link elo.v3.MatchSecurityLog.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {elo.v3.IMatchSecurityLog} message MatchSecurityLog message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchSecurityLog.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a MatchSecurityLog message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.MatchSecurityLog} MatchSecurityLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchSecurityLog.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.MatchSecurityLog();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.actionSequenceId = reader.string();
                            break;
                        }
                    case 2: {
                            message.keystrokeDeltaMs = reader.int64();
                            break;
                        }
                    case 3: {
                            message.inputValue = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MatchSecurityLog message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.MatchSecurityLog} MatchSecurityLog
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchSecurityLog.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MatchSecurityLog message.
             * @function verify
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MatchSecurityLog.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.actionSequenceId != null && Object.hasOwnProperty.call(message, "actionSequenceId"))
                    if (!$util.isString(message.actionSequenceId))
                        return "actionSequenceId: string expected";
                if (message.keystrokeDeltaMs != null && Object.hasOwnProperty.call(message, "keystrokeDeltaMs"))
                    if (!$util.isInteger(message.keystrokeDeltaMs) && !(message.keystrokeDeltaMs && $util.isInteger(message.keystrokeDeltaMs.low) && $util.isInteger(message.keystrokeDeltaMs.high)))
                        return "keystrokeDeltaMs: integer|Long expected";
                if (message.inputValue != null && Object.hasOwnProperty.call(message, "inputValue"))
                    if (!$util.isString(message.inputValue))
                        return "inputValue: string expected";
                return null;
            };

            /**
             * Creates a MatchSecurityLog message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.MatchSecurityLog} MatchSecurityLog
             */
            MatchSecurityLog.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.MatchSecurityLog)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.MatchSecurityLog: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.MatchSecurityLog();
                if (object.actionSequenceId != null)
                    message.actionSequenceId = String(object.actionSequenceId);
                if (object.keystrokeDeltaMs != null)
                    if ($util.Long)
                        message.keystrokeDeltaMs = $util.Long.fromValue(object.keystrokeDeltaMs, false);
                    else if (typeof object.keystrokeDeltaMs === "string")
                        message.keystrokeDeltaMs = parseInt(object.keystrokeDeltaMs, 10);
                    else if (typeof object.keystrokeDeltaMs === "number")
                        message.keystrokeDeltaMs = object.keystrokeDeltaMs;
                    else if (typeof object.keystrokeDeltaMs === "object")
                        message.keystrokeDeltaMs = new $util.LongBits(object.keystrokeDeltaMs.low >>> 0, object.keystrokeDeltaMs.high >>> 0).toNumber();
                if (object.inputValue != null)
                    message.inputValue = String(object.inputValue);
                return message;
            };

            /**
             * Creates a plain object from a MatchSecurityLog message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {elo.v3.MatchSecurityLog} message MatchSecurityLog
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MatchSecurityLog.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.actionSequenceId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.keystrokeDeltaMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.keystrokeDeltaMs = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    object.inputValue = "";
                }
                if (message.actionSequenceId != null && Object.hasOwnProperty.call(message, "actionSequenceId"))
                    object.actionSequenceId = message.actionSequenceId;
                if (message.keystrokeDeltaMs != null && Object.hasOwnProperty.call(message, "keystrokeDeltaMs"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.keystrokeDeltaMs = typeof message.keystrokeDeltaMs === "number" ? BigInt(message.keystrokeDeltaMs) : $util.Long.fromBits(message.keystrokeDeltaMs.low >>> 0, message.keystrokeDeltaMs.high >>> 0, false).toBigInt();
                    else if (typeof message.keystrokeDeltaMs === "number")
                        object.keystrokeDeltaMs = options.longs === String ? String(message.keystrokeDeltaMs) : message.keystrokeDeltaMs;
                    else
                        object.keystrokeDeltaMs = options.longs === String ? $util.Long.prototype.toString.call(message.keystrokeDeltaMs) : options.longs === Number ? new $util.LongBits(message.keystrokeDeltaMs.low >>> 0, message.keystrokeDeltaMs.high >>> 0).toNumber() : message.keystrokeDeltaMs;
                if (message.inputValue != null && Object.hasOwnProperty.call(message, "inputValue"))
                    object.inputValue = message.inputValue;
                return object;
            };

            /**
             * Converts this MatchSecurityLog to JSON.
             * @function toJSON
             * @memberof elo.v3.MatchSecurityLog
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MatchSecurityLog.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MatchSecurityLog
             * @function getTypeUrl
             * @memberof elo.v3.MatchSecurityLog
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MatchSecurityLog.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.MatchSecurityLog";
            };

            return MatchSecurityLog;
        })();

        v3.TournamentNode = (function() {

            /**
             * Properties of a TournamentNode.
             * @memberof elo.v3
             * @interface ITournamentNode
             * @property {string|null} [nodeId] TournamentNode nodeId
             * @property {elo.v3.TournamentRound|null} [roundTier] TournamentNode roundTier
             * @property {elo.v3.MatchNodeStatus|null} [status] TournamentNode status
             * @property {string|null} [playerOneId] TournamentNode playerOneId
             * @property {string|null} [playerTwoId] TournamentNode playerTwoId
             * @property {string|null} [winnerId] TournamentNode winnerId
             * @property {string|null} [activeRoomId] TournamentNode activeRoomId
             * @property {string|null} [playerOneUsername] TournamentNode playerOneUsername
             * @property {string|null} [playerTwoUsername] TournamentNode playerTwoUsername
             */

            /**
             * Constructs a new TournamentNode.
             * @memberof elo.v3
             * @classdesc Represents a TournamentNode.
             * @implements ITournamentNode
             * @constructor
             * @param {elo.v3.ITournamentNode=} [properties] Properties to set
             */
            function TournamentNode(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TournamentNode nodeId.
             * @member {string} nodeId
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.nodeId = "";

            /**
             * TournamentNode roundTier.
             * @member {elo.v3.TournamentRound} roundTier
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.roundTier = 0;

            /**
             * TournamentNode status.
             * @member {elo.v3.MatchNodeStatus} status
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.status = 0;

            /**
             * TournamentNode playerOneId.
             * @member {string} playerOneId
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.playerOneId = "";

            /**
             * TournamentNode playerTwoId.
             * @member {string} playerTwoId
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.playerTwoId = "";

            /**
             * TournamentNode winnerId.
             * @member {string} winnerId
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.winnerId = "";

            /**
             * TournamentNode activeRoomId.
             * @member {string} activeRoomId
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.activeRoomId = "";

            /**
             * TournamentNode playerOneUsername.
             * @member {string} playerOneUsername
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.playerOneUsername = "";

            /**
             * TournamentNode playerTwoUsername.
             * @member {string} playerTwoUsername
             * @memberof elo.v3.TournamentNode
             * @instance
             */
            TournamentNode.prototype.playerTwoUsername = "";

            /**
             * Creates a new TournamentNode instance using the specified properties.
             * @function create
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {elo.v3.ITournamentNode=} [properties] Properties to set
             * @returns {elo.v3.TournamentNode} TournamentNode instance
             */
            TournamentNode.create = function create(properties) {
                return new TournamentNode(properties);
            };

            /**
             * Encodes the specified TournamentNode message. Does not implicitly {@link elo.v3.TournamentNode.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {elo.v3.ITournamentNode} message TournamentNode message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TournamentNode.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.nodeId);
                if (message.roundTier != null && Object.hasOwnProperty.call(message, "roundTier"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roundTier);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
                if (message.playerOneId != null && Object.hasOwnProperty.call(message, "playerOneId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.playerOneId);
                if (message.playerTwoId != null && Object.hasOwnProperty.call(message, "playerTwoId"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.playerTwoId);
                if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.winnerId);
                if (message.activeRoomId != null && Object.hasOwnProperty.call(message, "activeRoomId"))
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.activeRoomId);
                if (message.playerOneUsername != null && Object.hasOwnProperty.call(message, "playerOneUsername"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.playerOneUsername);
                if (message.playerTwoUsername != null && Object.hasOwnProperty.call(message, "playerTwoUsername"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.playerTwoUsername);
                return writer;
            };

            /**
             * Encodes the specified TournamentNode message, length delimited. Does not implicitly {@link elo.v3.TournamentNode.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {elo.v3.ITournamentNode} message TournamentNode message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TournamentNode.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a TournamentNode message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.TournamentNode} TournamentNode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TournamentNode.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.TournamentNode();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.nodeId = reader.string();
                            break;
                        }
                    case 2: {
                            message.roundTier = reader.int32();
                            break;
                        }
                    case 3: {
                            message.status = reader.int32();
                            break;
                        }
                    case 4: {
                            message.playerOneId = reader.string();
                            break;
                        }
                    case 5: {
                            message.playerTwoId = reader.string();
                            break;
                        }
                    case 6: {
                            message.winnerId = reader.string();
                            break;
                        }
                    case 7: {
                            message.activeRoomId = reader.string();
                            break;
                        }
                    case 8: {
                            message.playerOneUsername = reader.string();
                            break;
                        }
                    case 9: {
                            message.playerTwoUsername = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TournamentNode message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.TournamentNode} TournamentNode
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TournamentNode.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TournamentNode message.
             * @function verify
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TournamentNode.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                    if (!$util.isString(message.nodeId))
                        return "nodeId: string expected";
                if (message.roundTier != null && Object.hasOwnProperty.call(message, "roundTier"))
                    switch (message.roundTier) {
                    default:
                        return "roundTier: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    switch (message.status) {
                    default:
                        return "status: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.playerOneId != null && Object.hasOwnProperty.call(message, "playerOneId"))
                    if (!$util.isString(message.playerOneId))
                        return "playerOneId: string expected";
                if (message.playerTwoId != null && Object.hasOwnProperty.call(message, "playerTwoId"))
                    if (!$util.isString(message.playerTwoId))
                        return "playerTwoId: string expected";
                if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                    if (!$util.isString(message.winnerId))
                        return "winnerId: string expected";
                if (message.activeRoomId != null && Object.hasOwnProperty.call(message, "activeRoomId"))
                    if (!$util.isString(message.activeRoomId))
                        return "activeRoomId: string expected";
                if (message.playerOneUsername != null && Object.hasOwnProperty.call(message, "playerOneUsername"))
                    if (!$util.isString(message.playerOneUsername))
                        return "playerOneUsername: string expected";
                if (message.playerTwoUsername != null && Object.hasOwnProperty.call(message, "playerTwoUsername"))
                    if (!$util.isString(message.playerTwoUsername))
                        return "playerTwoUsername: string expected";
                return null;
            };

            /**
             * Creates a TournamentNode message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.TournamentNode} TournamentNode
             */
            TournamentNode.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.TournamentNode)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.TournamentNode: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.TournamentNode();
                if (object.nodeId != null)
                    message.nodeId = String(object.nodeId);
                switch (object.roundTier) {
                default:
                    if (typeof object.roundTier === "number") {
                        message.roundTier = object.roundTier;
                        break;
                    }
                    break;
                case "ROUND_UNSPECIFIED":
                case 0:
                    message.roundTier = 0;
                    break;
                case "ROUND_QUARTERFINALS":
                case 1:
                    message.roundTier = 1;
                    break;
                case "ROUND_SEMIFINALS":
                case 2:
                    message.roundTier = 2;
                    break;
                case "ROUND_FINALS":
                case 3:
                    message.roundTier = 3;
                    break;
                }
                switch (object.status) {
                default:
                    if (typeof object.status === "number") {
                        message.status = object.status;
                        break;
                    }
                    break;
                case "STATUS_PENDING":
                case 0:
                    message.status = 0;
                    break;
                case "STATUS_IN_PROGRESS":
                case 1:
                    message.status = 1;
                    break;
                case "STATUS_COMPLETED":
                case 2:
                    message.status = 2;
                    break;
                }
                if (object.playerOneId != null)
                    message.playerOneId = String(object.playerOneId);
                if (object.playerTwoId != null)
                    message.playerTwoId = String(object.playerTwoId);
                if (object.winnerId != null)
                    message.winnerId = String(object.winnerId);
                if (object.activeRoomId != null)
                    message.activeRoomId = String(object.activeRoomId);
                if (object.playerOneUsername != null)
                    message.playerOneUsername = String(object.playerOneUsername);
                if (object.playerTwoUsername != null)
                    message.playerTwoUsername = String(object.playerTwoUsername);
                return message;
            };

            /**
             * Creates a plain object from a TournamentNode message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {elo.v3.TournamentNode} message TournamentNode
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TournamentNode.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.nodeId = "";
                    object.roundTier = options.enums === String ? "ROUND_UNSPECIFIED" : 0;
                    object.status = options.enums === String ? "STATUS_PENDING" : 0;
                    object.playerOneId = "";
                    object.playerTwoId = "";
                    object.winnerId = "";
                    object.activeRoomId = "";
                    object.playerOneUsername = "";
                    object.playerTwoUsername = "";
                }
                if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                    object.nodeId = message.nodeId;
                if (message.roundTier != null && Object.hasOwnProperty.call(message, "roundTier"))
                    object.roundTier = options.enums === String ? $root.elo.v3.TournamentRound[message.roundTier] === undefined ? message.roundTier : $root.elo.v3.TournamentRound[message.roundTier] : message.roundTier;
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    object.status = options.enums === String ? $root.elo.v3.MatchNodeStatus[message.status] === undefined ? message.status : $root.elo.v3.MatchNodeStatus[message.status] : message.status;
                if (message.playerOneId != null && Object.hasOwnProperty.call(message, "playerOneId"))
                    object.playerOneId = message.playerOneId;
                if (message.playerTwoId != null && Object.hasOwnProperty.call(message, "playerTwoId"))
                    object.playerTwoId = message.playerTwoId;
                if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                    object.winnerId = message.winnerId;
                if (message.activeRoomId != null && Object.hasOwnProperty.call(message, "activeRoomId"))
                    object.activeRoomId = message.activeRoomId;
                if (message.playerOneUsername != null && Object.hasOwnProperty.call(message, "playerOneUsername"))
                    object.playerOneUsername = message.playerOneUsername;
                if (message.playerTwoUsername != null && Object.hasOwnProperty.call(message, "playerTwoUsername"))
                    object.playerTwoUsername = message.playerTwoUsername;
                return object;
            };

            /**
             * Converts this TournamentNode to JSON.
             * @function toJSON
             * @memberof elo.v3.TournamentNode
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TournamentNode.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TournamentNode
             * @function getTypeUrl
             * @memberof elo.v3.TournamentNode
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TournamentNode.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.TournamentNode";
            };

            return TournamentNode;
        })();

        v3.TournamentBracketUpdate = (function() {

            /**
             * Properties of a TournamentBracketUpdate.
             * @memberof elo.v3
             * @interface ITournamentBracketUpdate
             * @property {string|null} [tournamentId] TournamentBracketUpdate tournamentId
             * @property {Array.<elo.v3.ITournamentNode>|null} [bracketNodes] TournamentBracketUpdate bracketNodes
             * @property {number|Long|null} [nextRoundGlobalStartTime] TournamentBracketUpdate nextRoundGlobalStartTime
             */

            /**
             * Constructs a new TournamentBracketUpdate.
             * @memberof elo.v3
             * @classdesc Represents a TournamentBracketUpdate.
             * @implements ITournamentBracketUpdate
             * @constructor
             * @param {elo.v3.ITournamentBracketUpdate=} [properties] Properties to set
             */
            function TournamentBracketUpdate(properties) {
                this.bracketNodes = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TournamentBracketUpdate tournamentId.
             * @member {string} tournamentId
             * @memberof elo.v3.TournamentBracketUpdate
             * @instance
             */
            TournamentBracketUpdate.prototype.tournamentId = "";

            /**
             * TournamentBracketUpdate bracketNodes.
             * @member {Array.<elo.v3.ITournamentNode>} bracketNodes
             * @memberof elo.v3.TournamentBracketUpdate
             * @instance
             */
            TournamentBracketUpdate.prototype.bracketNodes = $util.emptyArray;

            /**
             * TournamentBracketUpdate nextRoundGlobalStartTime.
             * @member {number|Long} nextRoundGlobalStartTime
             * @memberof elo.v3.TournamentBracketUpdate
             * @instance
             */
            TournamentBracketUpdate.prototype.nextRoundGlobalStartTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new TournamentBracketUpdate instance using the specified properties.
             * @function create
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {elo.v3.ITournamentBracketUpdate=} [properties] Properties to set
             * @returns {elo.v3.TournamentBracketUpdate} TournamentBracketUpdate instance
             */
            TournamentBracketUpdate.create = function create(properties) {
                return new TournamentBracketUpdate(properties);
            };

            /**
             * Encodes the specified TournamentBracketUpdate message. Does not implicitly {@link elo.v3.TournamentBracketUpdate.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {elo.v3.ITournamentBracketUpdate} message TournamentBracketUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TournamentBracketUpdate.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.tournamentId != null && Object.hasOwnProperty.call(message, "tournamentId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.tournamentId);
                if (message.bracketNodes != null && message.bracketNodes.length)
                    for (let i = 0; i < message.bracketNodes.length; ++i)
                        $root.elo.v3.TournamentNode.encode(message.bracketNodes[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                if (message.nextRoundGlobalStartTime != null && Object.hasOwnProperty.call(message, "nextRoundGlobalStartTime"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.nextRoundGlobalStartTime);
                return writer;
            };

            /**
             * Encodes the specified TournamentBracketUpdate message, length delimited. Does not implicitly {@link elo.v3.TournamentBracketUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {elo.v3.ITournamentBracketUpdate} message TournamentBracketUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TournamentBracketUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a TournamentBracketUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.TournamentBracketUpdate} TournamentBracketUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TournamentBracketUpdate.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.TournamentBracketUpdate();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.tournamentId = reader.string();
                            break;
                        }
                    case 2: {
                            if (!(message.bracketNodes && message.bracketNodes.length))
                                message.bracketNodes = [];
                            message.bracketNodes.push($root.elo.v3.TournamentNode.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 3: {
                            message.nextRoundGlobalStartTime = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TournamentBracketUpdate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.TournamentBracketUpdate} TournamentBracketUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TournamentBracketUpdate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TournamentBracketUpdate message.
             * @function verify
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TournamentBracketUpdate.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.tournamentId != null && Object.hasOwnProperty.call(message, "tournamentId"))
                    if (!$util.isString(message.tournamentId))
                        return "tournamentId: string expected";
                if (message.bracketNodes != null && Object.hasOwnProperty.call(message, "bracketNodes")) {
                    if (!Array.isArray(message.bracketNodes))
                        return "bracketNodes: array expected";
                    for (let i = 0; i < message.bracketNodes.length; ++i) {
                        let error = $root.elo.v3.TournamentNode.verify(message.bracketNodes[i], long + 1);
                        if (error)
                            return "bracketNodes." + error;
                    }
                }
                if (message.nextRoundGlobalStartTime != null && Object.hasOwnProperty.call(message, "nextRoundGlobalStartTime"))
                    if (!$util.isInteger(message.nextRoundGlobalStartTime) && !(message.nextRoundGlobalStartTime && $util.isInteger(message.nextRoundGlobalStartTime.low) && $util.isInteger(message.nextRoundGlobalStartTime.high)))
                        return "nextRoundGlobalStartTime: integer|Long expected";
                return null;
            };

            /**
             * Creates a TournamentBracketUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.TournamentBracketUpdate} TournamentBracketUpdate
             */
            TournamentBracketUpdate.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.TournamentBracketUpdate)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.TournamentBracketUpdate: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.TournamentBracketUpdate();
                if (object.tournamentId != null)
                    message.tournamentId = String(object.tournamentId);
                if (object.bracketNodes) {
                    if (!Array.isArray(object.bracketNodes))
                        throw TypeError(".elo.v3.TournamentBracketUpdate.bracketNodes: array expected");
                    message.bracketNodes = [];
                    for (let i = 0; i < object.bracketNodes.length; ++i) {
                        if (!$util.isObject(object.bracketNodes[i]))
                            throw TypeError(".elo.v3.TournamentBracketUpdate.bracketNodes: object expected");
                        message.bracketNodes[i] = $root.elo.v3.TournamentNode.fromObject(object.bracketNodes[i], long + 1);
                    }
                }
                if (object.nextRoundGlobalStartTime != null)
                    if ($util.Long)
                        message.nextRoundGlobalStartTime = $util.Long.fromValue(object.nextRoundGlobalStartTime, false);
                    else if (typeof object.nextRoundGlobalStartTime === "string")
                        message.nextRoundGlobalStartTime = parseInt(object.nextRoundGlobalStartTime, 10);
                    else if (typeof object.nextRoundGlobalStartTime === "number")
                        message.nextRoundGlobalStartTime = object.nextRoundGlobalStartTime;
                    else if (typeof object.nextRoundGlobalStartTime === "object")
                        message.nextRoundGlobalStartTime = new $util.LongBits(object.nextRoundGlobalStartTime.low >>> 0, object.nextRoundGlobalStartTime.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a TournamentBracketUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {elo.v3.TournamentBracketUpdate} message TournamentBracketUpdate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TournamentBracketUpdate.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.bracketNodes = [];
                if (options.defaults) {
                    object.tournamentId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.nextRoundGlobalStartTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.nextRoundGlobalStartTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.tournamentId != null && Object.hasOwnProperty.call(message, "tournamentId"))
                    object.tournamentId = message.tournamentId;
                if (message.bracketNodes && message.bracketNodes.length) {
                    object.bracketNodes = [];
                    for (let j = 0; j < message.bracketNodes.length; ++j)
                        object.bracketNodes[j] = $root.elo.v3.TournamentNode.toObject(message.bracketNodes[j], options, q + 1);
                }
                if (message.nextRoundGlobalStartTime != null && Object.hasOwnProperty.call(message, "nextRoundGlobalStartTime"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.nextRoundGlobalStartTime = typeof message.nextRoundGlobalStartTime === "number" ? BigInt(message.nextRoundGlobalStartTime) : $util.Long.fromBits(message.nextRoundGlobalStartTime.low >>> 0, message.nextRoundGlobalStartTime.high >>> 0, false).toBigInt();
                    else if (typeof message.nextRoundGlobalStartTime === "number")
                        object.nextRoundGlobalStartTime = options.longs === String ? String(message.nextRoundGlobalStartTime) : message.nextRoundGlobalStartTime;
                    else
                        object.nextRoundGlobalStartTime = options.longs === String ? $util.Long.prototype.toString.call(message.nextRoundGlobalStartTime) : options.longs === Number ? new $util.LongBits(message.nextRoundGlobalStartTime.low >>> 0, message.nextRoundGlobalStartTime.high >>> 0).toNumber() : message.nextRoundGlobalStartTime;
                return object;
            };

            /**
             * Converts this TournamentBracketUpdate to JSON.
             * @function toJSON
             * @memberof elo.v3.TournamentBracketUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TournamentBracketUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TournamentBracketUpdate
             * @function getTypeUrl
             * @memberof elo.v3.TournamentBracketUpdate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TournamentBracketUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.TournamentBracketUpdate";
            };

            return TournamentBracketUpdate;
        })();

        v3.SpectatorEmojiBurst = (function() {

            /**
             * Properties of a SpectatorEmojiBurst.
             * @memberof elo.v3
             * @interface ISpectatorEmojiBurst
             * @property {string|null} [roomId] SpectatorEmojiBurst roomId
             * @property {string|null} [emojiType] SpectatorEmojiBurst emojiType
             * @property {number|null} [executionCoordinateX] SpectatorEmojiBurst executionCoordinateX
             */

            /**
             * Constructs a new SpectatorEmojiBurst.
             * @memberof elo.v3
             * @classdesc Represents a SpectatorEmojiBurst.
             * @implements ISpectatorEmojiBurst
             * @constructor
             * @param {elo.v3.ISpectatorEmojiBurst=} [properties] Properties to set
             */
            function SpectatorEmojiBurst(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SpectatorEmojiBurst roomId.
             * @member {string} roomId
             * @memberof elo.v3.SpectatorEmojiBurst
             * @instance
             */
            SpectatorEmojiBurst.prototype.roomId = "";

            /**
             * SpectatorEmojiBurst emojiType.
             * @member {string} emojiType
             * @memberof elo.v3.SpectatorEmojiBurst
             * @instance
             */
            SpectatorEmojiBurst.prototype.emojiType = "";

            /**
             * SpectatorEmojiBurst executionCoordinateX.
             * @member {number} executionCoordinateX
             * @memberof elo.v3.SpectatorEmojiBurst
             * @instance
             */
            SpectatorEmojiBurst.prototype.executionCoordinateX = 0;

            /**
             * Creates a new SpectatorEmojiBurst instance using the specified properties.
             * @function create
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {elo.v3.ISpectatorEmojiBurst=} [properties] Properties to set
             * @returns {elo.v3.SpectatorEmojiBurst} SpectatorEmojiBurst instance
             */
            SpectatorEmojiBurst.create = function create(properties) {
                return new SpectatorEmojiBurst(properties);
            };

            /**
             * Encodes the specified SpectatorEmojiBurst message. Does not implicitly {@link elo.v3.SpectatorEmojiBurst.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {elo.v3.ISpectatorEmojiBurst} message SpectatorEmojiBurst message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SpectatorEmojiBurst.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
                if (message.emojiType != null && Object.hasOwnProperty.call(message, "emojiType"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.emojiType);
                if (message.executionCoordinateX != null && Object.hasOwnProperty.call(message, "executionCoordinateX"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.executionCoordinateX);
                return writer;
            };

            /**
             * Encodes the specified SpectatorEmojiBurst message, length delimited. Does not implicitly {@link elo.v3.SpectatorEmojiBurst.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {elo.v3.ISpectatorEmojiBurst} message SpectatorEmojiBurst message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SpectatorEmojiBurst.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SpectatorEmojiBurst message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.SpectatorEmojiBurst} SpectatorEmojiBurst
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SpectatorEmojiBurst.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.SpectatorEmojiBurst();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.roomId = reader.string();
                            break;
                        }
                    case 2: {
                            message.emojiType = reader.string();
                            break;
                        }
                    case 3: {
                            message.executionCoordinateX = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SpectatorEmojiBurst message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.SpectatorEmojiBurst} SpectatorEmojiBurst
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SpectatorEmojiBurst.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SpectatorEmojiBurst message.
             * @function verify
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SpectatorEmojiBurst.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    if (!$util.isString(message.roomId))
                        return "roomId: string expected";
                if (message.emojiType != null && Object.hasOwnProperty.call(message, "emojiType"))
                    if (!$util.isString(message.emojiType))
                        return "emojiType: string expected";
                if (message.executionCoordinateX != null && Object.hasOwnProperty.call(message, "executionCoordinateX"))
                    if (!$util.isInteger(message.executionCoordinateX))
                        return "executionCoordinateX: integer expected";
                return null;
            };

            /**
             * Creates a SpectatorEmojiBurst message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.SpectatorEmojiBurst} SpectatorEmojiBurst
             */
            SpectatorEmojiBurst.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.SpectatorEmojiBurst)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.SpectatorEmojiBurst: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.SpectatorEmojiBurst();
                if (object.roomId != null)
                    message.roomId = String(object.roomId);
                if (object.emojiType != null)
                    message.emojiType = String(object.emojiType);
                if (object.executionCoordinateX != null)
                    message.executionCoordinateX = object.executionCoordinateX | 0;
                return message;
            };

            /**
             * Creates a plain object from a SpectatorEmojiBurst message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {elo.v3.SpectatorEmojiBurst} message SpectatorEmojiBurst
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SpectatorEmojiBurst.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.roomId = "";
                    object.emojiType = "";
                    object.executionCoordinateX = 0;
                }
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    object.roomId = message.roomId;
                if (message.emojiType != null && Object.hasOwnProperty.call(message, "emojiType"))
                    object.emojiType = message.emojiType;
                if (message.executionCoordinateX != null && Object.hasOwnProperty.call(message, "executionCoordinateX"))
                    object.executionCoordinateX = message.executionCoordinateX;
                return object;
            };

            /**
             * Converts this SpectatorEmojiBurst to JSON.
             * @function toJSON
             * @memberof elo.v3.SpectatorEmojiBurst
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SpectatorEmojiBurst.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SpectatorEmojiBurst
             * @function getTypeUrl
             * @memberof elo.v3.SpectatorEmojiBurst
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SpectatorEmojiBurst.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.SpectatorEmojiBurst";
            };

            return SpectatorEmojiBurst;
        })();

        v3.NetworkHandshake = (function() {

            /**
             * Properties of a NetworkHandshake.
             * @memberof elo.v3
             * @interface INetworkHandshake
             * @property {string|null} [playerId] NetworkHandshake playerId
             * @property {string|null} [sessionToken] NetworkHandshake sessionToken
             * @property {string|null} [reconnectionToken] NetworkHandshake reconnectionToken
             * @property {number|Long|null} [lastReceivedServerTick] NetworkHandshake lastReceivedServerTick
             */

            /**
             * Constructs a new NetworkHandshake.
             * @memberof elo.v3
             * @classdesc Represents a NetworkHandshake.
             * @implements INetworkHandshake
             * @constructor
             * @param {elo.v3.INetworkHandshake=} [properties] Properties to set
             */
            function NetworkHandshake(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * NetworkHandshake playerId.
             * @member {string} playerId
             * @memberof elo.v3.NetworkHandshake
             * @instance
             */
            NetworkHandshake.prototype.playerId = "";

            /**
             * NetworkHandshake sessionToken.
             * @member {string} sessionToken
             * @memberof elo.v3.NetworkHandshake
             * @instance
             */
            NetworkHandshake.prototype.sessionToken = "";

            /**
             * NetworkHandshake reconnectionToken.
             * @member {string} reconnectionToken
             * @memberof elo.v3.NetworkHandshake
             * @instance
             */
            NetworkHandshake.prototype.reconnectionToken = "";

            /**
             * NetworkHandshake lastReceivedServerTick.
             * @member {number|Long} lastReceivedServerTick
             * @memberof elo.v3.NetworkHandshake
             * @instance
             */
            NetworkHandshake.prototype.lastReceivedServerTick = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new NetworkHandshake instance using the specified properties.
             * @function create
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {elo.v3.INetworkHandshake=} [properties] Properties to set
             * @returns {elo.v3.NetworkHandshake} NetworkHandshake instance
             */
            NetworkHandshake.create = function create(properties) {
                return new NetworkHandshake(properties);
            };

            /**
             * Encodes the specified NetworkHandshake message. Does not implicitly {@link elo.v3.NetworkHandshake.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {elo.v3.INetworkHandshake} message NetworkHandshake message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NetworkHandshake.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
                if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.sessionToken);
                if (message.reconnectionToken != null && Object.hasOwnProperty.call(message, "reconnectionToken"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.reconnectionToken);
                if (message.lastReceivedServerTick != null && Object.hasOwnProperty.call(message, "lastReceivedServerTick"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.lastReceivedServerTick);
                return writer;
            };

            /**
             * Encodes the specified NetworkHandshake message, length delimited. Does not implicitly {@link elo.v3.NetworkHandshake.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {elo.v3.INetworkHandshake} message NetworkHandshake message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NetworkHandshake.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a NetworkHandshake message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.NetworkHandshake} NetworkHandshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NetworkHandshake.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.NetworkHandshake();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.playerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.sessionToken = reader.string();
                            break;
                        }
                    case 3: {
                            message.reconnectionToken = reader.string();
                            break;
                        }
                    case 4: {
                            message.lastReceivedServerTick = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NetworkHandshake message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.NetworkHandshake} NetworkHandshake
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NetworkHandshake.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NetworkHandshake message.
             * @function verify
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NetworkHandshake.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    if (!$util.isString(message.playerId))
                        return "playerId: string expected";
                if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                    if (!$util.isString(message.sessionToken))
                        return "sessionToken: string expected";
                if (message.reconnectionToken != null && Object.hasOwnProperty.call(message, "reconnectionToken"))
                    if (!$util.isString(message.reconnectionToken))
                        return "reconnectionToken: string expected";
                if (message.lastReceivedServerTick != null && Object.hasOwnProperty.call(message, "lastReceivedServerTick"))
                    if (!$util.isInteger(message.lastReceivedServerTick) && !(message.lastReceivedServerTick && $util.isInteger(message.lastReceivedServerTick.low) && $util.isInteger(message.lastReceivedServerTick.high)))
                        return "lastReceivedServerTick: integer|Long expected";
                return null;
            };

            /**
             * Creates a NetworkHandshake message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.NetworkHandshake} NetworkHandshake
             */
            NetworkHandshake.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.NetworkHandshake)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.NetworkHandshake: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.NetworkHandshake();
                if (object.playerId != null)
                    message.playerId = String(object.playerId);
                if (object.sessionToken != null)
                    message.sessionToken = String(object.sessionToken);
                if (object.reconnectionToken != null)
                    message.reconnectionToken = String(object.reconnectionToken);
                if (object.lastReceivedServerTick != null)
                    if ($util.Long)
                        message.lastReceivedServerTick = $util.Long.fromValue(object.lastReceivedServerTick, false);
                    else if (typeof object.lastReceivedServerTick === "string")
                        message.lastReceivedServerTick = parseInt(object.lastReceivedServerTick, 10);
                    else if (typeof object.lastReceivedServerTick === "number")
                        message.lastReceivedServerTick = object.lastReceivedServerTick;
                    else if (typeof object.lastReceivedServerTick === "object")
                        message.lastReceivedServerTick = new $util.LongBits(object.lastReceivedServerTick.low >>> 0, object.lastReceivedServerTick.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a NetworkHandshake message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {elo.v3.NetworkHandshake} message NetworkHandshake
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NetworkHandshake.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.playerId = "";
                    object.sessionToken = "";
                    object.reconnectionToken = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.lastReceivedServerTick = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.lastReceivedServerTick = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    object.playerId = message.playerId;
                if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                    object.sessionToken = message.sessionToken;
                if (message.reconnectionToken != null && Object.hasOwnProperty.call(message, "reconnectionToken"))
                    object.reconnectionToken = message.reconnectionToken;
                if (message.lastReceivedServerTick != null && Object.hasOwnProperty.call(message, "lastReceivedServerTick"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.lastReceivedServerTick = typeof message.lastReceivedServerTick === "number" ? BigInt(message.lastReceivedServerTick) : $util.Long.fromBits(message.lastReceivedServerTick.low >>> 0, message.lastReceivedServerTick.high >>> 0, false).toBigInt();
                    else if (typeof message.lastReceivedServerTick === "number")
                        object.lastReceivedServerTick = options.longs === String ? String(message.lastReceivedServerTick) : message.lastReceivedServerTick;
                    else
                        object.lastReceivedServerTick = options.longs === String ? $util.Long.prototype.toString.call(message.lastReceivedServerTick) : options.longs === Number ? new $util.LongBits(message.lastReceivedServerTick.low >>> 0, message.lastReceivedServerTick.high >>> 0).toNumber() : message.lastReceivedServerTick;
                return object;
            };

            /**
             * Converts this NetworkHandshake to JSON.
             * @function toJSON
             * @memberof elo.v3.NetworkHandshake
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NetworkHandshake.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for NetworkHandshake
             * @function getTypeUrl
             * @memberof elo.v3.NetworkHandshake
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            NetworkHandshake.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.NetworkHandshake";
            };

            return NetworkHandshake;
        })();

        v3.OperationTelemetry = (function() {

            /**
             * Properties of an OperationTelemetry.
             * @memberof elo.v3
             * @interface IOperationTelemetry
             * @property {string|null} [operationType] OperationTelemetry operationType
             * @property {number|null} [totalPresented] OperationTelemetry totalPresented
             * @property {number|null} [totalCorrect] OperationTelemetry totalCorrect
             * @property {number|Long|null} [averageSolveTimeMs] OperationTelemetry averageSolveTimeMs
             */

            /**
             * Constructs a new OperationTelemetry.
             * @memberof elo.v3
             * @classdesc Represents an OperationTelemetry.
             * @implements IOperationTelemetry
             * @constructor
             * @param {elo.v3.IOperationTelemetry=} [properties] Properties to set
             */
            function OperationTelemetry(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OperationTelemetry operationType.
             * @member {string} operationType
             * @memberof elo.v3.OperationTelemetry
             * @instance
             */
            OperationTelemetry.prototype.operationType = "";

            /**
             * OperationTelemetry totalPresented.
             * @member {number} totalPresented
             * @memberof elo.v3.OperationTelemetry
             * @instance
             */
            OperationTelemetry.prototype.totalPresented = 0;

            /**
             * OperationTelemetry totalCorrect.
             * @member {number} totalCorrect
             * @memberof elo.v3.OperationTelemetry
             * @instance
             */
            OperationTelemetry.prototype.totalCorrect = 0;

            /**
             * OperationTelemetry averageSolveTimeMs.
             * @member {number|Long} averageSolveTimeMs
             * @memberof elo.v3.OperationTelemetry
             * @instance
             */
            OperationTelemetry.prototype.averageSolveTimeMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new OperationTelemetry instance using the specified properties.
             * @function create
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {elo.v3.IOperationTelemetry=} [properties] Properties to set
             * @returns {elo.v3.OperationTelemetry} OperationTelemetry instance
             */
            OperationTelemetry.create = function create(properties) {
                return new OperationTelemetry(properties);
            };

            /**
             * Encodes the specified OperationTelemetry message. Does not implicitly {@link elo.v3.OperationTelemetry.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {elo.v3.IOperationTelemetry} message OperationTelemetry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperationTelemetry.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.operationType);
                if (message.totalPresented != null && Object.hasOwnProperty.call(message, "totalPresented"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.totalPresented);
                if (message.totalCorrect != null && Object.hasOwnProperty.call(message, "totalCorrect"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.totalCorrect);
                if (message.averageSolveTimeMs != null && Object.hasOwnProperty.call(message, "averageSolveTimeMs"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.averageSolveTimeMs);
                return writer;
            };

            /**
             * Encodes the specified OperationTelemetry message, length delimited. Does not implicitly {@link elo.v3.OperationTelemetry.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {elo.v3.IOperationTelemetry} message OperationTelemetry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OperationTelemetry.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes an OperationTelemetry message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.OperationTelemetry} OperationTelemetry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperationTelemetry.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.OperationTelemetry();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.operationType = reader.string();
                            break;
                        }
                    case 2: {
                            message.totalPresented = reader.int32();
                            break;
                        }
                    case 3: {
                            message.totalCorrect = reader.int32();
                            break;
                        }
                    case 4: {
                            message.averageSolveTimeMs = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an OperationTelemetry message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.OperationTelemetry} OperationTelemetry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OperationTelemetry.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an OperationTelemetry message.
             * @function verify
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OperationTelemetry.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                    if (!$util.isString(message.operationType))
                        return "operationType: string expected";
                if (message.totalPresented != null && Object.hasOwnProperty.call(message, "totalPresented"))
                    if (!$util.isInteger(message.totalPresented))
                        return "totalPresented: integer expected";
                if (message.totalCorrect != null && Object.hasOwnProperty.call(message, "totalCorrect"))
                    if (!$util.isInteger(message.totalCorrect))
                        return "totalCorrect: integer expected";
                if (message.averageSolveTimeMs != null && Object.hasOwnProperty.call(message, "averageSolveTimeMs"))
                    if (!$util.isInteger(message.averageSolveTimeMs) && !(message.averageSolveTimeMs && $util.isInteger(message.averageSolveTimeMs.low) && $util.isInteger(message.averageSolveTimeMs.high)))
                        return "averageSolveTimeMs: integer|Long expected";
                return null;
            };

            /**
             * Creates an OperationTelemetry message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.OperationTelemetry} OperationTelemetry
             */
            OperationTelemetry.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.OperationTelemetry)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.OperationTelemetry: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.OperationTelemetry();
                if (object.operationType != null)
                    message.operationType = String(object.operationType);
                if (object.totalPresented != null)
                    message.totalPresented = object.totalPresented | 0;
                if (object.totalCorrect != null)
                    message.totalCorrect = object.totalCorrect | 0;
                if (object.averageSolveTimeMs != null)
                    if ($util.Long)
                        message.averageSolveTimeMs = $util.Long.fromValue(object.averageSolveTimeMs, false);
                    else if (typeof object.averageSolveTimeMs === "string")
                        message.averageSolveTimeMs = parseInt(object.averageSolveTimeMs, 10);
                    else if (typeof object.averageSolveTimeMs === "number")
                        message.averageSolveTimeMs = object.averageSolveTimeMs;
                    else if (typeof object.averageSolveTimeMs === "object")
                        message.averageSolveTimeMs = new $util.LongBits(object.averageSolveTimeMs.low >>> 0, object.averageSolveTimeMs.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an OperationTelemetry message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {elo.v3.OperationTelemetry} message OperationTelemetry
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OperationTelemetry.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.operationType = "";
                    object.totalPresented = 0;
                    object.totalCorrect = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.averageSolveTimeMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.averageSolveTimeMs = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                    object.operationType = message.operationType;
                if (message.totalPresented != null && Object.hasOwnProperty.call(message, "totalPresented"))
                    object.totalPresented = message.totalPresented;
                if (message.totalCorrect != null && Object.hasOwnProperty.call(message, "totalCorrect"))
                    object.totalCorrect = message.totalCorrect;
                if (message.averageSolveTimeMs != null && Object.hasOwnProperty.call(message, "averageSolveTimeMs"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.averageSolveTimeMs = typeof message.averageSolveTimeMs === "number" ? BigInt(message.averageSolveTimeMs) : $util.Long.fromBits(message.averageSolveTimeMs.low >>> 0, message.averageSolveTimeMs.high >>> 0, false).toBigInt();
                    else if (typeof message.averageSolveTimeMs === "number")
                        object.averageSolveTimeMs = options.longs === String ? String(message.averageSolveTimeMs) : message.averageSolveTimeMs;
                    else
                        object.averageSolveTimeMs = options.longs === String ? $util.Long.prototype.toString.call(message.averageSolveTimeMs) : options.longs === Number ? new $util.LongBits(message.averageSolveTimeMs.low >>> 0, message.averageSolveTimeMs.high >>> 0).toNumber() : message.averageSolveTimeMs;
                return object;
            };

            /**
             * Converts this OperationTelemetry to JSON.
             * @function toJSON
             * @memberof elo.v3.OperationTelemetry
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OperationTelemetry.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for OperationTelemetry
             * @function getTypeUrl
             * @memberof elo.v3.OperationTelemetry
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            OperationTelemetry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.OperationTelemetry";
            };

            return OperationTelemetry;
        })();

        v3.HistoricalMatchSummary = (function() {

            /**
             * Properties of a HistoricalMatchSummary.
             * @memberof elo.v3
             * @interface IHistoricalMatchSummary
             * @property {string|null} [matchId] HistoricalMatchSummary matchId
             * @property {string|null} [opponentUsername] HistoricalMatchSummary opponentUsername
             * @property {boolean|null} [isVictory] HistoricalMatchSummary isVictory
             * @property {number|null} [eloDelta] HistoricalMatchSummary eloDelta
             * @property {number|Long|null} [matchTimestamp] HistoricalMatchSummary matchTimestamp
             * @property {Array.<elo.v3.IOperationTelemetry>|null} [stats] HistoricalMatchSummary stats
             */

            /**
             * Constructs a new HistoricalMatchSummary.
             * @memberof elo.v3
             * @classdesc Represents a HistoricalMatchSummary.
             * @implements IHistoricalMatchSummary
             * @constructor
             * @param {elo.v3.IHistoricalMatchSummary=} [properties] Properties to set
             */
            function HistoricalMatchSummary(properties) {
                this.stats = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HistoricalMatchSummary matchId.
             * @member {string} matchId
             * @memberof elo.v3.HistoricalMatchSummary
             * @instance
             */
            HistoricalMatchSummary.prototype.matchId = "";

            /**
             * HistoricalMatchSummary opponentUsername.
             * @member {string} opponentUsername
             * @memberof elo.v3.HistoricalMatchSummary
             * @instance
             */
            HistoricalMatchSummary.prototype.opponentUsername = "";

            /**
             * HistoricalMatchSummary isVictory.
             * @member {boolean} isVictory
             * @memberof elo.v3.HistoricalMatchSummary
             * @instance
             */
            HistoricalMatchSummary.prototype.isVictory = false;

            /**
             * HistoricalMatchSummary eloDelta.
             * @member {number} eloDelta
             * @memberof elo.v3.HistoricalMatchSummary
             * @instance
             */
            HistoricalMatchSummary.prototype.eloDelta = 0;

            /**
             * HistoricalMatchSummary matchTimestamp.
             * @member {number|Long} matchTimestamp
             * @memberof elo.v3.HistoricalMatchSummary
             * @instance
             */
            HistoricalMatchSummary.prototype.matchTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * HistoricalMatchSummary stats.
             * @member {Array.<elo.v3.IOperationTelemetry>} stats
             * @memberof elo.v3.HistoricalMatchSummary
             * @instance
             */
            HistoricalMatchSummary.prototype.stats = $util.emptyArray;

            /**
             * Creates a new HistoricalMatchSummary instance using the specified properties.
             * @function create
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {elo.v3.IHistoricalMatchSummary=} [properties] Properties to set
             * @returns {elo.v3.HistoricalMatchSummary} HistoricalMatchSummary instance
             */
            HistoricalMatchSummary.create = function create(properties) {
                return new HistoricalMatchSummary(properties);
            };

            /**
             * Encodes the specified HistoricalMatchSummary message. Does not implicitly {@link elo.v3.HistoricalMatchSummary.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {elo.v3.IHistoricalMatchSummary} message HistoricalMatchSummary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HistoricalMatchSummary.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.matchId != null && Object.hasOwnProperty.call(message, "matchId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.matchId);
                if (message.opponentUsername != null && Object.hasOwnProperty.call(message, "opponentUsername"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.opponentUsername);
                if (message.isVictory != null && Object.hasOwnProperty.call(message, "isVictory"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isVictory);
                if (message.eloDelta != null && Object.hasOwnProperty.call(message, "eloDelta"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.eloDelta);
                if (message.matchTimestamp != null && Object.hasOwnProperty.call(message, "matchTimestamp"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.matchTimestamp);
                if (message.stats != null && message.stats.length)
                    for (let i = 0; i < message.stats.length; ++i)
                        $root.elo.v3.OperationTelemetry.encode(message.stats[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified HistoricalMatchSummary message, length delimited. Does not implicitly {@link elo.v3.HistoricalMatchSummary.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {elo.v3.IHistoricalMatchSummary} message HistoricalMatchSummary message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HistoricalMatchSummary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a HistoricalMatchSummary message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.HistoricalMatchSummary} HistoricalMatchSummary
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HistoricalMatchSummary.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.HistoricalMatchSummary();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.matchId = reader.string();
                            break;
                        }
                    case 2: {
                            message.opponentUsername = reader.string();
                            break;
                        }
                    case 3: {
                            message.isVictory = reader.bool();
                            break;
                        }
                    case 4: {
                            message.eloDelta = reader.int32();
                            break;
                        }
                    case 5: {
                            message.matchTimestamp = reader.int64();
                            break;
                        }
                    case 6: {
                            if (!(message.stats && message.stats.length))
                                message.stats = [];
                            message.stats.push($root.elo.v3.OperationTelemetry.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a HistoricalMatchSummary message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.HistoricalMatchSummary} HistoricalMatchSummary
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HistoricalMatchSummary.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a HistoricalMatchSummary message.
             * @function verify
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HistoricalMatchSummary.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.matchId != null && Object.hasOwnProperty.call(message, "matchId"))
                    if (!$util.isString(message.matchId))
                        return "matchId: string expected";
                if (message.opponentUsername != null && Object.hasOwnProperty.call(message, "opponentUsername"))
                    if (!$util.isString(message.opponentUsername))
                        return "opponentUsername: string expected";
                if (message.isVictory != null && Object.hasOwnProperty.call(message, "isVictory"))
                    if (typeof message.isVictory !== "boolean")
                        return "isVictory: boolean expected";
                if (message.eloDelta != null && Object.hasOwnProperty.call(message, "eloDelta"))
                    if (!$util.isInteger(message.eloDelta))
                        return "eloDelta: integer expected";
                if (message.matchTimestamp != null && Object.hasOwnProperty.call(message, "matchTimestamp"))
                    if (!$util.isInteger(message.matchTimestamp) && !(message.matchTimestamp && $util.isInteger(message.matchTimestamp.low) && $util.isInteger(message.matchTimestamp.high)))
                        return "matchTimestamp: integer|Long expected";
                if (message.stats != null && Object.hasOwnProperty.call(message, "stats")) {
                    if (!Array.isArray(message.stats))
                        return "stats: array expected";
                    for (let i = 0; i < message.stats.length; ++i) {
                        let error = $root.elo.v3.OperationTelemetry.verify(message.stats[i], long + 1);
                        if (error)
                            return "stats." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a HistoricalMatchSummary message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.HistoricalMatchSummary} HistoricalMatchSummary
             */
            HistoricalMatchSummary.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.HistoricalMatchSummary)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.HistoricalMatchSummary: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.HistoricalMatchSummary();
                if (object.matchId != null)
                    message.matchId = String(object.matchId);
                if (object.opponentUsername != null)
                    message.opponentUsername = String(object.opponentUsername);
                if (object.isVictory != null)
                    message.isVictory = Boolean(object.isVictory);
                if (object.eloDelta != null)
                    message.eloDelta = object.eloDelta | 0;
                if (object.matchTimestamp != null)
                    if ($util.Long)
                        message.matchTimestamp = $util.Long.fromValue(object.matchTimestamp, false);
                    else if (typeof object.matchTimestamp === "string")
                        message.matchTimestamp = parseInt(object.matchTimestamp, 10);
                    else if (typeof object.matchTimestamp === "number")
                        message.matchTimestamp = object.matchTimestamp;
                    else if (typeof object.matchTimestamp === "object")
                        message.matchTimestamp = new $util.LongBits(object.matchTimestamp.low >>> 0, object.matchTimestamp.high >>> 0).toNumber();
                if (object.stats) {
                    if (!Array.isArray(object.stats))
                        throw TypeError(".elo.v3.HistoricalMatchSummary.stats: array expected");
                    message.stats = [];
                    for (let i = 0; i < object.stats.length; ++i) {
                        if (!$util.isObject(object.stats[i]))
                            throw TypeError(".elo.v3.HistoricalMatchSummary.stats: object expected");
                        message.stats[i] = $root.elo.v3.OperationTelemetry.fromObject(object.stats[i], long + 1);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a HistoricalMatchSummary message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {elo.v3.HistoricalMatchSummary} message HistoricalMatchSummary
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HistoricalMatchSummary.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.stats = [];
                if (options.defaults) {
                    object.matchId = "";
                    object.opponentUsername = "";
                    object.isVictory = false;
                    object.eloDelta = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.matchTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.matchTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.matchId != null && Object.hasOwnProperty.call(message, "matchId"))
                    object.matchId = message.matchId;
                if (message.opponentUsername != null && Object.hasOwnProperty.call(message, "opponentUsername"))
                    object.opponentUsername = message.opponentUsername;
                if (message.isVictory != null && Object.hasOwnProperty.call(message, "isVictory"))
                    object.isVictory = message.isVictory;
                if (message.eloDelta != null && Object.hasOwnProperty.call(message, "eloDelta"))
                    object.eloDelta = message.eloDelta;
                if (message.matchTimestamp != null && Object.hasOwnProperty.call(message, "matchTimestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.matchTimestamp = typeof message.matchTimestamp === "number" ? BigInt(message.matchTimestamp) : $util.Long.fromBits(message.matchTimestamp.low >>> 0, message.matchTimestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.matchTimestamp === "number")
                        object.matchTimestamp = options.longs === String ? String(message.matchTimestamp) : message.matchTimestamp;
                    else
                        object.matchTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.matchTimestamp) : options.longs === Number ? new $util.LongBits(message.matchTimestamp.low >>> 0, message.matchTimestamp.high >>> 0).toNumber() : message.matchTimestamp;
                if (message.stats && message.stats.length) {
                    object.stats = [];
                    for (let j = 0; j < message.stats.length; ++j)
                        object.stats[j] = $root.elo.v3.OperationTelemetry.toObject(message.stats[j], options, q + 1);
                }
                return object;
            };

            /**
             * Converts this HistoricalMatchSummary to JSON.
             * @function toJSON
             * @memberof elo.v3.HistoricalMatchSummary
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HistoricalMatchSummary.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for HistoricalMatchSummary
             * @function getTypeUrl
             * @memberof elo.v3.HistoricalMatchSummary
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            HistoricalMatchSummary.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.HistoricalMatchSummary";
            };

            return HistoricalMatchSummary;
        })();

        v3.RegionalHandshakeOverride = (function() {

            /**
             * Properties of a RegionalHandshakeOverride.
             * @memberof elo.v3
             * @interface IRegionalHandshakeOverride
             * @property {string|null} [roomId] RegionalHandshakeOverride roomId
             * @property {elo.v3.RegionZone|null} [assignedZone] RegionalHandshakeOverride assignedZone
             * @property {string|null} [targetNodeIp] RegionalHandshakeOverride targetNodeIp
             * @property {number|Long|null} [syncTimestamp] RegionalHandshakeOverride syncTimestamp
             */

            /**
             * Constructs a new RegionalHandshakeOverride.
             * @memberof elo.v3
             * @classdesc Represents a RegionalHandshakeOverride.
             * @implements IRegionalHandshakeOverride
             * @constructor
             * @param {elo.v3.IRegionalHandshakeOverride=} [properties] Properties to set
             */
            function RegionalHandshakeOverride(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RegionalHandshakeOverride roomId.
             * @member {string} roomId
             * @memberof elo.v3.RegionalHandshakeOverride
             * @instance
             */
            RegionalHandshakeOverride.prototype.roomId = "";

            /**
             * RegionalHandshakeOverride assignedZone.
             * @member {elo.v3.RegionZone} assignedZone
             * @memberof elo.v3.RegionalHandshakeOverride
             * @instance
             */
            RegionalHandshakeOverride.prototype.assignedZone = 0;

            /**
             * RegionalHandshakeOverride targetNodeIp.
             * @member {string} targetNodeIp
             * @memberof elo.v3.RegionalHandshakeOverride
             * @instance
             */
            RegionalHandshakeOverride.prototype.targetNodeIp = "";

            /**
             * RegionalHandshakeOverride syncTimestamp.
             * @member {number|Long} syncTimestamp
             * @memberof elo.v3.RegionalHandshakeOverride
             * @instance
             */
            RegionalHandshakeOverride.prototype.syncTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new RegionalHandshakeOverride instance using the specified properties.
             * @function create
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {elo.v3.IRegionalHandshakeOverride=} [properties] Properties to set
             * @returns {elo.v3.RegionalHandshakeOverride} RegionalHandshakeOverride instance
             */
            RegionalHandshakeOverride.create = function create(properties) {
                return new RegionalHandshakeOverride(properties);
            };

            /**
             * Encodes the specified RegionalHandshakeOverride message. Does not implicitly {@link elo.v3.RegionalHandshakeOverride.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {elo.v3.IRegionalHandshakeOverride} message RegionalHandshakeOverride message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegionalHandshakeOverride.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
                if (message.assignedZone != null && Object.hasOwnProperty.call(message, "assignedZone"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.assignedZone);
                if (message.targetNodeIp != null && Object.hasOwnProperty.call(message, "targetNodeIp"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.targetNodeIp);
                if (message.syncTimestamp != null && Object.hasOwnProperty.call(message, "syncTimestamp"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.syncTimestamp);
                return writer;
            };

            /**
             * Encodes the specified RegionalHandshakeOverride message, length delimited. Does not implicitly {@link elo.v3.RegionalHandshakeOverride.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {elo.v3.IRegionalHandshakeOverride} message RegionalHandshakeOverride message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegionalHandshakeOverride.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a RegionalHandshakeOverride message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.RegionalHandshakeOverride} RegionalHandshakeOverride
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegionalHandshakeOverride.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.RegionalHandshakeOverride();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.roomId = reader.string();
                            break;
                        }
                    case 2: {
                            message.assignedZone = reader.int32();
                            break;
                        }
                    case 3: {
                            message.targetNodeIp = reader.string();
                            break;
                        }
                    case 4: {
                            message.syncTimestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RegionalHandshakeOverride message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.RegionalHandshakeOverride} RegionalHandshakeOverride
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegionalHandshakeOverride.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RegionalHandshakeOverride message.
             * @function verify
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RegionalHandshakeOverride.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    if (!$util.isString(message.roomId))
                        return "roomId: string expected";
                if (message.assignedZone != null && Object.hasOwnProperty.call(message, "assignedZone"))
                    switch (message.assignedZone) {
                    default:
                        return "assignedZone: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.targetNodeIp != null && Object.hasOwnProperty.call(message, "targetNodeIp"))
                    if (!$util.isString(message.targetNodeIp))
                        return "targetNodeIp: string expected";
                if (message.syncTimestamp != null && Object.hasOwnProperty.call(message, "syncTimestamp"))
                    if (!$util.isInteger(message.syncTimestamp) && !(message.syncTimestamp && $util.isInteger(message.syncTimestamp.low) && $util.isInteger(message.syncTimestamp.high)))
                        return "syncTimestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a RegionalHandshakeOverride message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.RegionalHandshakeOverride} RegionalHandshakeOverride
             */
            RegionalHandshakeOverride.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.RegionalHandshakeOverride)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.RegionalHandshakeOverride: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.RegionalHandshakeOverride();
                if (object.roomId != null)
                    message.roomId = String(object.roomId);
                switch (object.assignedZone) {
                default:
                    if (typeof object.assignedZone === "number") {
                        message.assignedZone = object.assignedZone;
                        break;
                    }
                    break;
                case "REGION_ZONE_UNSPECIFIED":
                case 0:
                    message.assignedZone = 0;
                    break;
                case "REGION_ZONE_APAC_SOUTH":
                case 1:
                    message.assignedZone = 1;
                    break;
                case "REGION_ZONE_EU_CENTRAL":
                case 2:
                    message.assignedZone = 2;
                    break;
                case "REGION_ZONE_US_EAST":
                case 3:
                    message.assignedZone = 3;
                    break;
                case "REGION_ZONE_ME_CENTRAL":
                case 4:
                    message.assignedZone = 4;
                    break;
                }
                if (object.targetNodeIp != null)
                    message.targetNodeIp = String(object.targetNodeIp);
                if (object.syncTimestamp != null)
                    if ($util.Long)
                        message.syncTimestamp = $util.Long.fromValue(object.syncTimestamp, false);
                    else if (typeof object.syncTimestamp === "string")
                        message.syncTimestamp = parseInt(object.syncTimestamp, 10);
                    else if (typeof object.syncTimestamp === "number")
                        message.syncTimestamp = object.syncTimestamp;
                    else if (typeof object.syncTimestamp === "object")
                        message.syncTimestamp = new $util.LongBits(object.syncTimestamp.low >>> 0, object.syncTimestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a RegionalHandshakeOverride message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {elo.v3.RegionalHandshakeOverride} message RegionalHandshakeOverride
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RegionalHandshakeOverride.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.roomId = "";
                    object.assignedZone = options.enums === String ? "REGION_ZONE_UNSPECIFIED" : 0;
                    object.targetNodeIp = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.syncTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.syncTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    object.roomId = message.roomId;
                if (message.assignedZone != null && Object.hasOwnProperty.call(message, "assignedZone"))
                    object.assignedZone = options.enums === String ? $root.elo.v3.RegionZone[message.assignedZone] === undefined ? message.assignedZone : $root.elo.v3.RegionZone[message.assignedZone] : message.assignedZone;
                if (message.targetNodeIp != null && Object.hasOwnProperty.call(message, "targetNodeIp"))
                    object.targetNodeIp = message.targetNodeIp;
                if (message.syncTimestamp != null && Object.hasOwnProperty.call(message, "syncTimestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.syncTimestamp = typeof message.syncTimestamp === "number" ? BigInt(message.syncTimestamp) : $util.Long.fromBits(message.syncTimestamp.low >>> 0, message.syncTimestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.syncTimestamp === "number")
                        object.syncTimestamp = options.longs === String ? String(message.syncTimestamp) : message.syncTimestamp;
                    else
                        object.syncTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.syncTimestamp) : options.longs === Number ? new $util.LongBits(message.syncTimestamp.low >>> 0, message.syncTimestamp.high >>> 0).toNumber() : message.syncTimestamp;
                return object;
            };

            /**
             * Converts this RegionalHandshakeOverride to JSON.
             * @function toJSON
             * @memberof elo.v3.RegionalHandshakeOverride
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RegionalHandshakeOverride.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RegionalHandshakeOverride
             * @function getTypeUrl
             * @memberof elo.v3.RegionalHandshakeOverride
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RegionalHandshakeOverride.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.RegionalHandshakeOverride";
            };

            return RegionalHandshakeOverride;
        })();

        v3.GameSessionSnapshot = (function() {

            /**
             * Properties of a GameSessionSnapshot.
             * @memberof elo.v3
             * @interface IGameSessionSnapshot
             * @property {string|null} [roomId] GameSessionSnapshot roomId
             * @property {number|null} [currentTick] GameSessionSnapshot currentTick
             * @property {string|null} [questionStreamSeed] GameSessionSnapshot questionStreamSeed
             * @property {elo.v3.GameSessionSnapshot.IPlayerStateBackup|null} [playerOne] GameSessionSnapshot playerOne
             * @property {elo.v3.GameSessionSnapshot.IPlayerStateBackup|null} [playerTwo] GameSessionSnapshot playerTwo
             */

            /**
             * Constructs a new GameSessionSnapshot.
             * @memberof elo.v3
             * @classdesc Represents a GameSessionSnapshot.
             * @implements IGameSessionSnapshot
             * @constructor
             * @param {elo.v3.IGameSessionSnapshot=} [properties] Properties to set
             */
            function GameSessionSnapshot(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GameSessionSnapshot roomId.
             * @member {string} roomId
             * @memberof elo.v3.GameSessionSnapshot
             * @instance
             */
            GameSessionSnapshot.prototype.roomId = "";

            /**
             * GameSessionSnapshot currentTick.
             * @member {number} currentTick
             * @memberof elo.v3.GameSessionSnapshot
             * @instance
             */
            GameSessionSnapshot.prototype.currentTick = 0;

            /**
             * GameSessionSnapshot questionStreamSeed.
             * @member {string} questionStreamSeed
             * @memberof elo.v3.GameSessionSnapshot
             * @instance
             */
            GameSessionSnapshot.prototype.questionStreamSeed = "";

            /**
             * GameSessionSnapshot playerOne.
             * @member {elo.v3.GameSessionSnapshot.IPlayerStateBackup|null|undefined} playerOne
             * @memberof elo.v3.GameSessionSnapshot
             * @instance
             */
            GameSessionSnapshot.prototype.playerOne = null;

            /**
             * GameSessionSnapshot playerTwo.
             * @member {elo.v3.GameSessionSnapshot.IPlayerStateBackup|null|undefined} playerTwo
             * @memberof elo.v3.GameSessionSnapshot
             * @instance
             */
            GameSessionSnapshot.prototype.playerTwo = null;

            /**
             * Creates a new GameSessionSnapshot instance using the specified properties.
             * @function create
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {elo.v3.IGameSessionSnapshot=} [properties] Properties to set
             * @returns {elo.v3.GameSessionSnapshot} GameSessionSnapshot instance
             */
            GameSessionSnapshot.create = function create(properties) {
                return new GameSessionSnapshot(properties);
            };

            /**
             * Encodes the specified GameSessionSnapshot message. Does not implicitly {@link elo.v3.GameSessionSnapshot.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {elo.v3.IGameSessionSnapshot} message GameSessionSnapshot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameSessionSnapshot.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
                if (message.currentTick != null && Object.hasOwnProperty.call(message, "currentTick"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.currentTick);
                if (message.questionStreamSeed != null && Object.hasOwnProperty.call(message, "questionStreamSeed"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.questionStreamSeed);
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne"))
                    $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.encode(message.playerOne, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo"))
                    $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.encode(message.playerTwo, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GameSessionSnapshot message, length delimited. Does not implicitly {@link elo.v3.GameSessionSnapshot.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {elo.v3.IGameSessionSnapshot} message GameSessionSnapshot message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GameSessionSnapshot.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a GameSessionSnapshot message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.GameSessionSnapshot} GameSessionSnapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameSessionSnapshot.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.GameSessionSnapshot();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.roomId = reader.string();
                            break;
                        }
                    case 2: {
                            message.currentTick = reader.int32();
                            break;
                        }
                    case 3: {
                            message.questionStreamSeed = reader.string();
                            break;
                        }
                    case 4: {
                            message.playerOne = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 5: {
                            message.playerTwo = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GameSessionSnapshot message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.GameSessionSnapshot} GameSessionSnapshot
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GameSessionSnapshot.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GameSessionSnapshot message.
             * @function verify
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GameSessionSnapshot.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    if (!$util.isString(message.roomId))
                        return "roomId: string expected";
                if (message.currentTick != null && Object.hasOwnProperty.call(message, "currentTick"))
                    if (!$util.isInteger(message.currentTick))
                        return "currentTick: integer expected";
                if (message.questionStreamSeed != null && Object.hasOwnProperty.call(message, "questionStreamSeed"))
                    if (!$util.isString(message.questionStreamSeed))
                        return "questionStreamSeed: string expected";
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne")) {
                    let error = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.verify(message.playerOne, long + 1);
                    if (error)
                        return "playerOne." + error;
                }
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo")) {
                    let error = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.verify(message.playerTwo, long + 1);
                    if (error)
                        return "playerTwo." + error;
                }
                return null;
            };

            /**
             * Creates a GameSessionSnapshot message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.GameSessionSnapshot} GameSessionSnapshot
             */
            GameSessionSnapshot.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.GameSessionSnapshot)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.GameSessionSnapshot: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.GameSessionSnapshot();
                if (object.roomId != null)
                    message.roomId = String(object.roomId);
                if (object.currentTick != null)
                    message.currentTick = object.currentTick | 0;
                if (object.questionStreamSeed != null)
                    message.questionStreamSeed = String(object.questionStreamSeed);
                if (object.playerOne != null) {
                    if (!$util.isObject(object.playerOne))
                        throw TypeError(".elo.v3.GameSessionSnapshot.playerOne: object expected");
                    message.playerOne = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.fromObject(object.playerOne, long + 1);
                }
                if (object.playerTwo != null) {
                    if (!$util.isObject(object.playerTwo))
                        throw TypeError(".elo.v3.GameSessionSnapshot.playerTwo: object expected");
                    message.playerTwo = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.fromObject(object.playerTwo, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a GameSessionSnapshot message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {elo.v3.GameSessionSnapshot} message GameSessionSnapshot
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GameSessionSnapshot.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.roomId = "";
                    object.currentTick = 0;
                    object.questionStreamSeed = "";
                    object.playerOne = null;
                    object.playerTwo = null;
                }
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    object.roomId = message.roomId;
                if (message.currentTick != null && Object.hasOwnProperty.call(message, "currentTick"))
                    object.currentTick = message.currentTick;
                if (message.questionStreamSeed != null && Object.hasOwnProperty.call(message, "questionStreamSeed"))
                    object.questionStreamSeed = message.questionStreamSeed;
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne"))
                    object.playerOne = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.toObject(message.playerOne, options, q + 1);
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo"))
                    object.playerTwo = $root.elo.v3.GameSessionSnapshot.PlayerStateBackup.toObject(message.playerTwo, options, q + 1);
                return object;
            };

            /**
             * Converts this GameSessionSnapshot to JSON.
             * @function toJSON
             * @memberof elo.v3.GameSessionSnapshot
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GameSessionSnapshot.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GameSessionSnapshot
             * @function getTypeUrl
             * @memberof elo.v3.GameSessionSnapshot
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GameSessionSnapshot.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.GameSessionSnapshot";
            };

            GameSessionSnapshot.PlayerStateBackup = (function() {

                /**
                 * Properties of a PlayerStateBackup.
                 * @memberof elo.v3.GameSessionSnapshot
                 * @interface IPlayerStateBackup
                 * @property {string|null} [playerId] PlayerStateBackup playerId
                 * @property {number|null} [currentScore] PlayerStateBackup currentScore
                 * @property {number|null} [currentStreak] PlayerStateBackup currentStreak
                 */

                /**
                 * Constructs a new PlayerStateBackup.
                 * @memberof elo.v3.GameSessionSnapshot
                 * @classdesc Represents a PlayerStateBackup.
                 * @implements IPlayerStateBackup
                 * @constructor
                 * @param {elo.v3.GameSessionSnapshot.IPlayerStateBackup=} [properties] Properties to set
                 */
                function PlayerStateBackup(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PlayerStateBackup playerId.
                 * @member {string} playerId
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @instance
                 */
                PlayerStateBackup.prototype.playerId = "";

                /**
                 * PlayerStateBackup currentScore.
                 * @member {number} currentScore
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @instance
                 */
                PlayerStateBackup.prototype.currentScore = 0;

                /**
                 * PlayerStateBackup currentStreak.
                 * @member {number} currentStreak
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @instance
                 */
                PlayerStateBackup.prototype.currentStreak = 0;

                /**
                 * Creates a new PlayerStateBackup instance using the specified properties.
                 * @function create
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {elo.v3.GameSessionSnapshot.IPlayerStateBackup=} [properties] Properties to set
                 * @returns {elo.v3.GameSessionSnapshot.PlayerStateBackup} PlayerStateBackup instance
                 */
                PlayerStateBackup.create = function create(properties) {
                    return new PlayerStateBackup(properties);
                };

                /**
                 * Encodes the specified PlayerStateBackup message. Does not implicitly {@link elo.v3.GameSessionSnapshot.PlayerStateBackup.verify|verify} messages.
                 * @function encode
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {elo.v3.GameSessionSnapshot.IPlayerStateBackup} message PlayerStateBackup message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PlayerStateBackup.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
                    if (message.currentScore != null && Object.hasOwnProperty.call(message, "currentScore"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.currentScore);
                    if (message.currentStreak != null && Object.hasOwnProperty.call(message, "currentStreak"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.currentStreak);
                    return writer;
                };

                /**
                 * Encodes the specified PlayerStateBackup message, length delimited. Does not implicitly {@link elo.v3.GameSessionSnapshot.PlayerStateBackup.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {elo.v3.GameSessionSnapshot.IPlayerStateBackup} message PlayerStateBackup message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PlayerStateBackup.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a PlayerStateBackup message from the specified reader or buffer.
                 * @function decode
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {elo.v3.GameSessionSnapshot.PlayerStateBackup} PlayerStateBackup
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PlayerStateBackup.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.GameSessionSnapshot.PlayerStateBackup();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.playerId = reader.string();
                                break;
                            }
                        case 2: {
                                message.currentScore = reader.int32();
                                break;
                            }
                        case 3: {
                                message.currentStreak = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PlayerStateBackup message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {elo.v3.GameSessionSnapshot.PlayerStateBackup} PlayerStateBackup
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PlayerStateBackup.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PlayerStateBackup message.
                 * @function verify
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PlayerStateBackup.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                        if (!$util.isString(message.playerId))
                            return "playerId: string expected";
                    if (message.currentScore != null && Object.hasOwnProperty.call(message, "currentScore"))
                        if (!$util.isInteger(message.currentScore))
                            return "currentScore: integer expected";
                    if (message.currentStreak != null && Object.hasOwnProperty.call(message, "currentStreak"))
                        if (!$util.isInteger(message.currentStreak))
                            return "currentStreak: integer expected";
                    return null;
                };

                /**
                 * Creates a PlayerStateBackup message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {elo.v3.GameSessionSnapshot.PlayerStateBackup} PlayerStateBackup
                 */
                PlayerStateBackup.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.elo.v3.GameSessionSnapshot.PlayerStateBackup)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".elo.v3.GameSessionSnapshot.PlayerStateBackup: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.elo.v3.GameSessionSnapshot.PlayerStateBackup();
                    if (object.playerId != null)
                        message.playerId = String(object.playerId);
                    if (object.currentScore != null)
                        message.currentScore = object.currentScore | 0;
                    if (object.currentStreak != null)
                        message.currentStreak = object.currentStreak | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a PlayerStateBackup message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {elo.v3.GameSessionSnapshot.PlayerStateBackup} message PlayerStateBackup
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PlayerStateBackup.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.playerId = "";
                        object.currentScore = 0;
                        object.currentStreak = 0;
                    }
                    if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                        object.playerId = message.playerId;
                    if (message.currentScore != null && Object.hasOwnProperty.call(message, "currentScore"))
                        object.currentScore = message.currentScore;
                    if (message.currentStreak != null && Object.hasOwnProperty.call(message, "currentStreak"))
                        object.currentStreak = message.currentStreak;
                    return object;
                };

                /**
                 * Converts this PlayerStateBackup to JSON.
                 * @function toJSON
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PlayerStateBackup.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for PlayerStateBackup
                 * @function getTypeUrl
                 * @memberof elo.v3.GameSessionSnapshot.PlayerStateBackup
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                PlayerStateBackup.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/elo.v3.GameSessionSnapshot.PlayerStateBackup";
                };

                return PlayerStateBackup;
            })();

            return GameSessionSnapshot;
        })();

        v3.ClientAction = (function() {

            /**
             * Properties of a ClientAction.
             * @memberof elo.v3
             * @interface IClientAction
             * @property {string|null} [roomId] ClientAction roomId
             * @property {string|null} [playerId] ClientAction playerId
             * @property {number|Long|null} [timestamp] ClientAction timestamp
             * @property {string|null} [currentInput] ClientAction currentInput
             * @property {string|null} [submittedAnswer] ClientAction submittedAnswer
             * @property {string|null} [joinQueuePlayerId] ClientAction joinQueuePlayerId
             * @property {elo.v3.ICreateCustomRoomRequest|null} [createCustomRoom] ClientAction createCustomRoom
             * @property {string|null} [joinPrivateRoomCode] ClientAction joinPrivateRoomCode
             * @property {elo.v3.IMatchSecurityLog|null} [securityLog] ClientAction securityLog
             * @property {string|null} [joinTournamentPlayerId] ClientAction joinTournamentPlayerId
             * @property {string|null} [spectateRoomId] ClientAction spectateRoomId
             * @property {elo.v3.ISpectatorEmojiBurst|null} [emojiBurst] ClientAction emojiBurst
             * @property {elo.v3.INetworkHandshake|null} [connectionHandshake] ClientAction connectionHandshake
             * @property {elo.v3.IRegionalHandshakeOverride|null} [regionalOverride] ClientAction regionalOverride
             * @property {elo.v3.PresenceStatus|null} [updatePresence] ClientAction updatePresence
             * @property {elo.v3.ISocialRelationshipAction|null} [relationshipAction] ClientAction relationshipAction
             * @property {elo.v3.IDirectMessage|null} [sendDirectMessage] ClientAction sendDirectMessage
             * @property {string|null} [sendMatchChat] ClientAction sendMatchChat
             * @property {elo.v3.IMatchmakingTicket|null} [joinMatchmaking] ClientAction joinMatchmaking
             */

            /**
             * Constructs a new ClientAction.
             * @memberof elo.v3
             * @classdesc Represents a ClientAction.
             * @implements IClientAction
             * @constructor
             * @param {elo.v3.IClientAction=} [properties] Properties to set
             */
            function ClientAction(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ClientAction roomId.
             * @member {string} roomId
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.roomId = "";

            /**
             * ClientAction playerId.
             * @member {string} playerId
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.playerId = "";

            /**
             * ClientAction timestamp.
             * @member {number|Long} timestamp
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ClientAction currentInput.
             * @member {string|null|undefined} currentInput
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.currentInput = null;

            /**
             * ClientAction submittedAnswer.
             * @member {string|null|undefined} submittedAnswer
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.submittedAnswer = null;

            /**
             * ClientAction joinQueuePlayerId.
             * @member {string|null|undefined} joinQueuePlayerId
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.joinQueuePlayerId = null;

            /**
             * ClientAction createCustomRoom.
             * @member {elo.v3.ICreateCustomRoomRequest|null|undefined} createCustomRoom
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.createCustomRoom = null;

            /**
             * ClientAction joinPrivateRoomCode.
             * @member {string|null|undefined} joinPrivateRoomCode
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.joinPrivateRoomCode = null;

            /**
             * ClientAction securityLog.
             * @member {elo.v3.IMatchSecurityLog|null|undefined} securityLog
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.securityLog = null;

            /**
             * ClientAction joinTournamentPlayerId.
             * @member {string|null|undefined} joinTournamentPlayerId
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.joinTournamentPlayerId = null;

            /**
             * ClientAction spectateRoomId.
             * @member {string|null|undefined} spectateRoomId
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.spectateRoomId = null;

            /**
             * ClientAction emojiBurst.
             * @member {elo.v3.ISpectatorEmojiBurst|null|undefined} emojiBurst
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.emojiBurst = null;

            /**
             * ClientAction connectionHandshake.
             * @member {elo.v3.INetworkHandshake|null|undefined} connectionHandshake
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.connectionHandshake = null;

            /**
             * ClientAction regionalOverride.
             * @member {elo.v3.IRegionalHandshakeOverride|null|undefined} regionalOverride
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.regionalOverride = null;

            /**
             * ClientAction updatePresence.
             * @member {elo.v3.PresenceStatus|null|undefined} updatePresence
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.updatePresence = null;

            /**
             * ClientAction relationshipAction.
             * @member {elo.v3.ISocialRelationshipAction|null|undefined} relationshipAction
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.relationshipAction = null;

            /**
             * ClientAction sendDirectMessage.
             * @member {elo.v3.IDirectMessage|null|undefined} sendDirectMessage
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.sendDirectMessage = null;

            /**
             * ClientAction sendMatchChat.
             * @member {string|null|undefined} sendMatchChat
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.sendMatchChat = null;

            /**
             * ClientAction joinMatchmaking.
             * @member {elo.v3.IMatchmakingTicket|null|undefined} joinMatchmaking
             * @memberof elo.v3.ClientAction
             * @instance
             */
            ClientAction.prototype.joinMatchmaking = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * ClientAction payload.
             * @member {"currentInput"|"submittedAnswer"|"joinQueuePlayerId"|"createCustomRoom"|"joinPrivateRoomCode"|"securityLog"|"joinTournamentPlayerId"|"spectateRoomId"|"emojiBurst"|"connectionHandshake"|"regionalOverride"|"updatePresence"|"relationshipAction"|"sendDirectMessage"|"sendMatchChat"|"joinMatchmaking"|undefined} payload
             * @memberof elo.v3.ClientAction
             * @instance
             */
            Object.defineProperty(ClientAction.prototype, "payload", {
                get: $util.oneOfGetter($oneOfFields = ["currentInput", "submittedAnswer", "joinQueuePlayerId", "createCustomRoom", "joinPrivateRoomCode", "securityLog", "joinTournamentPlayerId", "spectateRoomId", "emojiBurst", "connectionHandshake", "regionalOverride", "updatePresence", "relationshipAction", "sendDirectMessage", "sendMatchChat", "joinMatchmaking"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ClientAction instance using the specified properties.
             * @function create
             * @memberof elo.v3.ClientAction
             * @static
             * @param {elo.v3.IClientAction=} [properties] Properties to set
             * @returns {elo.v3.ClientAction} ClientAction instance
             */
            ClientAction.create = function create(properties) {
                return new ClientAction(properties);
            };

            /**
             * Encodes the specified ClientAction message. Does not implicitly {@link elo.v3.ClientAction.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.ClientAction
             * @static
             * @param {elo.v3.IClientAction} message ClientAction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientAction.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.playerId);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
                if (message.currentInput != null && Object.hasOwnProperty.call(message, "currentInput"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.currentInput);
                if (message.submittedAnswer != null && Object.hasOwnProperty.call(message, "submittedAnswer"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.submittedAnswer);
                if (message.joinQueuePlayerId != null && Object.hasOwnProperty.call(message, "joinQueuePlayerId"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.joinQueuePlayerId);
                if (message.createCustomRoom != null && Object.hasOwnProperty.call(message, "createCustomRoom"))
                    $root.elo.v3.CreateCustomRoomRequest.encode(message.createCustomRoom, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
                if (message.joinPrivateRoomCode != null && Object.hasOwnProperty.call(message, "joinPrivateRoomCode"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.joinPrivateRoomCode);
                if (message.securityLog != null && Object.hasOwnProperty.call(message, "securityLog"))
                    $root.elo.v3.MatchSecurityLog.encode(message.securityLog, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
                if (message.joinTournamentPlayerId != null && Object.hasOwnProperty.call(message, "joinTournamentPlayerId"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.joinTournamentPlayerId);
                if (message.spectateRoomId != null && Object.hasOwnProperty.call(message, "spectateRoomId"))
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.spectateRoomId);
                if (message.emojiBurst != null && Object.hasOwnProperty.call(message, "emojiBurst"))
                    $root.elo.v3.SpectatorEmojiBurst.encode(message.emojiBurst, writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
                if (message.connectionHandshake != null && Object.hasOwnProperty.call(message, "connectionHandshake"))
                    $root.elo.v3.NetworkHandshake.encode(message.connectionHandshake, writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
                if (message.regionalOverride != null && Object.hasOwnProperty.call(message, "regionalOverride"))
                    $root.elo.v3.RegionalHandshakeOverride.encode(message.regionalOverride, writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
                if (message.updatePresence != null && Object.hasOwnProperty.call(message, "updatePresence"))
                    writer.uint32(/* id 15, wireType 0 =*/120).int32(message.updatePresence);
                if (message.relationshipAction != null && Object.hasOwnProperty.call(message, "relationshipAction"))
                    $root.elo.v3.SocialRelationshipAction.encode(message.relationshipAction, writer.uint32(/* id 16, wireType 2 =*/130).fork(), q + 1).ldelim();
                if (message.sendDirectMessage != null && Object.hasOwnProperty.call(message, "sendDirectMessage"))
                    $root.elo.v3.DirectMessage.encode(message.sendDirectMessage, writer.uint32(/* id 17, wireType 2 =*/138).fork(), q + 1).ldelim();
                if (message.sendMatchChat != null && Object.hasOwnProperty.call(message, "sendMatchChat"))
                    writer.uint32(/* id 18, wireType 2 =*/146).string(message.sendMatchChat);
                if (message.joinMatchmaking != null && Object.hasOwnProperty.call(message, "joinMatchmaking"))
                    $root.elo.v3.MatchmakingTicket.encode(message.joinMatchmaking, writer.uint32(/* id 19, wireType 2 =*/154).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ClientAction message, length delimited. Does not implicitly {@link elo.v3.ClientAction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.ClientAction
             * @static
             * @param {elo.v3.IClientAction} message ClientAction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ClientAction message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.ClientAction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.ClientAction} ClientAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientAction.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.ClientAction();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.roomId = reader.string();
                            break;
                        }
                    case 2: {
                            message.playerId = reader.string();
                            break;
                        }
                    case 3: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    case 4: {
                            message.currentInput = reader.string();
                            break;
                        }
                    case 5: {
                            message.submittedAnswer = reader.string();
                            break;
                        }
                    case 6: {
                            message.joinQueuePlayerId = reader.string();
                            break;
                        }
                    case 7: {
                            message.createCustomRoom = $root.elo.v3.CreateCustomRoomRequest.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 8: {
                            message.joinPrivateRoomCode = reader.string();
                            break;
                        }
                    case 9: {
                            message.securityLog = $root.elo.v3.MatchSecurityLog.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 10: {
                            message.joinTournamentPlayerId = reader.string();
                            break;
                        }
                    case 11: {
                            message.spectateRoomId = reader.string();
                            break;
                        }
                    case 12: {
                            message.emojiBurst = $root.elo.v3.SpectatorEmojiBurst.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 13: {
                            message.connectionHandshake = $root.elo.v3.NetworkHandshake.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 14: {
                            message.regionalOverride = $root.elo.v3.RegionalHandshakeOverride.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 15: {
                            message.updatePresence = reader.int32();
                            break;
                        }
                    case 16: {
                            message.relationshipAction = $root.elo.v3.SocialRelationshipAction.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 17: {
                            message.sendDirectMessage = $root.elo.v3.DirectMessage.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 18: {
                            message.sendMatchChat = reader.string();
                            break;
                        }
                    case 19: {
                            message.joinMatchmaking = $root.elo.v3.MatchmakingTicket.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ClientAction message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.ClientAction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.ClientAction} ClientAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClientAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClientAction message.
             * @function verify
             * @memberof elo.v3.ClientAction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClientAction.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    if (!$util.isString(message.roomId))
                        return "roomId: string expected";
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    if (!$util.isString(message.playerId))
                        return "playerId: string expected";
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                if (message.currentInput != null && Object.hasOwnProperty.call(message, "currentInput")) {
                    properties.payload = 1;
                    if (!$util.isString(message.currentInput))
                        return "currentInput: string expected";
                }
                if (message.submittedAnswer != null && Object.hasOwnProperty.call(message, "submittedAnswer")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    if (!$util.isString(message.submittedAnswer))
                        return "submittedAnswer: string expected";
                }
                if (message.joinQueuePlayerId != null && Object.hasOwnProperty.call(message, "joinQueuePlayerId")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    if (!$util.isString(message.joinQueuePlayerId))
                        return "joinQueuePlayerId: string expected";
                }
                if (message.createCustomRoom != null && Object.hasOwnProperty.call(message, "createCustomRoom")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.CreateCustomRoomRequest.verify(message.createCustomRoom, long + 1);
                        if (error)
                            return "createCustomRoom." + error;
                    }
                }
                if (message.joinPrivateRoomCode != null && Object.hasOwnProperty.call(message, "joinPrivateRoomCode")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    if (!$util.isString(message.joinPrivateRoomCode))
                        return "joinPrivateRoomCode: string expected";
                }
                if (message.securityLog != null && Object.hasOwnProperty.call(message, "securityLog")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.MatchSecurityLog.verify(message.securityLog, long + 1);
                        if (error)
                            return "securityLog." + error;
                    }
                }
                if (message.joinTournamentPlayerId != null && Object.hasOwnProperty.call(message, "joinTournamentPlayerId")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    if (!$util.isString(message.joinTournamentPlayerId))
                        return "joinTournamentPlayerId: string expected";
                }
                if (message.spectateRoomId != null && Object.hasOwnProperty.call(message, "spectateRoomId")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    if (!$util.isString(message.spectateRoomId))
                        return "spectateRoomId: string expected";
                }
                if (message.emojiBurst != null && Object.hasOwnProperty.call(message, "emojiBurst")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.SpectatorEmojiBurst.verify(message.emojiBurst, long + 1);
                        if (error)
                            return "emojiBurst." + error;
                    }
                }
                if (message.connectionHandshake != null && Object.hasOwnProperty.call(message, "connectionHandshake")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.NetworkHandshake.verify(message.connectionHandshake, long + 1);
                        if (error)
                            return "connectionHandshake." + error;
                    }
                }
                if (message.regionalOverride != null && Object.hasOwnProperty.call(message, "regionalOverride")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.RegionalHandshakeOverride.verify(message.regionalOverride, long + 1);
                        if (error)
                            return "regionalOverride." + error;
                    }
                }
                if (message.updatePresence != null && Object.hasOwnProperty.call(message, "updatePresence")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    switch (message.updatePresence) {
                    default:
                        return "updatePresence: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                }
                if (message.relationshipAction != null && Object.hasOwnProperty.call(message, "relationshipAction")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.SocialRelationshipAction.verify(message.relationshipAction, long + 1);
                        if (error)
                            return "relationshipAction." + error;
                    }
                }
                if (message.sendDirectMessage != null && Object.hasOwnProperty.call(message, "sendDirectMessage")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.DirectMessage.verify(message.sendDirectMessage, long + 1);
                        if (error)
                            return "sendDirectMessage." + error;
                    }
                }
                if (message.sendMatchChat != null && Object.hasOwnProperty.call(message, "sendMatchChat")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    if (!$util.isString(message.sendMatchChat))
                        return "sendMatchChat: string expected";
                }
                if (message.joinMatchmaking != null && Object.hasOwnProperty.call(message, "joinMatchmaking")) {
                    if (properties.payload === 1)
                        return "payload: multiple values";
                    properties.payload = 1;
                    {
                        let error = $root.elo.v3.MatchmakingTicket.verify(message.joinMatchmaking, long + 1);
                        if (error)
                            return "joinMatchmaking." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ClientAction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.ClientAction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.ClientAction} ClientAction
             */
            ClientAction.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.ClientAction)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.ClientAction: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.ClientAction();
                if (object.roomId != null)
                    message.roomId = String(object.roomId);
                if (object.playerId != null)
                    message.playerId = String(object.playerId);
                if (object.timestamp != null)
                    if ($util.Long)
                        message.timestamp = $util.Long.fromValue(object.timestamp, false);
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.currentInput != null)
                    message.currentInput = String(object.currentInput);
                if (object.submittedAnswer != null)
                    message.submittedAnswer = String(object.submittedAnswer);
                if (object.joinQueuePlayerId != null)
                    message.joinQueuePlayerId = String(object.joinQueuePlayerId);
                if (object.createCustomRoom != null) {
                    if (!$util.isObject(object.createCustomRoom))
                        throw TypeError(".elo.v3.ClientAction.createCustomRoom: object expected");
                    message.createCustomRoom = $root.elo.v3.CreateCustomRoomRequest.fromObject(object.createCustomRoom, long + 1);
                }
                if (object.joinPrivateRoomCode != null)
                    message.joinPrivateRoomCode = String(object.joinPrivateRoomCode);
                if (object.securityLog != null) {
                    if (!$util.isObject(object.securityLog))
                        throw TypeError(".elo.v3.ClientAction.securityLog: object expected");
                    message.securityLog = $root.elo.v3.MatchSecurityLog.fromObject(object.securityLog, long + 1);
                }
                if (object.joinTournamentPlayerId != null)
                    message.joinTournamentPlayerId = String(object.joinTournamentPlayerId);
                if (object.spectateRoomId != null)
                    message.spectateRoomId = String(object.spectateRoomId);
                if (object.emojiBurst != null) {
                    if (!$util.isObject(object.emojiBurst))
                        throw TypeError(".elo.v3.ClientAction.emojiBurst: object expected");
                    message.emojiBurst = $root.elo.v3.SpectatorEmojiBurst.fromObject(object.emojiBurst, long + 1);
                }
                if (object.connectionHandshake != null) {
                    if (!$util.isObject(object.connectionHandshake))
                        throw TypeError(".elo.v3.ClientAction.connectionHandshake: object expected");
                    message.connectionHandshake = $root.elo.v3.NetworkHandshake.fromObject(object.connectionHandshake, long + 1);
                }
                if (object.regionalOverride != null) {
                    if (!$util.isObject(object.regionalOverride))
                        throw TypeError(".elo.v3.ClientAction.regionalOverride: object expected");
                    message.regionalOverride = $root.elo.v3.RegionalHandshakeOverride.fromObject(object.regionalOverride, long + 1);
                }
                switch (object.updatePresence) {
                default:
                    if (typeof object.updatePresence === "number") {
                        message.updatePresence = object.updatePresence;
                        break;
                    }
                    break;
                case "PRESENCE_ONLINE":
                case 0:
                    message.updatePresence = 0;
                    break;
                case "PRESENCE_IN_MATCH":
                case 1:
                    message.updatePresence = 1;
                    break;
                case "PRESENCE_OFFLINE":
                case 2:
                    message.updatePresence = 2;
                    break;
                }
                if (object.relationshipAction != null) {
                    if (!$util.isObject(object.relationshipAction))
                        throw TypeError(".elo.v3.ClientAction.relationshipAction: object expected");
                    message.relationshipAction = $root.elo.v3.SocialRelationshipAction.fromObject(object.relationshipAction, long + 1);
                }
                if (object.sendDirectMessage != null) {
                    if (!$util.isObject(object.sendDirectMessage))
                        throw TypeError(".elo.v3.ClientAction.sendDirectMessage: object expected");
                    message.sendDirectMessage = $root.elo.v3.DirectMessage.fromObject(object.sendDirectMessage, long + 1);
                }
                if (object.sendMatchChat != null)
                    message.sendMatchChat = String(object.sendMatchChat);
                if (object.joinMatchmaking != null) {
                    if (!$util.isObject(object.joinMatchmaking))
                        throw TypeError(".elo.v3.ClientAction.joinMatchmaking: object expected");
                    message.joinMatchmaking = $root.elo.v3.MatchmakingTicket.fromObject(object.joinMatchmaking, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a ClientAction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.ClientAction
             * @static
             * @param {elo.v3.ClientAction} message ClientAction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClientAction.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.roomId = "";
                    object.playerId = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    object.roomId = message.roomId;
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    object.playerId = message.playerId;
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.timestamp = typeof message.timestamp === "number" ? BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.currentInput != null && Object.hasOwnProperty.call(message, "currentInput")) {
                    object.currentInput = message.currentInput;
                    if (options.oneofs)
                        object.payload = "currentInput";
                }
                if (message.submittedAnswer != null && Object.hasOwnProperty.call(message, "submittedAnswer")) {
                    object.submittedAnswer = message.submittedAnswer;
                    if (options.oneofs)
                        object.payload = "submittedAnswer";
                }
                if (message.joinQueuePlayerId != null && Object.hasOwnProperty.call(message, "joinQueuePlayerId")) {
                    object.joinQueuePlayerId = message.joinQueuePlayerId;
                    if (options.oneofs)
                        object.payload = "joinQueuePlayerId";
                }
                if (message.createCustomRoom != null && Object.hasOwnProperty.call(message, "createCustomRoom")) {
                    object.createCustomRoom = $root.elo.v3.CreateCustomRoomRequest.toObject(message.createCustomRoom, options, q + 1);
                    if (options.oneofs)
                        object.payload = "createCustomRoom";
                }
                if (message.joinPrivateRoomCode != null && Object.hasOwnProperty.call(message, "joinPrivateRoomCode")) {
                    object.joinPrivateRoomCode = message.joinPrivateRoomCode;
                    if (options.oneofs)
                        object.payload = "joinPrivateRoomCode";
                }
                if (message.securityLog != null && Object.hasOwnProperty.call(message, "securityLog")) {
                    object.securityLog = $root.elo.v3.MatchSecurityLog.toObject(message.securityLog, options, q + 1);
                    if (options.oneofs)
                        object.payload = "securityLog";
                }
                if (message.joinTournamentPlayerId != null && Object.hasOwnProperty.call(message, "joinTournamentPlayerId")) {
                    object.joinTournamentPlayerId = message.joinTournamentPlayerId;
                    if (options.oneofs)
                        object.payload = "joinTournamentPlayerId";
                }
                if (message.spectateRoomId != null && Object.hasOwnProperty.call(message, "spectateRoomId")) {
                    object.spectateRoomId = message.spectateRoomId;
                    if (options.oneofs)
                        object.payload = "spectateRoomId";
                }
                if (message.emojiBurst != null && Object.hasOwnProperty.call(message, "emojiBurst")) {
                    object.emojiBurst = $root.elo.v3.SpectatorEmojiBurst.toObject(message.emojiBurst, options, q + 1);
                    if (options.oneofs)
                        object.payload = "emojiBurst";
                }
                if (message.connectionHandshake != null && Object.hasOwnProperty.call(message, "connectionHandshake")) {
                    object.connectionHandshake = $root.elo.v3.NetworkHandshake.toObject(message.connectionHandshake, options, q + 1);
                    if (options.oneofs)
                        object.payload = "connectionHandshake";
                }
                if (message.regionalOverride != null && Object.hasOwnProperty.call(message, "regionalOverride")) {
                    object.regionalOverride = $root.elo.v3.RegionalHandshakeOverride.toObject(message.regionalOverride, options, q + 1);
                    if (options.oneofs)
                        object.payload = "regionalOverride";
                }
                if (message.updatePresence != null && Object.hasOwnProperty.call(message, "updatePresence")) {
                    object.updatePresence = options.enums === String ? $root.elo.v3.PresenceStatus[message.updatePresence] === undefined ? message.updatePresence : $root.elo.v3.PresenceStatus[message.updatePresence] : message.updatePresence;
                    if (options.oneofs)
                        object.payload = "updatePresence";
                }
                if (message.relationshipAction != null && Object.hasOwnProperty.call(message, "relationshipAction")) {
                    object.relationshipAction = $root.elo.v3.SocialRelationshipAction.toObject(message.relationshipAction, options, q + 1);
                    if (options.oneofs)
                        object.payload = "relationshipAction";
                }
                if (message.sendDirectMessage != null && Object.hasOwnProperty.call(message, "sendDirectMessage")) {
                    object.sendDirectMessage = $root.elo.v3.DirectMessage.toObject(message.sendDirectMessage, options, q + 1);
                    if (options.oneofs)
                        object.payload = "sendDirectMessage";
                }
                if (message.sendMatchChat != null && Object.hasOwnProperty.call(message, "sendMatchChat")) {
                    object.sendMatchChat = message.sendMatchChat;
                    if (options.oneofs)
                        object.payload = "sendMatchChat";
                }
                if (message.joinMatchmaking != null && Object.hasOwnProperty.call(message, "joinMatchmaking")) {
                    object.joinMatchmaking = $root.elo.v3.MatchmakingTicket.toObject(message.joinMatchmaking, options, q + 1);
                    if (options.oneofs)
                        object.payload = "joinMatchmaking";
                }
                return object;
            };

            /**
             * Converts this ClientAction to JSON.
             * @function toJSON
             * @memberof elo.v3.ClientAction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ClientAction
             * @function getTypeUrl
             * @memberof elo.v3.ClientAction
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ClientAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.ClientAction";
            };

            return ClientAction;
        })();

        /**
         * PresenceStatus enum.
         * @name elo.v3.PresenceStatus
         * @enum {number}
         * @property {number} PRESENCE_ONLINE=0 PRESENCE_ONLINE value
         * @property {number} PRESENCE_IN_MATCH=1 PRESENCE_IN_MATCH value
         * @property {number} PRESENCE_OFFLINE=2 PRESENCE_OFFLINE value
         */
        v3.PresenceStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "PRESENCE_ONLINE"] = 0;
            values[valuesById[1] = "PRESENCE_IN_MATCH"] = 1;
            values[valuesById[2] = "PRESENCE_OFFLINE"] = 2;
            return values;
        })();

        /**
         * RelationshipState enum.
         * @name elo.v3.RelationshipState
         * @enum {number}
         * @property {number} RELATION_NONE=0 RELATION_NONE value
         * @property {number} RELATION_PENDING_A=1 RELATION_PENDING_A value
         * @property {number} RELATION_FRIENDS=2 RELATION_FRIENDS value
         * @property {number} RELATION_BLOCKED=3 RELATION_BLOCKED value
         */
        v3.RelationshipState = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "RELATION_NONE"] = 0;
            values[valuesById[1] = "RELATION_PENDING_A"] = 1;
            values[valuesById[2] = "RELATION_FRIENDS"] = 2;
            values[valuesById[3] = "RELATION_BLOCKED"] = 3;
            return values;
        })();

        /**
         * RelationshipAction enum.
         * @name elo.v3.RelationshipAction
         * @enum {number}
         * @property {number} ACTION_SEND_REQUEST=0 ACTION_SEND_REQUEST value
         * @property {number} ACTION_ACCEPT_REQUEST=1 ACTION_ACCEPT_REQUEST value
         * @property {number} ACTION_BLOCK_USER=2 ACTION_BLOCK_USER value
         */
        v3.RelationshipAction = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ACTION_SEND_REQUEST"] = 0;
            values[valuesById[1] = "ACTION_ACCEPT_REQUEST"] = 1;
            values[valuesById[2] = "ACTION_BLOCK_USER"] = 2;
            return values;
        })();

        v3.SocialRelationshipAction = (function() {

            /**
             * Properties of a SocialRelationshipAction.
             * @memberof elo.v3
             * @interface ISocialRelationshipAction
             * @property {string|null} [targetPlayerId] SocialRelationshipAction targetPlayerId
             * @property {elo.v3.RelationshipAction|null} [action] SocialRelationshipAction action
             */

            /**
             * Constructs a new SocialRelationshipAction.
             * @memberof elo.v3
             * @classdesc Represents a SocialRelationshipAction.
             * @implements ISocialRelationshipAction
             * @constructor
             * @param {elo.v3.ISocialRelationshipAction=} [properties] Properties to set
             */
            function SocialRelationshipAction(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SocialRelationshipAction targetPlayerId.
             * @member {string} targetPlayerId
             * @memberof elo.v3.SocialRelationshipAction
             * @instance
             */
            SocialRelationshipAction.prototype.targetPlayerId = "";

            /**
             * SocialRelationshipAction action.
             * @member {elo.v3.RelationshipAction} action
             * @memberof elo.v3.SocialRelationshipAction
             * @instance
             */
            SocialRelationshipAction.prototype.action = 0;

            /**
             * Creates a new SocialRelationshipAction instance using the specified properties.
             * @function create
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {elo.v3.ISocialRelationshipAction=} [properties] Properties to set
             * @returns {elo.v3.SocialRelationshipAction} SocialRelationshipAction instance
             */
            SocialRelationshipAction.create = function create(properties) {
                return new SocialRelationshipAction(properties);
            };

            /**
             * Encodes the specified SocialRelationshipAction message. Does not implicitly {@link elo.v3.SocialRelationshipAction.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {elo.v3.ISocialRelationshipAction} message SocialRelationshipAction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SocialRelationshipAction.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.targetPlayerId != null && Object.hasOwnProperty.call(message, "targetPlayerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.targetPlayerId);
                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.action);
                return writer;
            };

            /**
             * Encodes the specified SocialRelationshipAction message, length delimited. Does not implicitly {@link elo.v3.SocialRelationshipAction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {elo.v3.ISocialRelationshipAction} message SocialRelationshipAction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SocialRelationshipAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a SocialRelationshipAction message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.SocialRelationshipAction} SocialRelationshipAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SocialRelationshipAction.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.SocialRelationshipAction();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.targetPlayerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.action = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SocialRelationshipAction message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.SocialRelationshipAction} SocialRelationshipAction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SocialRelationshipAction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SocialRelationshipAction message.
             * @function verify
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SocialRelationshipAction.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.targetPlayerId != null && Object.hasOwnProperty.call(message, "targetPlayerId"))
                    if (!$util.isString(message.targetPlayerId))
                        return "targetPlayerId: string expected";
                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                    switch (message.action) {
                    default:
                        return "action: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                return null;
            };

            /**
             * Creates a SocialRelationshipAction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.SocialRelationshipAction} SocialRelationshipAction
             */
            SocialRelationshipAction.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.SocialRelationshipAction)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.SocialRelationshipAction: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.SocialRelationshipAction();
                if (object.targetPlayerId != null)
                    message.targetPlayerId = String(object.targetPlayerId);
                switch (object.action) {
                default:
                    if (typeof object.action === "number") {
                        message.action = object.action;
                        break;
                    }
                    break;
                case "ACTION_SEND_REQUEST":
                case 0:
                    message.action = 0;
                    break;
                case "ACTION_ACCEPT_REQUEST":
                case 1:
                    message.action = 1;
                    break;
                case "ACTION_BLOCK_USER":
                case 2:
                    message.action = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a SocialRelationshipAction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {elo.v3.SocialRelationshipAction} message SocialRelationshipAction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SocialRelationshipAction.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.targetPlayerId = "";
                    object.action = options.enums === String ? "ACTION_SEND_REQUEST" : 0;
                }
                if (message.targetPlayerId != null && Object.hasOwnProperty.call(message, "targetPlayerId"))
                    object.targetPlayerId = message.targetPlayerId;
                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                    object.action = options.enums === String ? $root.elo.v3.RelationshipAction[message.action] === undefined ? message.action : $root.elo.v3.RelationshipAction[message.action] : message.action;
                return object;
            };

            /**
             * Converts this SocialRelationshipAction to JSON.
             * @function toJSON
             * @memberof elo.v3.SocialRelationshipAction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SocialRelationshipAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for SocialRelationshipAction
             * @function getTypeUrl
             * @memberof elo.v3.SocialRelationshipAction
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SocialRelationshipAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.SocialRelationshipAction";
            };

            return SocialRelationshipAction;
        })();

        v3.PresenceUpdate = (function() {

            /**
             * Properties of a PresenceUpdate.
             * @memberof elo.v3
             * @interface IPresenceUpdate
             * @property {string|null} [playerId] PresenceUpdate playerId
             * @property {elo.v3.PresenceStatus|null} [status] PresenceUpdate status
             * @property {number|Long|null} [timestamp] PresenceUpdate timestamp
             */

            /**
             * Constructs a new PresenceUpdate.
             * @memberof elo.v3
             * @classdesc Represents a PresenceUpdate.
             * @implements IPresenceUpdate
             * @constructor
             * @param {elo.v3.IPresenceUpdate=} [properties] Properties to set
             */
            function PresenceUpdate(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PresenceUpdate playerId.
             * @member {string} playerId
             * @memberof elo.v3.PresenceUpdate
             * @instance
             */
            PresenceUpdate.prototype.playerId = "";

            /**
             * PresenceUpdate status.
             * @member {elo.v3.PresenceStatus} status
             * @memberof elo.v3.PresenceUpdate
             * @instance
             */
            PresenceUpdate.prototype.status = 0;

            /**
             * PresenceUpdate timestamp.
             * @member {number|Long} timestamp
             * @memberof elo.v3.PresenceUpdate
             * @instance
             */
            PresenceUpdate.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new PresenceUpdate instance using the specified properties.
             * @function create
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {elo.v3.IPresenceUpdate=} [properties] Properties to set
             * @returns {elo.v3.PresenceUpdate} PresenceUpdate instance
             */
            PresenceUpdate.create = function create(properties) {
                return new PresenceUpdate(properties);
            };

            /**
             * Encodes the specified PresenceUpdate message. Does not implicitly {@link elo.v3.PresenceUpdate.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {elo.v3.IPresenceUpdate} message PresenceUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PresenceUpdate.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified PresenceUpdate message, length delimited. Does not implicitly {@link elo.v3.PresenceUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {elo.v3.IPresenceUpdate} message PresenceUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PresenceUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a PresenceUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.PresenceUpdate} PresenceUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PresenceUpdate.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.PresenceUpdate();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.playerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.status = reader.int32();
                            break;
                        }
                    case 3: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PresenceUpdate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.PresenceUpdate} PresenceUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PresenceUpdate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PresenceUpdate message.
             * @function verify
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            PresenceUpdate.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    if (!$util.isString(message.playerId))
                        return "playerId: string expected";
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    switch (message.status) {
                    default:
                        return "status: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a PresenceUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.PresenceUpdate} PresenceUpdate
             */
            PresenceUpdate.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.PresenceUpdate)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.PresenceUpdate: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.PresenceUpdate();
                if (object.playerId != null)
                    message.playerId = String(object.playerId);
                switch (object.status) {
                default:
                    if (typeof object.status === "number") {
                        message.status = object.status;
                        break;
                    }
                    break;
                case "PRESENCE_ONLINE":
                case 0:
                    message.status = 0;
                    break;
                case "PRESENCE_IN_MATCH":
                case 1:
                    message.status = 1;
                    break;
                case "PRESENCE_OFFLINE":
                case 2:
                    message.status = 2;
                    break;
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        message.timestamp = $util.Long.fromValue(object.timestamp, false);
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a PresenceUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {elo.v3.PresenceUpdate} message PresenceUpdate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PresenceUpdate.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.playerId = "";
                    object.status = options.enums === String ? "PRESENCE_ONLINE" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    object.playerId = message.playerId;
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    object.status = options.enums === String ? $root.elo.v3.PresenceStatus[message.status] === undefined ? message.status : $root.elo.v3.PresenceStatus[message.status] : message.status;
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.timestamp = typeof message.timestamp === "number" ? BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this PresenceUpdate to JSON.
             * @function toJSON
             * @memberof elo.v3.PresenceUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PresenceUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PresenceUpdate
             * @function getTypeUrl
             * @memberof elo.v3.PresenceUpdate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PresenceUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.PresenceUpdate";
            };

            return PresenceUpdate;
        })();

        v3.RelationshipUpdate = (function() {

            /**
             * Properties of a RelationshipUpdate.
             * @memberof elo.v3
             * @interface IRelationshipUpdate
             * @property {string|null} [initiatorId] RelationshipUpdate initiatorId
             * @property {string|null} [targetId] RelationshipUpdate targetId
             * @property {elo.v3.RelationshipState|null} [state] RelationshipUpdate state
             * @property {number|Long|null} [timestamp] RelationshipUpdate timestamp
             */

            /**
             * Constructs a new RelationshipUpdate.
             * @memberof elo.v3
             * @classdesc Represents a RelationshipUpdate.
             * @implements IRelationshipUpdate
             * @constructor
             * @param {elo.v3.IRelationshipUpdate=} [properties] Properties to set
             */
            function RelationshipUpdate(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RelationshipUpdate initiatorId.
             * @member {string} initiatorId
             * @memberof elo.v3.RelationshipUpdate
             * @instance
             */
            RelationshipUpdate.prototype.initiatorId = "";

            /**
             * RelationshipUpdate targetId.
             * @member {string} targetId
             * @memberof elo.v3.RelationshipUpdate
             * @instance
             */
            RelationshipUpdate.prototype.targetId = "";

            /**
             * RelationshipUpdate state.
             * @member {elo.v3.RelationshipState} state
             * @memberof elo.v3.RelationshipUpdate
             * @instance
             */
            RelationshipUpdate.prototype.state = 0;

            /**
             * RelationshipUpdate timestamp.
             * @member {number|Long} timestamp
             * @memberof elo.v3.RelationshipUpdate
             * @instance
             */
            RelationshipUpdate.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new RelationshipUpdate instance using the specified properties.
             * @function create
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {elo.v3.IRelationshipUpdate=} [properties] Properties to set
             * @returns {elo.v3.RelationshipUpdate} RelationshipUpdate instance
             */
            RelationshipUpdate.create = function create(properties) {
                return new RelationshipUpdate(properties);
            };

            /**
             * Encodes the specified RelationshipUpdate message. Does not implicitly {@link elo.v3.RelationshipUpdate.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {elo.v3.IRelationshipUpdate} message RelationshipUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RelationshipUpdate.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.initiatorId != null && Object.hasOwnProperty.call(message, "initiatorId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.initiatorId);
                if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.targetId);
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.state);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified RelationshipUpdate message, length delimited. Does not implicitly {@link elo.v3.RelationshipUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {elo.v3.IRelationshipUpdate} message RelationshipUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RelationshipUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a RelationshipUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.RelationshipUpdate} RelationshipUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RelationshipUpdate.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.RelationshipUpdate();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.initiatorId = reader.string();
                            break;
                        }
                    case 2: {
                            message.targetId = reader.string();
                            break;
                        }
                    case 3: {
                            message.state = reader.int32();
                            break;
                        }
                    case 4: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RelationshipUpdate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.RelationshipUpdate} RelationshipUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RelationshipUpdate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RelationshipUpdate message.
             * @function verify
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RelationshipUpdate.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.initiatorId != null && Object.hasOwnProperty.call(message, "initiatorId"))
                    if (!$util.isString(message.initiatorId))
                        return "initiatorId: string expected";
                if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
                    if (!$util.isString(message.targetId))
                        return "targetId: string expected";
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a RelationshipUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.RelationshipUpdate} RelationshipUpdate
             */
            RelationshipUpdate.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.RelationshipUpdate)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.RelationshipUpdate: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.RelationshipUpdate();
                if (object.initiatorId != null)
                    message.initiatorId = String(object.initiatorId);
                if (object.targetId != null)
                    message.targetId = String(object.targetId);
                switch (object.state) {
                default:
                    if (typeof object.state === "number") {
                        message.state = object.state;
                        break;
                    }
                    break;
                case "RELATION_NONE":
                case 0:
                    message.state = 0;
                    break;
                case "RELATION_PENDING_A":
                case 1:
                    message.state = 1;
                    break;
                case "RELATION_FRIENDS":
                case 2:
                    message.state = 2;
                    break;
                case "RELATION_BLOCKED":
                case 3:
                    message.state = 3;
                    break;
                }
                if (object.timestamp != null)
                    if ($util.Long)
                        message.timestamp = $util.Long.fromValue(object.timestamp, false);
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a RelationshipUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {elo.v3.RelationshipUpdate} message RelationshipUpdate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RelationshipUpdate.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.initiatorId = "";
                    object.targetId = "";
                    object.state = options.enums === String ? "RELATION_NONE" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.initiatorId != null && Object.hasOwnProperty.call(message, "initiatorId"))
                    object.initiatorId = message.initiatorId;
                if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
                    object.targetId = message.targetId;
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    object.state = options.enums === String ? $root.elo.v3.RelationshipState[message.state] === undefined ? message.state : $root.elo.v3.RelationshipState[message.state] : message.state;
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.timestamp = typeof message.timestamp === "number" ? BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this RelationshipUpdate to JSON.
             * @function toJSON
             * @memberof elo.v3.RelationshipUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RelationshipUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RelationshipUpdate
             * @function getTypeUrl
             * @memberof elo.v3.RelationshipUpdate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RelationshipUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.RelationshipUpdate";
            };

            return RelationshipUpdate;
        })();

        v3.DirectMessage = (function() {

            /**
             * Properties of a DirectMessage.
             * @memberof elo.v3
             * @interface IDirectMessage
             * @property {string|null} [id] DirectMessage id
             * @property {string|null} [senderId] DirectMessage senderId
             * @property {string|null} [receiverId] DirectMessage receiverId
             * @property {string|null} [messageText] DirectMessage messageText
             * @property {number|Long|null} [timestamp] DirectMessage timestamp
             */

            /**
             * Constructs a new DirectMessage.
             * @memberof elo.v3
             * @classdesc Represents a DirectMessage.
             * @implements IDirectMessage
             * @constructor
             * @param {elo.v3.IDirectMessage=} [properties] Properties to set
             */
            function DirectMessage(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DirectMessage id.
             * @member {string} id
             * @memberof elo.v3.DirectMessage
             * @instance
             */
            DirectMessage.prototype.id = "";

            /**
             * DirectMessage senderId.
             * @member {string} senderId
             * @memberof elo.v3.DirectMessage
             * @instance
             */
            DirectMessage.prototype.senderId = "";

            /**
             * DirectMessage receiverId.
             * @member {string} receiverId
             * @memberof elo.v3.DirectMessage
             * @instance
             */
            DirectMessage.prototype.receiverId = "";

            /**
             * DirectMessage messageText.
             * @member {string} messageText
             * @memberof elo.v3.DirectMessage
             * @instance
             */
            DirectMessage.prototype.messageText = "";

            /**
             * DirectMessage timestamp.
             * @member {number|Long} timestamp
             * @memberof elo.v3.DirectMessage
             * @instance
             */
            DirectMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new DirectMessage instance using the specified properties.
             * @function create
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {elo.v3.IDirectMessage=} [properties] Properties to set
             * @returns {elo.v3.DirectMessage} DirectMessage instance
             */
            DirectMessage.create = function create(properties) {
                return new DirectMessage(properties);
            };

            /**
             * Encodes the specified DirectMessage message. Does not implicitly {@link elo.v3.DirectMessage.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {elo.v3.IDirectMessage} message DirectMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DirectMessage.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.senderId);
                if (message.receiverId != null && Object.hasOwnProperty.call(message, "receiverId"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.receiverId);
                if (message.messageText != null && Object.hasOwnProperty.call(message, "messageText"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.messageText);
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.timestamp);
                return writer;
            };

            /**
             * Encodes the specified DirectMessage message, length delimited. Does not implicitly {@link elo.v3.DirectMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {elo.v3.IDirectMessage} message DirectMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DirectMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a DirectMessage message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.DirectMessage} DirectMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DirectMessage.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.DirectMessage();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.string();
                            break;
                        }
                    case 2: {
                            message.senderId = reader.string();
                            break;
                        }
                    case 3: {
                            message.receiverId = reader.string();
                            break;
                        }
                    case 4: {
                            message.messageText = reader.string();
                            break;
                        }
                    case 5: {
                            message.timestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DirectMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.DirectMessage} DirectMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DirectMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DirectMessage message.
             * @function verify
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DirectMessage.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                    if (!$util.isString(message.senderId))
                        return "senderId: string expected";
                if (message.receiverId != null && Object.hasOwnProperty.call(message, "receiverId"))
                    if (!$util.isString(message.receiverId))
                        return "receiverId: string expected";
                if (message.messageText != null && Object.hasOwnProperty.call(message, "messageText"))
                    if (!$util.isString(message.messageText))
                        return "messageText: string expected";
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a DirectMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.DirectMessage} DirectMessage
             */
            DirectMessage.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.DirectMessage)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.DirectMessage: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.DirectMessage();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.senderId != null)
                    message.senderId = String(object.senderId);
                if (object.receiverId != null)
                    message.receiverId = String(object.receiverId);
                if (object.messageText != null)
                    message.messageText = String(object.messageText);
                if (object.timestamp != null)
                    if ($util.Long)
                        message.timestamp = $util.Long.fromValue(object.timestamp, false);
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a DirectMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {elo.v3.DirectMessage} message DirectMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DirectMessage.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.senderId = "";
                    object.receiverId = "";
                    object.messageText = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    object.id = message.id;
                if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                    object.senderId = message.senderId;
                if (message.receiverId != null && Object.hasOwnProperty.call(message, "receiverId"))
                    object.receiverId = message.receiverId;
                if (message.messageText != null && Object.hasOwnProperty.call(message, "messageText"))
                    object.messageText = message.messageText;
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.timestamp = typeof message.timestamp === "number" ? BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this DirectMessage to JSON.
             * @function toJSON
             * @memberof elo.v3.DirectMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DirectMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DirectMessage
             * @function getTypeUrl
             * @memberof elo.v3.DirectMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DirectMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.DirectMessage";
            };

            return DirectMessage;
        })();

        v3.ServerGameStateUpdate = (function() {

            /**
             * Properties of a ServerGameStateUpdate.
             * @memberof elo.v3
             * @interface IServerGameStateUpdate
             * @property {string|null} [roomId] ServerGameStateUpdate roomId
             * @property {elo.v3.MatchState|null} [state] ServerGameStateUpdate state
             * @property {number|null} [timeRemainingSeconds] ServerGameStateUpdate timeRemainingSeconds
             * @property {elo.v3.RoomType|null} [roomType] ServerGameStateUpdate roomType
             * @property {string|null} [privateRoomCode] ServerGameStateUpdate privateRoomCode
             * @property {elo.v3.ServerGameStateUpdate.IPlayerProgress|null} [playerOne] ServerGameStateUpdate playerOne
             * @property {elo.v3.ServerGameStateUpdate.IPlayerProgress|null} [playerTwo] ServerGameStateUpdate playerTwo
             * @property {string|null} [nextQuestionText] ServerGameStateUpdate nextQuestionText
             * @property {string|null} [winnerId] ServerGameStateUpdate winnerId
             * @property {number|null} [playerOneEloChange] ServerGameStateUpdate playerOneEloChange
             * @property {number|null} [playerTwoEloChange] ServerGameStateUpdate playerTwoEloChange
             * @property {number|null} [playerOneXpChange] ServerGameStateUpdate playerOneXpChange
             * @property {number|null} [playerTwoXpChange] ServerGameStateUpdate playerTwoXpChange
             * @property {elo.v3.ITournamentBracketUpdate|null} [bracketUpdate] ServerGameStateUpdate bracketUpdate
             * @property {elo.v3.ISpectatorEmojiBurst|null} [emojiBurst] ServerGameStateUpdate emojiBurst
             * @property {string|null} [activeReconnectionToken] ServerGameStateUpdate activeReconnectionToken
             * @property {elo.v3.RegionZone|null} [currentNodeZone] ServerGameStateUpdate currentNodeZone
             * @property {elo.v3.IRegionalHandshakeOverride|null} [standbyOverride] ServerGameStateUpdate standbyOverride
             * @property {elo.v3.IPresenceUpdate|null} [presenceUpdate] ServerGameStateUpdate presenceUpdate
             * @property {elo.v3.IRelationshipUpdate|null} [relationshipUpdate] ServerGameStateUpdate relationshipUpdate
             * @property {elo.v3.IDirectMessage|null} [directMessage] ServerGameStateUpdate directMessage
             * @property {string|null} [receiveMatchChat] ServerGameStateUpdate receiveMatchChat
             * @property {elo.v3.IMatchReadySignal|null} [matchReady] ServerGameStateUpdate matchReady
             */

            /**
             * Constructs a new ServerGameStateUpdate.
             * @memberof elo.v3
             * @classdesc Represents a ServerGameStateUpdate.
             * @implements IServerGameStateUpdate
             * @constructor
             * @param {elo.v3.IServerGameStateUpdate=} [properties] Properties to set
             */
            function ServerGameStateUpdate(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ServerGameStateUpdate roomId.
             * @member {string} roomId
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.roomId = "";

            /**
             * ServerGameStateUpdate state.
             * @member {elo.v3.MatchState} state
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.state = 0;

            /**
             * ServerGameStateUpdate timeRemainingSeconds.
             * @member {number} timeRemainingSeconds
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.timeRemainingSeconds = 0;

            /**
             * ServerGameStateUpdate roomType.
             * @member {elo.v3.RoomType} roomType
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.roomType = 0;

            /**
             * ServerGameStateUpdate privateRoomCode.
             * @member {string} privateRoomCode
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.privateRoomCode = "";

            /**
             * ServerGameStateUpdate playerOne.
             * @member {elo.v3.ServerGameStateUpdate.IPlayerProgress|null|undefined} playerOne
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerOne = null;

            /**
             * ServerGameStateUpdate playerTwo.
             * @member {elo.v3.ServerGameStateUpdate.IPlayerProgress|null|undefined} playerTwo
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerTwo = null;

            /**
             * ServerGameStateUpdate nextQuestionText.
             * @member {string} nextQuestionText
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.nextQuestionText = "";

            /**
             * ServerGameStateUpdate winnerId.
             * @member {string} winnerId
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.winnerId = "";

            /**
             * ServerGameStateUpdate playerOneEloChange.
             * @member {number} playerOneEloChange
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerOneEloChange = 0;

            /**
             * ServerGameStateUpdate playerTwoEloChange.
             * @member {number} playerTwoEloChange
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerTwoEloChange = 0;

            /**
             * ServerGameStateUpdate playerOneXpChange.
             * @member {number} playerOneXpChange
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerOneXpChange = 0;

            /**
             * ServerGameStateUpdate playerTwoXpChange.
             * @member {number} playerTwoXpChange
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerTwoXpChange = 0;

            /**
             * ServerGameStateUpdate bracketUpdate.
             * @member {elo.v3.ITournamentBracketUpdate|null|undefined} bracketUpdate
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.bracketUpdate = null;

            /**
             * ServerGameStateUpdate emojiBurst.
             * @member {elo.v3.ISpectatorEmojiBurst|null|undefined} emojiBurst
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.emojiBurst = null;

            /**
             * ServerGameStateUpdate activeReconnectionToken.
             * @member {string} activeReconnectionToken
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.activeReconnectionToken = "";

            /**
             * ServerGameStateUpdate currentNodeZone.
             * @member {elo.v3.RegionZone} currentNodeZone
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.currentNodeZone = 0;

            /**
             * ServerGameStateUpdate standbyOverride.
             * @member {elo.v3.IRegionalHandshakeOverride|null|undefined} standbyOverride
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.standbyOverride = null;

            /**
             * ServerGameStateUpdate presenceUpdate.
             * @member {elo.v3.IPresenceUpdate|null|undefined} presenceUpdate
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.presenceUpdate = null;

            /**
             * ServerGameStateUpdate relationshipUpdate.
             * @member {elo.v3.IRelationshipUpdate|null|undefined} relationshipUpdate
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.relationshipUpdate = null;

            /**
             * ServerGameStateUpdate directMessage.
             * @member {elo.v3.IDirectMessage|null|undefined} directMessage
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.directMessage = null;

            /**
             * ServerGameStateUpdate receiveMatchChat.
             * @member {string} receiveMatchChat
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.receiveMatchChat = "";

            /**
             * ServerGameStateUpdate matchReady.
             * @member {elo.v3.IMatchReadySignal|null|undefined} matchReady
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.matchReady = null;

            /**
             * Creates a new ServerGameStateUpdate instance using the specified properties.
             * @function create
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {elo.v3.IServerGameStateUpdate=} [properties] Properties to set
             * @returns {elo.v3.ServerGameStateUpdate} ServerGameStateUpdate instance
             */
            ServerGameStateUpdate.create = function create(properties) {
                return new ServerGameStateUpdate(properties);
            };

            /**
             * Encodes the specified ServerGameStateUpdate message. Does not implicitly {@link elo.v3.ServerGameStateUpdate.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {elo.v3.IServerGameStateUpdate} message ServerGameStateUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerGameStateUpdate.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
                if (message.timeRemainingSeconds != null && Object.hasOwnProperty.call(message, "timeRemainingSeconds"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.timeRemainingSeconds);
                if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.roomType);
                if (message.privateRoomCode != null && Object.hasOwnProperty.call(message, "privateRoomCode"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.privateRoomCode);
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne"))
                    $root.elo.v3.ServerGameStateUpdate.PlayerProgress.encode(message.playerOne, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo"))
                    $root.elo.v3.ServerGameStateUpdate.PlayerProgress.encode(message.playerTwo, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
                if (message.nextQuestionText != null && Object.hasOwnProperty.call(message, "nextQuestionText"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.nextQuestionText);
                if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.winnerId);
                if (message.playerOneEloChange != null && Object.hasOwnProperty.call(message, "playerOneEloChange"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.playerOneEloChange);
                if (message.playerTwoEloChange != null && Object.hasOwnProperty.call(message, "playerTwoEloChange"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.playerTwoEloChange);
                if (message.playerOneXpChange != null && Object.hasOwnProperty.call(message, "playerOneXpChange"))
                    writer.uint32(/* id 12, wireType 0 =*/96).int32(message.playerOneXpChange);
                if (message.playerTwoXpChange != null && Object.hasOwnProperty.call(message, "playerTwoXpChange"))
                    writer.uint32(/* id 13, wireType 0 =*/104).int32(message.playerTwoXpChange);
                if (message.bracketUpdate != null && Object.hasOwnProperty.call(message, "bracketUpdate"))
                    $root.elo.v3.TournamentBracketUpdate.encode(message.bracketUpdate, writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
                if (message.emojiBurst != null && Object.hasOwnProperty.call(message, "emojiBurst"))
                    $root.elo.v3.SpectatorEmojiBurst.encode(message.emojiBurst, writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
                if (message.activeReconnectionToken != null && Object.hasOwnProperty.call(message, "activeReconnectionToken"))
                    writer.uint32(/* id 16, wireType 2 =*/130).string(message.activeReconnectionToken);
                if (message.currentNodeZone != null && Object.hasOwnProperty.call(message, "currentNodeZone"))
                    writer.uint32(/* id 17, wireType 0 =*/136).int32(message.currentNodeZone);
                if (message.standbyOverride != null && Object.hasOwnProperty.call(message, "standbyOverride"))
                    $root.elo.v3.RegionalHandshakeOverride.encode(message.standbyOverride, writer.uint32(/* id 18, wireType 2 =*/146).fork(), q + 1).ldelim();
                if (message.presenceUpdate != null && Object.hasOwnProperty.call(message, "presenceUpdate"))
                    $root.elo.v3.PresenceUpdate.encode(message.presenceUpdate, writer.uint32(/* id 19, wireType 2 =*/154).fork(), q + 1).ldelim();
                if (message.relationshipUpdate != null && Object.hasOwnProperty.call(message, "relationshipUpdate"))
                    $root.elo.v3.RelationshipUpdate.encode(message.relationshipUpdate, writer.uint32(/* id 20, wireType 2 =*/162).fork(), q + 1).ldelim();
                if (message.directMessage != null && Object.hasOwnProperty.call(message, "directMessage"))
                    $root.elo.v3.DirectMessage.encode(message.directMessage, writer.uint32(/* id 21, wireType 2 =*/170).fork(), q + 1).ldelim();
                if (message.receiveMatchChat != null && Object.hasOwnProperty.call(message, "receiveMatchChat"))
                    writer.uint32(/* id 22, wireType 2 =*/178).string(message.receiveMatchChat);
                if (message.matchReady != null && Object.hasOwnProperty.call(message, "matchReady"))
                    $root.elo.v3.MatchReadySignal.encode(message.matchReady, writer.uint32(/* id 23, wireType 2 =*/186).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ServerGameStateUpdate message, length delimited. Does not implicitly {@link elo.v3.ServerGameStateUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {elo.v3.IServerGameStateUpdate} message ServerGameStateUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerGameStateUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ServerGameStateUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.ServerGameStateUpdate} ServerGameStateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerGameStateUpdate.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.ServerGameStateUpdate();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.roomId = reader.string();
                            break;
                        }
                    case 2: {
                            message.state = reader.int32();
                            break;
                        }
                    case 3: {
                            message.timeRemainingSeconds = reader.int32();
                            break;
                        }
                    case 4: {
                            message.roomType = reader.int32();
                            break;
                        }
                    case 5: {
                            message.privateRoomCode = reader.string();
                            break;
                        }
                    case 6: {
                            message.playerOne = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 7: {
                            message.playerTwo = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 8: {
                            message.nextQuestionText = reader.string();
                            break;
                        }
                    case 9: {
                            message.winnerId = reader.string();
                            break;
                        }
                    case 10: {
                            message.playerOneEloChange = reader.int32();
                            break;
                        }
                    case 11: {
                            message.playerTwoEloChange = reader.int32();
                            break;
                        }
                    case 12: {
                            message.playerOneXpChange = reader.int32();
                            break;
                        }
                    case 13: {
                            message.playerTwoXpChange = reader.int32();
                            break;
                        }
                    case 14: {
                            message.bracketUpdate = $root.elo.v3.TournamentBracketUpdate.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 15: {
                            message.emojiBurst = $root.elo.v3.SpectatorEmojiBurst.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 16: {
                            message.activeReconnectionToken = reader.string();
                            break;
                        }
                    case 17: {
                            message.currentNodeZone = reader.int32();
                            break;
                        }
                    case 18: {
                            message.standbyOverride = $root.elo.v3.RegionalHandshakeOverride.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 19: {
                            message.presenceUpdate = $root.elo.v3.PresenceUpdate.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 20: {
                            message.relationshipUpdate = $root.elo.v3.RelationshipUpdate.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 21: {
                            message.directMessage = $root.elo.v3.DirectMessage.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 22: {
                            message.receiveMatchChat = reader.string();
                            break;
                        }
                    case 23: {
                            message.matchReady = $root.elo.v3.MatchReadySignal.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ServerGameStateUpdate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.ServerGameStateUpdate} ServerGameStateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ServerGameStateUpdate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ServerGameStateUpdate message.
             * @function verify
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ServerGameStateUpdate.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    if (!$util.isString(message.roomId))
                        return "roomId: string expected";
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.timeRemainingSeconds != null && Object.hasOwnProperty.call(message, "timeRemainingSeconds"))
                    if (!$util.isInteger(message.timeRemainingSeconds))
                        return "timeRemainingSeconds: integer expected";
                if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                    switch (message.roomType) {
                    default:
                        return "roomType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.privateRoomCode != null && Object.hasOwnProperty.call(message, "privateRoomCode"))
                    if (!$util.isString(message.privateRoomCode))
                        return "privateRoomCode: string expected";
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne")) {
                    let error = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.verify(message.playerOne, long + 1);
                    if (error)
                        return "playerOne." + error;
                }
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo")) {
                    let error = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.verify(message.playerTwo, long + 1);
                    if (error)
                        return "playerTwo." + error;
                }
                if (message.nextQuestionText != null && Object.hasOwnProperty.call(message, "nextQuestionText"))
                    if (!$util.isString(message.nextQuestionText))
                        return "nextQuestionText: string expected";
                if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                    if (!$util.isString(message.winnerId))
                        return "winnerId: string expected";
                if (message.playerOneEloChange != null && Object.hasOwnProperty.call(message, "playerOneEloChange"))
                    if (!$util.isInteger(message.playerOneEloChange))
                        return "playerOneEloChange: integer expected";
                if (message.playerTwoEloChange != null && Object.hasOwnProperty.call(message, "playerTwoEloChange"))
                    if (!$util.isInteger(message.playerTwoEloChange))
                        return "playerTwoEloChange: integer expected";
                if (message.playerOneXpChange != null && Object.hasOwnProperty.call(message, "playerOneXpChange"))
                    if (!$util.isInteger(message.playerOneXpChange))
                        return "playerOneXpChange: integer expected";
                if (message.playerTwoXpChange != null && Object.hasOwnProperty.call(message, "playerTwoXpChange"))
                    if (!$util.isInteger(message.playerTwoXpChange))
                        return "playerTwoXpChange: integer expected";
                if (message.bracketUpdate != null && Object.hasOwnProperty.call(message, "bracketUpdate")) {
                    let error = $root.elo.v3.TournamentBracketUpdate.verify(message.bracketUpdate, long + 1);
                    if (error)
                        return "bracketUpdate." + error;
                }
                if (message.emojiBurst != null && Object.hasOwnProperty.call(message, "emojiBurst")) {
                    let error = $root.elo.v3.SpectatorEmojiBurst.verify(message.emojiBurst, long + 1);
                    if (error)
                        return "emojiBurst." + error;
                }
                if (message.activeReconnectionToken != null && Object.hasOwnProperty.call(message, "activeReconnectionToken"))
                    if (!$util.isString(message.activeReconnectionToken))
                        return "activeReconnectionToken: string expected";
                if (message.currentNodeZone != null && Object.hasOwnProperty.call(message, "currentNodeZone"))
                    switch (message.currentNodeZone) {
                    default:
                        return "currentNodeZone: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.standbyOverride != null && Object.hasOwnProperty.call(message, "standbyOverride")) {
                    let error = $root.elo.v3.RegionalHandshakeOverride.verify(message.standbyOverride, long + 1);
                    if (error)
                        return "standbyOverride." + error;
                }
                if (message.presenceUpdate != null && Object.hasOwnProperty.call(message, "presenceUpdate")) {
                    let error = $root.elo.v3.PresenceUpdate.verify(message.presenceUpdate, long + 1);
                    if (error)
                        return "presenceUpdate." + error;
                }
                if (message.relationshipUpdate != null && Object.hasOwnProperty.call(message, "relationshipUpdate")) {
                    let error = $root.elo.v3.RelationshipUpdate.verify(message.relationshipUpdate, long + 1);
                    if (error)
                        return "relationshipUpdate." + error;
                }
                if (message.directMessage != null && Object.hasOwnProperty.call(message, "directMessage")) {
                    let error = $root.elo.v3.DirectMessage.verify(message.directMessage, long + 1);
                    if (error)
                        return "directMessage." + error;
                }
                if (message.receiveMatchChat != null && Object.hasOwnProperty.call(message, "receiveMatchChat"))
                    if (!$util.isString(message.receiveMatchChat))
                        return "receiveMatchChat: string expected";
                if (message.matchReady != null && Object.hasOwnProperty.call(message, "matchReady")) {
                    let error = $root.elo.v3.MatchReadySignal.verify(message.matchReady, long + 1);
                    if (error)
                        return "matchReady." + error;
                }
                return null;
            };

            /**
             * Creates a ServerGameStateUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.ServerGameStateUpdate} ServerGameStateUpdate
             */
            ServerGameStateUpdate.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.ServerGameStateUpdate)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.ServerGameStateUpdate: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.ServerGameStateUpdate();
                if (object.roomId != null)
                    message.roomId = String(object.roomId);
                switch (object.state) {
                default:
                    if (typeof object.state === "number") {
                        message.state = object.state;
                        break;
                    }
                    break;
                case "MATCH_STATE_UNSPECIFIED":
                case 0:
                    message.state = 0;
                    break;
                case "MATCH_STATE_COUNTDOWN":
                case 1:
                    message.state = 1;
                    break;
                case "MATCH_STATE_ACTIVE":
                case 2:
                    message.state = 2;
                    break;
                case "MATCH_STATE_PAUSED_DISCONNECT":
                case 3:
                    message.state = 3;
                    break;
                case "MATCH_STATE_FINISHED":
                case 4:
                    message.state = 4;
                    break;
                }
                if (object.timeRemainingSeconds != null)
                    message.timeRemainingSeconds = object.timeRemainingSeconds | 0;
                switch (object.roomType) {
                default:
                    if (typeof object.roomType === "number") {
                        message.roomType = object.roomType;
                        break;
                    }
                    break;
                case "ROOM_TYPE_RANKED":
                case 0:
                    message.roomType = 0;
                    break;
                case "ROOM_TYPE_PRIVATE":
                case 1:
                    message.roomType = 1;
                    break;
                case "ROOM_TYPE_TOURNAMENT":
                case 2:
                    message.roomType = 2;
                    break;
                }
                if (object.privateRoomCode != null)
                    message.privateRoomCode = String(object.privateRoomCode);
                if (object.playerOne != null) {
                    if (!$util.isObject(object.playerOne))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.playerOne: object expected");
                    message.playerOne = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.fromObject(object.playerOne, long + 1);
                }
                if (object.playerTwo != null) {
                    if (!$util.isObject(object.playerTwo))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.playerTwo: object expected");
                    message.playerTwo = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.fromObject(object.playerTwo, long + 1);
                }
                if (object.nextQuestionText != null)
                    message.nextQuestionText = String(object.nextQuestionText);
                if (object.winnerId != null)
                    message.winnerId = String(object.winnerId);
                if (object.playerOneEloChange != null)
                    message.playerOneEloChange = object.playerOneEloChange | 0;
                if (object.playerTwoEloChange != null)
                    message.playerTwoEloChange = object.playerTwoEloChange | 0;
                if (object.playerOneXpChange != null)
                    message.playerOneXpChange = object.playerOneXpChange | 0;
                if (object.playerTwoXpChange != null)
                    message.playerTwoXpChange = object.playerTwoXpChange | 0;
                if (object.bracketUpdate != null) {
                    if (!$util.isObject(object.bracketUpdate))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.bracketUpdate: object expected");
                    message.bracketUpdate = $root.elo.v3.TournamentBracketUpdate.fromObject(object.bracketUpdate, long + 1);
                }
                if (object.emojiBurst != null) {
                    if (!$util.isObject(object.emojiBurst))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.emojiBurst: object expected");
                    message.emojiBurst = $root.elo.v3.SpectatorEmojiBurst.fromObject(object.emojiBurst, long + 1);
                }
                if (object.activeReconnectionToken != null)
                    message.activeReconnectionToken = String(object.activeReconnectionToken);
                switch (object.currentNodeZone) {
                default:
                    if (typeof object.currentNodeZone === "number") {
                        message.currentNodeZone = object.currentNodeZone;
                        break;
                    }
                    break;
                case "REGION_ZONE_UNSPECIFIED":
                case 0:
                    message.currentNodeZone = 0;
                    break;
                case "REGION_ZONE_APAC_SOUTH":
                case 1:
                    message.currentNodeZone = 1;
                    break;
                case "REGION_ZONE_EU_CENTRAL":
                case 2:
                    message.currentNodeZone = 2;
                    break;
                case "REGION_ZONE_US_EAST":
                case 3:
                    message.currentNodeZone = 3;
                    break;
                case "REGION_ZONE_ME_CENTRAL":
                case 4:
                    message.currentNodeZone = 4;
                    break;
                }
                if (object.standbyOverride != null) {
                    if (!$util.isObject(object.standbyOverride))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.standbyOverride: object expected");
                    message.standbyOverride = $root.elo.v3.RegionalHandshakeOverride.fromObject(object.standbyOverride, long + 1);
                }
                if (object.presenceUpdate != null) {
                    if (!$util.isObject(object.presenceUpdate))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.presenceUpdate: object expected");
                    message.presenceUpdate = $root.elo.v3.PresenceUpdate.fromObject(object.presenceUpdate, long + 1);
                }
                if (object.relationshipUpdate != null) {
                    if (!$util.isObject(object.relationshipUpdate))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.relationshipUpdate: object expected");
                    message.relationshipUpdate = $root.elo.v3.RelationshipUpdate.fromObject(object.relationshipUpdate, long + 1);
                }
                if (object.directMessage != null) {
                    if (!$util.isObject(object.directMessage))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.directMessage: object expected");
                    message.directMessage = $root.elo.v3.DirectMessage.fromObject(object.directMessage, long + 1);
                }
                if (object.receiveMatchChat != null)
                    message.receiveMatchChat = String(object.receiveMatchChat);
                if (object.matchReady != null) {
                    if (!$util.isObject(object.matchReady))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.matchReady: object expected");
                    message.matchReady = $root.elo.v3.MatchReadySignal.fromObject(object.matchReady, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a ServerGameStateUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {elo.v3.ServerGameStateUpdate} message ServerGameStateUpdate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ServerGameStateUpdate.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.roomId = "";
                    object.state = options.enums === String ? "MATCH_STATE_UNSPECIFIED" : 0;
                    object.timeRemainingSeconds = 0;
                    object.roomType = options.enums === String ? "ROOM_TYPE_RANKED" : 0;
                    object.privateRoomCode = "";
                    object.playerOne = null;
                    object.playerTwo = null;
                    object.nextQuestionText = "";
                    object.winnerId = "";
                    object.playerOneEloChange = 0;
                    object.playerTwoEloChange = 0;
                    object.playerOneXpChange = 0;
                    object.playerTwoXpChange = 0;
                    object.bracketUpdate = null;
                    object.emojiBurst = null;
                    object.activeReconnectionToken = "";
                    object.currentNodeZone = options.enums === String ? "REGION_ZONE_UNSPECIFIED" : 0;
                    object.standbyOverride = null;
                    object.presenceUpdate = null;
                    object.relationshipUpdate = null;
                    object.directMessage = null;
                    object.receiveMatchChat = "";
                    object.matchReady = null;
                }
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    object.roomId = message.roomId;
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    object.state = options.enums === String ? $root.elo.v3.MatchState[message.state] === undefined ? message.state : $root.elo.v3.MatchState[message.state] : message.state;
                if (message.timeRemainingSeconds != null && Object.hasOwnProperty.call(message, "timeRemainingSeconds"))
                    object.timeRemainingSeconds = message.timeRemainingSeconds;
                if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                    object.roomType = options.enums === String ? $root.elo.v3.RoomType[message.roomType] === undefined ? message.roomType : $root.elo.v3.RoomType[message.roomType] : message.roomType;
                if (message.privateRoomCode != null && Object.hasOwnProperty.call(message, "privateRoomCode"))
                    object.privateRoomCode = message.privateRoomCode;
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne"))
                    object.playerOne = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.toObject(message.playerOne, options, q + 1);
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo"))
                    object.playerTwo = $root.elo.v3.ServerGameStateUpdate.PlayerProgress.toObject(message.playerTwo, options, q + 1);
                if (message.nextQuestionText != null && Object.hasOwnProperty.call(message, "nextQuestionText"))
                    object.nextQuestionText = message.nextQuestionText;
                if (message.winnerId != null && Object.hasOwnProperty.call(message, "winnerId"))
                    object.winnerId = message.winnerId;
                if (message.playerOneEloChange != null && Object.hasOwnProperty.call(message, "playerOneEloChange"))
                    object.playerOneEloChange = message.playerOneEloChange;
                if (message.playerTwoEloChange != null && Object.hasOwnProperty.call(message, "playerTwoEloChange"))
                    object.playerTwoEloChange = message.playerTwoEloChange;
                if (message.playerOneXpChange != null && Object.hasOwnProperty.call(message, "playerOneXpChange"))
                    object.playerOneXpChange = message.playerOneXpChange;
                if (message.playerTwoXpChange != null && Object.hasOwnProperty.call(message, "playerTwoXpChange"))
                    object.playerTwoXpChange = message.playerTwoXpChange;
                if (message.bracketUpdate != null && Object.hasOwnProperty.call(message, "bracketUpdate"))
                    object.bracketUpdate = $root.elo.v3.TournamentBracketUpdate.toObject(message.bracketUpdate, options, q + 1);
                if (message.emojiBurst != null && Object.hasOwnProperty.call(message, "emojiBurst"))
                    object.emojiBurst = $root.elo.v3.SpectatorEmojiBurst.toObject(message.emojiBurst, options, q + 1);
                if (message.activeReconnectionToken != null && Object.hasOwnProperty.call(message, "activeReconnectionToken"))
                    object.activeReconnectionToken = message.activeReconnectionToken;
                if (message.currentNodeZone != null && Object.hasOwnProperty.call(message, "currentNodeZone"))
                    object.currentNodeZone = options.enums === String ? $root.elo.v3.RegionZone[message.currentNodeZone] === undefined ? message.currentNodeZone : $root.elo.v3.RegionZone[message.currentNodeZone] : message.currentNodeZone;
                if (message.standbyOverride != null && Object.hasOwnProperty.call(message, "standbyOverride"))
                    object.standbyOverride = $root.elo.v3.RegionalHandshakeOverride.toObject(message.standbyOverride, options, q + 1);
                if (message.presenceUpdate != null && Object.hasOwnProperty.call(message, "presenceUpdate"))
                    object.presenceUpdate = $root.elo.v3.PresenceUpdate.toObject(message.presenceUpdate, options, q + 1);
                if (message.relationshipUpdate != null && Object.hasOwnProperty.call(message, "relationshipUpdate"))
                    object.relationshipUpdate = $root.elo.v3.RelationshipUpdate.toObject(message.relationshipUpdate, options, q + 1);
                if (message.directMessage != null && Object.hasOwnProperty.call(message, "directMessage"))
                    object.directMessage = $root.elo.v3.DirectMessage.toObject(message.directMessage, options, q + 1);
                if (message.receiveMatchChat != null && Object.hasOwnProperty.call(message, "receiveMatchChat"))
                    object.receiveMatchChat = message.receiveMatchChat;
                if (message.matchReady != null && Object.hasOwnProperty.call(message, "matchReady"))
                    object.matchReady = $root.elo.v3.MatchReadySignal.toObject(message.matchReady, options, q + 1);
                return object;
            };

            /**
             * Converts this ServerGameStateUpdate to JSON.
             * @function toJSON
             * @memberof elo.v3.ServerGameStateUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerGameStateUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ServerGameStateUpdate
             * @function getTypeUrl
             * @memberof elo.v3.ServerGameStateUpdate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ServerGameStateUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.ServerGameStateUpdate";
            };

            ServerGameStateUpdate.PlayerProgress = (function() {

                /**
                 * Properties of a PlayerProgress.
                 * @memberof elo.v3.ServerGameStateUpdate
                 * @interface IPlayerProgress
                 * @property {string|null} [playerId] PlayerProgress playerId
                 * @property {string|null} [username] PlayerProgress username
                 * @property {number|null} [currentScore] PlayerProgress currentScore
                 * @property {number|null} [currentStreak] PlayerProgress currentStreak
                 * @property {string|null} [ghostInput] PlayerProgress ghostInput
                 * @property {number|null} [elo] PlayerProgress elo
                 * @property {string|null} [activeTitle] PlayerProgress activeTitle
                 * @property {number|null} [level] PlayerProgress level
                 */

                /**
                 * Constructs a new PlayerProgress.
                 * @memberof elo.v3.ServerGameStateUpdate
                 * @classdesc Represents a PlayerProgress.
                 * @implements IPlayerProgress
                 * @constructor
                 * @param {elo.v3.ServerGameStateUpdate.IPlayerProgress=} [properties] Properties to set
                 */
                function PlayerProgress(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PlayerProgress playerId.
                 * @member {string} playerId
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.playerId = "";

                /**
                 * PlayerProgress username.
                 * @member {string} username
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.username = "";

                /**
                 * PlayerProgress currentScore.
                 * @member {number} currentScore
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.currentScore = 0;

                /**
                 * PlayerProgress currentStreak.
                 * @member {number} currentStreak
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.currentStreak = 0;

                /**
                 * PlayerProgress ghostInput.
                 * @member {string} ghostInput
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.ghostInput = "";

                /**
                 * PlayerProgress elo.
                 * @member {number} elo
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.elo = 0;

                /**
                 * PlayerProgress activeTitle.
                 * @member {string} activeTitle
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.activeTitle = "";

                /**
                 * PlayerProgress level.
                 * @member {number} level
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.level = 0;

                /**
                 * Creates a new PlayerProgress instance using the specified properties.
                 * @function create
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v3.ServerGameStateUpdate.IPlayerProgress=} [properties] Properties to set
                 * @returns {elo.v3.ServerGameStateUpdate.PlayerProgress} PlayerProgress instance
                 */
                PlayerProgress.create = function create(properties) {
                    return new PlayerProgress(properties);
                };

                /**
                 * Encodes the specified PlayerProgress message. Does not implicitly {@link elo.v3.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @function encode
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v3.ServerGameStateUpdate.IPlayerProgress} message PlayerProgress message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PlayerProgress.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
                    if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                    if (message.currentScore != null && Object.hasOwnProperty.call(message, "currentScore"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.currentScore);
                    if (message.currentStreak != null && Object.hasOwnProperty.call(message, "currentStreak"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currentStreak);
                    if (message.ghostInput != null && Object.hasOwnProperty.call(message, "ghostInput"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.ghostInput);
                    if (message.elo != null && Object.hasOwnProperty.call(message, "elo"))
                        writer.uint32(/* id 6, wireType 0 =*/48).int32(message.elo);
                    if (message.activeTitle != null && Object.hasOwnProperty.call(message, "activeTitle"))
                        writer.uint32(/* id 7, wireType 2 =*/58).string(message.activeTitle);
                    if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                        writer.uint32(/* id 8, wireType 0 =*/64).int32(message.level);
                    return writer;
                };

                /**
                 * Encodes the specified PlayerProgress message, length delimited. Does not implicitly {@link elo.v3.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v3.ServerGameStateUpdate.IPlayerProgress} message PlayerProgress message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PlayerProgress.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a PlayerProgress message from the specified reader or buffer.
                 * @function decode
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {elo.v3.ServerGameStateUpdate.PlayerProgress} PlayerProgress
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PlayerProgress.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.ServerGameStateUpdate.PlayerProgress();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.playerId = reader.string();
                                break;
                            }
                        case 2: {
                                message.username = reader.string();
                                break;
                            }
                        case 3: {
                                message.currentScore = reader.int32();
                                break;
                            }
                        case 4: {
                                message.currentStreak = reader.int32();
                                break;
                            }
                        case 5: {
                                message.ghostInput = reader.string();
                                break;
                            }
                        case 6: {
                                message.elo = reader.int32();
                                break;
                            }
                        case 7: {
                                message.activeTitle = reader.string();
                                break;
                            }
                        case 8: {
                                message.level = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PlayerProgress message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {elo.v3.ServerGameStateUpdate.PlayerProgress} PlayerProgress
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PlayerProgress.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PlayerProgress message.
                 * @function verify
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PlayerProgress.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                        if (!$util.isString(message.playerId))
                            return "playerId: string expected";
                    if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                        if (!$util.isString(message.username))
                            return "username: string expected";
                    if (message.currentScore != null && Object.hasOwnProperty.call(message, "currentScore"))
                        if (!$util.isInteger(message.currentScore))
                            return "currentScore: integer expected";
                    if (message.currentStreak != null && Object.hasOwnProperty.call(message, "currentStreak"))
                        if (!$util.isInteger(message.currentStreak))
                            return "currentStreak: integer expected";
                    if (message.ghostInput != null && Object.hasOwnProperty.call(message, "ghostInput"))
                        if (!$util.isString(message.ghostInput))
                            return "ghostInput: string expected";
                    if (message.elo != null && Object.hasOwnProperty.call(message, "elo"))
                        if (!$util.isInteger(message.elo))
                            return "elo: integer expected";
                    if (message.activeTitle != null && Object.hasOwnProperty.call(message, "activeTitle"))
                        if (!$util.isString(message.activeTitle))
                            return "activeTitle: string expected";
                    if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                        if (!$util.isInteger(message.level))
                            return "level: integer expected";
                    return null;
                };

                /**
                 * Creates a PlayerProgress message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {elo.v3.ServerGameStateUpdate.PlayerProgress} PlayerProgress
                 */
                PlayerProgress.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.elo.v3.ServerGameStateUpdate.PlayerProgress)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".elo.v3.ServerGameStateUpdate.PlayerProgress: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.elo.v3.ServerGameStateUpdate.PlayerProgress();
                    if (object.playerId != null)
                        message.playerId = String(object.playerId);
                    if (object.username != null)
                        message.username = String(object.username);
                    if (object.currentScore != null)
                        message.currentScore = object.currentScore | 0;
                    if (object.currentStreak != null)
                        message.currentStreak = object.currentStreak | 0;
                    if (object.ghostInput != null)
                        message.ghostInput = String(object.ghostInput);
                    if (object.elo != null)
                        message.elo = object.elo | 0;
                    if (object.activeTitle != null)
                        message.activeTitle = String(object.activeTitle);
                    if (object.level != null)
                        message.level = object.level | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a PlayerProgress message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v3.ServerGameStateUpdate.PlayerProgress} message PlayerProgress
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PlayerProgress.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.playerId = "";
                        object.username = "";
                        object.currentScore = 0;
                        object.currentStreak = 0;
                        object.ghostInput = "";
                        object.elo = 0;
                        object.activeTitle = "";
                        object.level = 0;
                    }
                    if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                        object.playerId = message.playerId;
                    if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                        object.username = message.username;
                    if (message.currentScore != null && Object.hasOwnProperty.call(message, "currentScore"))
                        object.currentScore = message.currentScore;
                    if (message.currentStreak != null && Object.hasOwnProperty.call(message, "currentStreak"))
                        object.currentStreak = message.currentStreak;
                    if (message.ghostInput != null && Object.hasOwnProperty.call(message, "ghostInput"))
                        object.ghostInput = message.ghostInput;
                    if (message.elo != null && Object.hasOwnProperty.call(message, "elo"))
                        object.elo = message.elo;
                    if (message.activeTitle != null && Object.hasOwnProperty.call(message, "activeTitle"))
                        object.activeTitle = message.activeTitle;
                    if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                        object.level = message.level;
                    return object;
                };

                /**
                 * Converts this PlayerProgress to JSON.
                 * @function toJSON
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PlayerProgress.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for PlayerProgress
                 * @function getTypeUrl
                 * @memberof elo.v3.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                PlayerProgress.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/elo.v3.ServerGameStateUpdate.PlayerProgress";
                };

                return PlayerProgress;
            })();

            return ServerGameStateUpdate;
        })();

        v3.MatchmakingTicket = (function() {

            /**
             * Properties of a MatchmakingTicket.
             * @memberof elo.v3
             * @interface IMatchmakingTicket
             * @property {string|null} [playerId] MatchmakingTicket playerId
             * @property {number|null} [currentElo] MatchmakingTicket currentElo
             * @property {string|null} [disciplineMode] MatchmakingTicket disciplineMode
             * @property {number|Long|null} [ticketTimestamp] MatchmakingTicket ticketTimestamp
             */

            /**
             * Constructs a new MatchmakingTicket.
             * @memberof elo.v3
             * @classdesc Represents a MatchmakingTicket.
             * @implements IMatchmakingTicket
             * @constructor
             * @param {elo.v3.IMatchmakingTicket=} [properties] Properties to set
             */
            function MatchmakingTicket(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MatchmakingTicket playerId.
             * @member {string} playerId
             * @memberof elo.v3.MatchmakingTicket
             * @instance
             */
            MatchmakingTicket.prototype.playerId = "";

            /**
             * MatchmakingTicket currentElo.
             * @member {number} currentElo
             * @memberof elo.v3.MatchmakingTicket
             * @instance
             */
            MatchmakingTicket.prototype.currentElo = 0;

            /**
             * MatchmakingTicket disciplineMode.
             * @member {string} disciplineMode
             * @memberof elo.v3.MatchmakingTicket
             * @instance
             */
            MatchmakingTicket.prototype.disciplineMode = "";

            /**
             * MatchmakingTicket ticketTimestamp.
             * @member {number|Long} ticketTimestamp
             * @memberof elo.v3.MatchmakingTicket
             * @instance
             */
            MatchmakingTicket.prototype.ticketTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new MatchmakingTicket instance using the specified properties.
             * @function create
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {elo.v3.IMatchmakingTicket=} [properties] Properties to set
             * @returns {elo.v3.MatchmakingTicket} MatchmakingTicket instance
             */
            MatchmakingTicket.create = function create(properties) {
                return new MatchmakingTicket(properties);
            };

            /**
             * Encodes the specified MatchmakingTicket message. Does not implicitly {@link elo.v3.MatchmakingTicket.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {elo.v3.IMatchmakingTicket} message MatchmakingTicket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchmakingTicket.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
                if (message.currentElo != null && Object.hasOwnProperty.call(message, "currentElo"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.currentElo);
                if (message.disciplineMode != null && Object.hasOwnProperty.call(message, "disciplineMode"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.disciplineMode);
                if (message.ticketTimestamp != null && Object.hasOwnProperty.call(message, "ticketTimestamp"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.ticketTimestamp);
                return writer;
            };

            /**
             * Encodes the specified MatchmakingTicket message, length delimited. Does not implicitly {@link elo.v3.MatchmakingTicket.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {elo.v3.IMatchmakingTicket} message MatchmakingTicket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchmakingTicket.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a MatchmakingTicket message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.MatchmakingTicket} MatchmakingTicket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchmakingTicket.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.MatchmakingTicket();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.playerId = reader.string();
                            break;
                        }
                    case 2: {
                            message.currentElo = reader.int32();
                            break;
                        }
                    case 3: {
                            message.disciplineMode = reader.string();
                            break;
                        }
                    case 4: {
                            message.ticketTimestamp = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MatchmakingTicket message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.MatchmakingTicket} MatchmakingTicket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchmakingTicket.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MatchmakingTicket message.
             * @function verify
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MatchmakingTicket.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    if (!$util.isString(message.playerId))
                        return "playerId: string expected";
                if (message.currentElo != null && Object.hasOwnProperty.call(message, "currentElo"))
                    if (!$util.isInteger(message.currentElo))
                        return "currentElo: integer expected";
                if (message.disciplineMode != null && Object.hasOwnProperty.call(message, "disciplineMode"))
                    if (!$util.isString(message.disciplineMode))
                        return "disciplineMode: string expected";
                if (message.ticketTimestamp != null && Object.hasOwnProperty.call(message, "ticketTimestamp"))
                    if (!$util.isInteger(message.ticketTimestamp) && !(message.ticketTimestamp && $util.isInteger(message.ticketTimestamp.low) && $util.isInteger(message.ticketTimestamp.high)))
                        return "ticketTimestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates a MatchmakingTicket message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.MatchmakingTicket} MatchmakingTicket
             */
            MatchmakingTicket.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.MatchmakingTicket)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.MatchmakingTicket: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.MatchmakingTicket();
                if (object.playerId != null)
                    message.playerId = String(object.playerId);
                if (object.currentElo != null)
                    message.currentElo = object.currentElo | 0;
                if (object.disciplineMode != null)
                    message.disciplineMode = String(object.disciplineMode);
                if (object.ticketTimestamp != null)
                    if ($util.Long)
                        message.ticketTimestamp = $util.Long.fromValue(object.ticketTimestamp, false);
                    else if (typeof object.ticketTimestamp === "string")
                        message.ticketTimestamp = parseInt(object.ticketTimestamp, 10);
                    else if (typeof object.ticketTimestamp === "number")
                        message.ticketTimestamp = object.ticketTimestamp;
                    else if (typeof object.ticketTimestamp === "object")
                        message.ticketTimestamp = new $util.LongBits(object.ticketTimestamp.low >>> 0, object.ticketTimestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a MatchmakingTicket message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {elo.v3.MatchmakingTicket} message MatchmakingTicket
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MatchmakingTicket.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.playerId = "";
                    object.currentElo = 0;
                    object.disciplineMode = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.ticketTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.ticketTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                    object.playerId = message.playerId;
                if (message.currentElo != null && Object.hasOwnProperty.call(message, "currentElo"))
                    object.currentElo = message.currentElo;
                if (message.disciplineMode != null && Object.hasOwnProperty.call(message, "disciplineMode"))
                    object.disciplineMode = message.disciplineMode;
                if (message.ticketTimestamp != null && Object.hasOwnProperty.call(message, "ticketTimestamp"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.ticketTimestamp = typeof message.ticketTimestamp === "number" ? BigInt(message.ticketTimestamp) : $util.Long.fromBits(message.ticketTimestamp.low >>> 0, message.ticketTimestamp.high >>> 0, false).toBigInt();
                    else if (typeof message.ticketTimestamp === "number")
                        object.ticketTimestamp = options.longs === String ? String(message.ticketTimestamp) : message.ticketTimestamp;
                    else
                        object.ticketTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.ticketTimestamp) : options.longs === Number ? new $util.LongBits(message.ticketTimestamp.low >>> 0, message.ticketTimestamp.high >>> 0).toNumber() : message.ticketTimestamp;
                return object;
            };

            /**
             * Converts this MatchmakingTicket to JSON.
             * @function toJSON
             * @memberof elo.v3.MatchmakingTicket
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MatchmakingTicket.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MatchmakingTicket
             * @function getTypeUrl
             * @memberof elo.v3.MatchmakingTicket
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MatchmakingTicket.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.MatchmakingTicket";
            };

            return MatchmakingTicket;
        })();

        v3.MatchReadySignal = (function() {

            /**
             * Properties of a MatchReadySignal.
             * @memberof elo.v3
             * @interface IMatchReadySignal
             * @property {string|null} [roomId] MatchReadySignal roomId
             * @property {string|null} [opponentName] MatchReadySignal opponentName
             * @property {string|null} [opponentAvatarUrl] MatchReadySignal opponentAvatarUrl
             * @property {number|null} [opponentElo] MatchReadySignal opponentElo
             * @property {string|null} [seed] MatchReadySignal seed
             */

            /**
             * Constructs a new MatchReadySignal.
             * @memberof elo.v3
             * @classdesc Represents a MatchReadySignal.
             * @implements IMatchReadySignal
             * @constructor
             * @param {elo.v3.IMatchReadySignal=} [properties] Properties to set
             */
            function MatchReadySignal(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MatchReadySignal roomId.
             * @member {string} roomId
             * @memberof elo.v3.MatchReadySignal
             * @instance
             */
            MatchReadySignal.prototype.roomId = "";

            /**
             * MatchReadySignal opponentName.
             * @member {string} opponentName
             * @memberof elo.v3.MatchReadySignal
             * @instance
             */
            MatchReadySignal.prototype.opponentName = "";

            /**
             * MatchReadySignal opponentAvatarUrl.
             * @member {string} opponentAvatarUrl
             * @memberof elo.v3.MatchReadySignal
             * @instance
             */
            MatchReadySignal.prototype.opponentAvatarUrl = "";

            /**
             * MatchReadySignal opponentElo.
             * @member {number} opponentElo
             * @memberof elo.v3.MatchReadySignal
             * @instance
             */
            MatchReadySignal.prototype.opponentElo = 0;

            /**
             * MatchReadySignal seed.
             * @member {string} seed
             * @memberof elo.v3.MatchReadySignal
             * @instance
             */
            MatchReadySignal.prototype.seed = "";

            /**
             * Creates a new MatchReadySignal instance using the specified properties.
             * @function create
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {elo.v3.IMatchReadySignal=} [properties] Properties to set
             * @returns {elo.v3.MatchReadySignal} MatchReadySignal instance
             */
            MatchReadySignal.create = function create(properties) {
                return new MatchReadySignal(properties);
            };

            /**
             * Encodes the specified MatchReadySignal message. Does not implicitly {@link elo.v3.MatchReadySignal.verify|verify} messages.
             * @function encode
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {elo.v3.IMatchReadySignal} message MatchReadySignal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchReadySignal.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.roomId);
                if (message.opponentName != null && Object.hasOwnProperty.call(message, "opponentName"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.opponentName);
                if (message.opponentAvatarUrl != null && Object.hasOwnProperty.call(message, "opponentAvatarUrl"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.opponentAvatarUrl);
                if (message.opponentElo != null && Object.hasOwnProperty.call(message, "opponentElo"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.opponentElo);
                if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.seed);
                return writer;
            };

            /**
             * Encodes the specified MatchReadySignal message, length delimited. Does not implicitly {@link elo.v3.MatchReadySignal.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {elo.v3.IMatchReadySignal} message MatchReadySignal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchReadySignal.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a MatchReadySignal message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v3.MatchReadySignal} MatchReadySignal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchReadySignal.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v3.MatchReadySignal();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.roomId = reader.string();
                            break;
                        }
                    case 2: {
                            message.opponentName = reader.string();
                            break;
                        }
                    case 3: {
                            message.opponentAvatarUrl = reader.string();
                            break;
                        }
                    case 4: {
                            message.opponentElo = reader.int32();
                            break;
                        }
                    case 5: {
                            message.seed = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MatchReadySignal message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v3.MatchReadySignal} MatchReadySignal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchReadySignal.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MatchReadySignal message.
             * @function verify
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MatchReadySignal.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    if (!$util.isString(message.roomId))
                        return "roomId: string expected";
                if (message.opponentName != null && Object.hasOwnProperty.call(message, "opponentName"))
                    if (!$util.isString(message.opponentName))
                        return "opponentName: string expected";
                if (message.opponentAvatarUrl != null && Object.hasOwnProperty.call(message, "opponentAvatarUrl"))
                    if (!$util.isString(message.opponentAvatarUrl))
                        return "opponentAvatarUrl: string expected";
                if (message.opponentElo != null && Object.hasOwnProperty.call(message, "opponentElo"))
                    if (!$util.isInteger(message.opponentElo))
                        return "opponentElo: integer expected";
                if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
                    if (!$util.isString(message.seed))
                        return "seed: string expected";
                return null;
            };

            /**
             * Creates a MatchReadySignal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v3.MatchReadySignal} MatchReadySignal
             */
            MatchReadySignal.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v3.MatchReadySignal)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v3.MatchReadySignal: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v3.MatchReadySignal();
                if (object.roomId != null)
                    message.roomId = String(object.roomId);
                if (object.opponentName != null)
                    message.opponentName = String(object.opponentName);
                if (object.opponentAvatarUrl != null)
                    message.opponentAvatarUrl = String(object.opponentAvatarUrl);
                if (object.opponentElo != null)
                    message.opponentElo = object.opponentElo | 0;
                if (object.seed != null)
                    message.seed = String(object.seed);
                return message;
            };

            /**
             * Creates a plain object from a MatchReadySignal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {elo.v3.MatchReadySignal} message MatchReadySignal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MatchReadySignal.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.roomId = "";
                    object.opponentName = "";
                    object.opponentAvatarUrl = "";
                    object.opponentElo = 0;
                    object.seed = "";
                }
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    object.roomId = message.roomId;
                if (message.opponentName != null && Object.hasOwnProperty.call(message, "opponentName"))
                    object.opponentName = message.opponentName;
                if (message.opponentAvatarUrl != null && Object.hasOwnProperty.call(message, "opponentAvatarUrl"))
                    object.opponentAvatarUrl = message.opponentAvatarUrl;
                if (message.opponentElo != null && Object.hasOwnProperty.call(message, "opponentElo"))
                    object.opponentElo = message.opponentElo;
                if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
                    object.seed = message.seed;
                return object;
            };

            /**
             * Converts this MatchReadySignal to JSON.
             * @function toJSON
             * @memberof elo.v3.MatchReadySignal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MatchReadySignal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MatchReadySignal
             * @function getTypeUrl
             * @memberof elo.v3.MatchReadySignal
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MatchReadySignal.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v3.MatchReadySignal";
            };

            return MatchReadySignal;
        })();

        return v3;
    })();

    return elo;
})();

export { $root as default };
