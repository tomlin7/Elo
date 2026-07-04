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

    elo.v2 = (function() {

        /**
         * Namespace v2.
         * @memberof elo
         * @namespace
         */
        const v2 = {};

        /**
         * MatchState enum.
         * @name elo.v2.MatchState
         * @enum {number}
         * @property {number} MATCH_STATE_UNSPECIFIED=0 MATCH_STATE_UNSPECIFIED value
         * @property {number} MATCH_STATE_COUNTDOWN=1 MATCH_STATE_COUNTDOWN value
         * @property {number} MATCH_STATE_ACTIVE=2 MATCH_STATE_ACTIVE value
         * @property {number} MATCH_STATE_PAUSED_DISCONNECT=3 MATCH_STATE_PAUSED_DISCONNECT value
         * @property {number} MATCH_STATE_FINISHED=4 MATCH_STATE_FINISHED value
         */
        v2.MatchState = (function() {
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
         * @name elo.v2.RoomType
         * @enum {number}
         * @property {number} ROOM_TYPE_RANKED=0 ROOM_TYPE_RANKED value
         * @property {number} ROOM_TYPE_PRIVATE=1 ROOM_TYPE_PRIVATE value
         */
        v2.RoomType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ROOM_TYPE_RANKED"] = 0;
            values[valuesById[1] = "ROOM_TYPE_PRIVATE"] = 1;
            return values;
        })();

        v2.PlayerIdentity = (function() {

            /**
             * Properties of a PlayerIdentity.
             * @memberof elo.v2
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
             * @memberof elo.v2
             * @classdesc Represents a PlayerIdentity.
             * @implements IPlayerIdentity
             * @constructor
             * @param {elo.v2.IPlayerIdentity=} [properties] Properties to set
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
             * @memberof elo.v2.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.playerId = "";

            /**
             * PlayerIdentity username.
             * @member {string} username
             * @memberof elo.v2.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.username = "";

            /**
             * PlayerIdentity eloRating.
             * @member {number} eloRating
             * @memberof elo.v2.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.eloRating = 0;

            /**
             * PlayerIdentity selectedThemeId.
             * @member {string} selectedThemeId
             * @memberof elo.v2.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.selectedThemeId = "";

            /**
             * PlayerIdentity activeTitle.
             * @member {string} activeTitle
             * @memberof elo.v2.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.activeTitle = "";

            /**
             * PlayerIdentity level.
             * @member {number} level
             * @memberof elo.v2.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.level = 0;

            /**
             * PlayerIdentity xp.
             * @member {number} xp
             * @memberof elo.v2.PlayerIdentity
             * @instance
             */
            PlayerIdentity.prototype.xp = 0;

            /**
             * Creates a new PlayerIdentity instance using the specified properties.
             * @function create
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {elo.v2.IPlayerIdentity=} [properties] Properties to set
             * @returns {elo.v2.PlayerIdentity} PlayerIdentity instance
             */
            PlayerIdentity.create = function create(properties) {
                return new PlayerIdentity(properties);
            };

            /**
             * Encodes the specified PlayerIdentity message. Does not implicitly {@link elo.v2.PlayerIdentity.verify|verify} messages.
             * @function encode
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {elo.v2.IPlayerIdentity} message PlayerIdentity message or plain object to encode
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
             * Encodes the specified PlayerIdentity message, length delimited. Does not implicitly {@link elo.v2.PlayerIdentity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {elo.v2.IPlayerIdentity} message PlayerIdentity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerIdentity.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a PlayerIdentity message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v2.PlayerIdentity} PlayerIdentity
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
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v2.PlayerIdentity();
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
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v2.PlayerIdentity} PlayerIdentity
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
             * @memberof elo.v2.PlayerIdentity
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
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v2.PlayerIdentity} PlayerIdentity
             */
            PlayerIdentity.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v2.PlayerIdentity)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v2.PlayerIdentity: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v2.PlayerIdentity();
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
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {elo.v2.PlayerIdentity} message PlayerIdentity
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
             * @memberof elo.v2.PlayerIdentity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PlayerIdentity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PlayerIdentity
             * @function getTypeUrl
             * @memberof elo.v2.PlayerIdentity
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PlayerIdentity.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v2.PlayerIdentity";
            };

            return PlayerIdentity;
        })();

        v2.CreateCustomRoomRequest = (function() {

            /**
             * Properties of a CreateCustomRoomRequest.
             * @memberof elo.v2
             * @interface ICreateCustomRoomRequest
             * @property {string|null} [hostPlayerId] CreateCustomRoomRequest hostPlayerId
             * @property {boolean|null} [allowDivision] CreateCustomRoomRequest allowDivision
             * @property {boolean|null} [allowMultiplication] CreateCustomRoomRequest allowMultiplication
             * @property {number|null} [customDurationSeconds] CreateCustomRoomRequest customDurationSeconds
             */

            /**
             * Constructs a new CreateCustomRoomRequest.
             * @memberof elo.v2
             * @classdesc Represents a CreateCustomRoomRequest.
             * @implements ICreateCustomRoomRequest
             * @constructor
             * @param {elo.v2.ICreateCustomRoomRequest=} [properties] Properties to set
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
             * @memberof elo.v2.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.hostPlayerId = "";

            /**
             * CreateCustomRoomRequest allowDivision.
             * @member {boolean} allowDivision
             * @memberof elo.v2.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.allowDivision = false;

            /**
             * CreateCustomRoomRequest allowMultiplication.
             * @member {boolean} allowMultiplication
             * @memberof elo.v2.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.allowMultiplication = false;

            /**
             * CreateCustomRoomRequest customDurationSeconds.
             * @member {number} customDurationSeconds
             * @memberof elo.v2.CreateCustomRoomRequest
             * @instance
             */
            CreateCustomRoomRequest.prototype.customDurationSeconds = 0;

            /**
             * Creates a new CreateCustomRoomRequest instance using the specified properties.
             * @function create
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {elo.v2.ICreateCustomRoomRequest=} [properties] Properties to set
             * @returns {elo.v2.CreateCustomRoomRequest} CreateCustomRoomRequest instance
             */
            CreateCustomRoomRequest.create = function create(properties) {
                return new CreateCustomRoomRequest(properties);
            };

            /**
             * Encodes the specified CreateCustomRoomRequest message. Does not implicitly {@link elo.v2.CreateCustomRoomRequest.verify|verify} messages.
             * @function encode
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {elo.v2.ICreateCustomRoomRequest} message CreateCustomRoomRequest message or plain object to encode
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
             * Encodes the specified CreateCustomRoomRequest message, length delimited. Does not implicitly {@link elo.v2.CreateCustomRoomRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {elo.v2.ICreateCustomRoomRequest} message CreateCustomRoomRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateCustomRoomRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a CreateCustomRoomRequest message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v2.CreateCustomRoomRequest} CreateCustomRoomRequest
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
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v2.CreateCustomRoomRequest();
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
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v2.CreateCustomRoomRequest} CreateCustomRoomRequest
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
             * @memberof elo.v2.CreateCustomRoomRequest
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
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v2.CreateCustomRoomRequest} CreateCustomRoomRequest
             */
            CreateCustomRoomRequest.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v2.CreateCustomRoomRequest)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v2.CreateCustomRoomRequest: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v2.CreateCustomRoomRequest();
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
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {elo.v2.CreateCustomRoomRequest} message CreateCustomRoomRequest
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
             * @memberof elo.v2.CreateCustomRoomRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateCustomRoomRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CreateCustomRoomRequest
             * @function getTypeUrl
             * @memberof elo.v2.CreateCustomRoomRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CreateCustomRoomRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v2.CreateCustomRoomRequest";
            };

            return CreateCustomRoomRequest;
        })();

        v2.MatchSecurityLog = (function() {

            /**
             * Properties of a MatchSecurityLog.
             * @memberof elo.v2
             * @interface IMatchSecurityLog
             * @property {string|null} [actionSequenceId] MatchSecurityLog actionSequenceId
             * @property {number|Long|null} [keystrokeDeltaMs] MatchSecurityLog keystrokeDeltaMs
             * @property {string|null} [inputValue] MatchSecurityLog inputValue
             */

            /**
             * Constructs a new MatchSecurityLog.
             * @memberof elo.v2
             * @classdesc Represents a MatchSecurityLog.
             * @implements IMatchSecurityLog
             * @constructor
             * @param {elo.v2.IMatchSecurityLog=} [properties] Properties to set
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
             * @memberof elo.v2.MatchSecurityLog
             * @instance
             */
            MatchSecurityLog.prototype.actionSequenceId = "";

            /**
             * MatchSecurityLog keystrokeDeltaMs.
             * @member {number|Long} keystrokeDeltaMs
             * @memberof elo.v2.MatchSecurityLog
             * @instance
             */
            MatchSecurityLog.prototype.keystrokeDeltaMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * MatchSecurityLog inputValue.
             * @member {string} inputValue
             * @memberof elo.v2.MatchSecurityLog
             * @instance
             */
            MatchSecurityLog.prototype.inputValue = "";

            /**
             * Creates a new MatchSecurityLog instance using the specified properties.
             * @function create
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {elo.v2.IMatchSecurityLog=} [properties] Properties to set
             * @returns {elo.v2.MatchSecurityLog} MatchSecurityLog instance
             */
            MatchSecurityLog.create = function create(properties) {
                return new MatchSecurityLog(properties);
            };

            /**
             * Encodes the specified MatchSecurityLog message. Does not implicitly {@link elo.v2.MatchSecurityLog.verify|verify} messages.
             * @function encode
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {elo.v2.IMatchSecurityLog} message MatchSecurityLog message or plain object to encode
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
             * Encodes the specified MatchSecurityLog message, length delimited. Does not implicitly {@link elo.v2.MatchSecurityLog.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {elo.v2.IMatchSecurityLog} message MatchSecurityLog message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchSecurityLog.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a MatchSecurityLog message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v2.MatchSecurityLog} MatchSecurityLog
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
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v2.MatchSecurityLog();
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
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v2.MatchSecurityLog} MatchSecurityLog
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
             * @memberof elo.v2.MatchSecurityLog
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
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v2.MatchSecurityLog} MatchSecurityLog
             */
            MatchSecurityLog.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v2.MatchSecurityLog)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v2.MatchSecurityLog: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v2.MatchSecurityLog();
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
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {elo.v2.MatchSecurityLog} message MatchSecurityLog
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
             * @memberof elo.v2.MatchSecurityLog
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MatchSecurityLog.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for MatchSecurityLog
             * @function getTypeUrl
             * @memberof elo.v2.MatchSecurityLog
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            MatchSecurityLog.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v2.MatchSecurityLog";
            };

            return MatchSecurityLog;
        })();

        v2.ClientAction = (function() {

            /**
             * Properties of a ClientAction.
             * @memberof elo.v2
             * @interface IClientAction
             * @property {string|null} [roomId] ClientAction roomId
             * @property {string|null} [playerId] ClientAction playerId
             * @property {number|Long|null} [timestamp] ClientAction timestamp
             * @property {string|null} [currentInput] ClientAction currentInput
             * @property {string|null} [submittedAnswer] ClientAction submittedAnswer
             * @property {string|null} [joinQueuePlayerId] ClientAction joinQueuePlayerId
             * @property {elo.v2.ICreateCustomRoomRequest|null} [createCustomRoom] ClientAction createCustomRoom
             * @property {string|null} [joinPrivateRoomCode] ClientAction joinPrivateRoomCode
             * @property {elo.v2.IMatchSecurityLog|null} [securityLog] ClientAction securityLog
             */

            /**
             * Constructs a new ClientAction.
             * @memberof elo.v2
             * @classdesc Represents a ClientAction.
             * @implements IClientAction
             * @constructor
             * @param {elo.v2.IClientAction=} [properties] Properties to set
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
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.roomId = "";

            /**
             * ClientAction playerId.
             * @member {string} playerId
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.playerId = "";

            /**
             * ClientAction timestamp.
             * @member {number|Long} timestamp
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ClientAction currentInput.
             * @member {string|null|undefined} currentInput
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.currentInput = null;

            /**
             * ClientAction submittedAnswer.
             * @member {string|null|undefined} submittedAnswer
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.submittedAnswer = null;

            /**
             * ClientAction joinQueuePlayerId.
             * @member {string|null|undefined} joinQueuePlayerId
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.joinQueuePlayerId = null;

            /**
             * ClientAction createCustomRoom.
             * @member {elo.v2.ICreateCustomRoomRequest|null|undefined} createCustomRoom
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.createCustomRoom = null;

            /**
             * ClientAction joinPrivateRoomCode.
             * @member {string|null|undefined} joinPrivateRoomCode
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.joinPrivateRoomCode = null;

            /**
             * ClientAction securityLog.
             * @member {elo.v2.IMatchSecurityLog|null|undefined} securityLog
             * @memberof elo.v2.ClientAction
             * @instance
             */
            ClientAction.prototype.securityLog = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * ClientAction payload.
             * @member {"currentInput"|"submittedAnswer"|"joinQueuePlayerId"|"createCustomRoom"|"joinPrivateRoomCode"|"securityLog"|undefined} payload
             * @memberof elo.v2.ClientAction
             * @instance
             */
            Object.defineProperty(ClientAction.prototype, "payload", {
                get: $util.oneOfGetter($oneOfFields = ["currentInput", "submittedAnswer", "joinQueuePlayerId", "createCustomRoom", "joinPrivateRoomCode", "securityLog"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new ClientAction instance using the specified properties.
             * @function create
             * @memberof elo.v2.ClientAction
             * @static
             * @param {elo.v2.IClientAction=} [properties] Properties to set
             * @returns {elo.v2.ClientAction} ClientAction instance
             */
            ClientAction.create = function create(properties) {
                return new ClientAction(properties);
            };

            /**
             * Encodes the specified ClientAction message. Does not implicitly {@link elo.v2.ClientAction.verify|verify} messages.
             * @function encode
             * @memberof elo.v2.ClientAction
             * @static
             * @param {elo.v2.IClientAction} message ClientAction message or plain object to encode
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
                    $root.elo.v2.CreateCustomRoomRequest.encode(message.createCustomRoom, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
                if (message.joinPrivateRoomCode != null && Object.hasOwnProperty.call(message, "joinPrivateRoomCode"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.joinPrivateRoomCode);
                if (message.securityLog != null && Object.hasOwnProperty.call(message, "securityLog"))
                    $root.elo.v2.MatchSecurityLog.encode(message.securityLog, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ClientAction message, length delimited. Does not implicitly {@link elo.v2.ClientAction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v2.ClientAction
             * @static
             * @param {elo.v2.IClientAction} message ClientAction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClientAction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ClientAction message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v2.ClientAction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v2.ClientAction} ClientAction
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
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v2.ClientAction();
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
                            message.createCustomRoom = $root.elo.v2.CreateCustomRoomRequest.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 8: {
                            message.joinPrivateRoomCode = reader.string();
                            break;
                        }
                    case 9: {
                            message.securityLog = $root.elo.v2.MatchSecurityLog.decode(reader, reader.uint32(), undefined, long + 1);
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
             * @memberof elo.v2.ClientAction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v2.ClientAction} ClientAction
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
             * @memberof elo.v2.ClientAction
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
                        let error = $root.elo.v2.CreateCustomRoomRequest.verify(message.createCustomRoom, long + 1);
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
                        let error = $root.elo.v2.MatchSecurityLog.verify(message.securityLog, long + 1);
                        if (error)
                            return "securityLog." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ClientAction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v2.ClientAction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v2.ClientAction} ClientAction
             */
            ClientAction.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v2.ClientAction)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v2.ClientAction: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v2.ClientAction();
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
                        throw TypeError(".elo.v2.ClientAction.createCustomRoom: object expected");
                    message.createCustomRoom = $root.elo.v2.CreateCustomRoomRequest.fromObject(object.createCustomRoom, long + 1);
                }
                if (object.joinPrivateRoomCode != null)
                    message.joinPrivateRoomCode = String(object.joinPrivateRoomCode);
                if (object.securityLog != null) {
                    if (!$util.isObject(object.securityLog))
                        throw TypeError(".elo.v2.ClientAction.securityLog: object expected");
                    message.securityLog = $root.elo.v2.MatchSecurityLog.fromObject(object.securityLog, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a ClientAction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v2.ClientAction
             * @static
             * @param {elo.v2.ClientAction} message ClientAction
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
                    object.createCustomRoom = $root.elo.v2.CreateCustomRoomRequest.toObject(message.createCustomRoom, options, q + 1);
                    if (options.oneofs)
                        object.payload = "createCustomRoom";
                }
                if (message.joinPrivateRoomCode != null && Object.hasOwnProperty.call(message, "joinPrivateRoomCode")) {
                    object.joinPrivateRoomCode = message.joinPrivateRoomCode;
                    if (options.oneofs)
                        object.payload = "joinPrivateRoomCode";
                }
                if (message.securityLog != null && Object.hasOwnProperty.call(message, "securityLog")) {
                    object.securityLog = $root.elo.v2.MatchSecurityLog.toObject(message.securityLog, options, q + 1);
                    if (options.oneofs)
                        object.payload = "securityLog";
                }
                return object;
            };

            /**
             * Converts this ClientAction to JSON.
             * @function toJSON
             * @memberof elo.v2.ClientAction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClientAction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ClientAction
             * @function getTypeUrl
             * @memberof elo.v2.ClientAction
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ClientAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v2.ClientAction";
            };

            return ClientAction;
        })();

        v2.ServerGameStateUpdate = (function() {

            /**
             * Properties of a ServerGameStateUpdate.
             * @memberof elo.v2
             * @interface IServerGameStateUpdate
             * @property {string|null} [roomId] ServerGameStateUpdate roomId
             * @property {elo.v2.MatchState|null} [state] ServerGameStateUpdate state
             * @property {number|null} [timeRemainingSeconds] ServerGameStateUpdate timeRemainingSeconds
             * @property {elo.v2.RoomType|null} [roomType] ServerGameStateUpdate roomType
             * @property {string|null} [privateRoomCode] ServerGameStateUpdate privateRoomCode
             * @property {elo.v2.ServerGameStateUpdate.IPlayerProgress|null} [playerOne] ServerGameStateUpdate playerOne
             * @property {elo.v2.ServerGameStateUpdate.IPlayerProgress|null} [playerTwo] ServerGameStateUpdate playerTwo
             * @property {string|null} [nextQuestionText] ServerGameStateUpdate nextQuestionText
             * @property {string|null} [winnerId] ServerGameStateUpdate winnerId
             * @property {number|null} [playerOneEloChange] ServerGameStateUpdate playerOneEloChange
             * @property {number|null} [playerTwoEloChange] ServerGameStateUpdate playerTwoEloChange
             * @property {number|null} [playerOneXpChange] ServerGameStateUpdate playerOneXpChange
             * @property {number|null} [playerTwoXpChange] ServerGameStateUpdate playerTwoXpChange
             */

            /**
             * Constructs a new ServerGameStateUpdate.
             * @memberof elo.v2
             * @classdesc Represents a ServerGameStateUpdate.
             * @implements IServerGameStateUpdate
             * @constructor
             * @param {elo.v2.IServerGameStateUpdate=} [properties] Properties to set
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
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.roomId = "";

            /**
             * ServerGameStateUpdate state.
             * @member {elo.v2.MatchState} state
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.state = 0;

            /**
             * ServerGameStateUpdate timeRemainingSeconds.
             * @member {number} timeRemainingSeconds
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.timeRemainingSeconds = 0;

            /**
             * ServerGameStateUpdate roomType.
             * @member {elo.v2.RoomType} roomType
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.roomType = 0;

            /**
             * ServerGameStateUpdate privateRoomCode.
             * @member {string} privateRoomCode
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.privateRoomCode = "";

            /**
             * ServerGameStateUpdate playerOne.
             * @member {elo.v2.ServerGameStateUpdate.IPlayerProgress|null|undefined} playerOne
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerOne = null;

            /**
             * ServerGameStateUpdate playerTwo.
             * @member {elo.v2.ServerGameStateUpdate.IPlayerProgress|null|undefined} playerTwo
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerTwo = null;

            /**
             * ServerGameStateUpdate nextQuestionText.
             * @member {string} nextQuestionText
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.nextQuestionText = "";

            /**
             * ServerGameStateUpdate winnerId.
             * @member {string} winnerId
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.winnerId = "";

            /**
             * ServerGameStateUpdate playerOneEloChange.
             * @member {number} playerOneEloChange
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerOneEloChange = 0;

            /**
             * ServerGameStateUpdate playerTwoEloChange.
             * @member {number} playerTwoEloChange
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerTwoEloChange = 0;

            /**
             * ServerGameStateUpdate playerOneXpChange.
             * @member {number} playerOneXpChange
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerOneXpChange = 0;

            /**
             * ServerGameStateUpdate playerTwoXpChange.
             * @member {number} playerTwoXpChange
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             */
            ServerGameStateUpdate.prototype.playerTwoXpChange = 0;

            /**
             * Creates a new ServerGameStateUpdate instance using the specified properties.
             * @function create
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {elo.v2.IServerGameStateUpdate=} [properties] Properties to set
             * @returns {elo.v2.ServerGameStateUpdate} ServerGameStateUpdate instance
             */
            ServerGameStateUpdate.create = function create(properties) {
                return new ServerGameStateUpdate(properties);
            };

            /**
             * Encodes the specified ServerGameStateUpdate message. Does not implicitly {@link elo.v2.ServerGameStateUpdate.verify|verify} messages.
             * @function encode
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {elo.v2.IServerGameStateUpdate} message ServerGameStateUpdate message or plain object to encode
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
                    $root.elo.v2.ServerGameStateUpdate.PlayerProgress.encode(message.playerOne, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo"))
                    $root.elo.v2.ServerGameStateUpdate.PlayerProgress.encode(message.playerTwo, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
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
                return writer;
            };

            /**
             * Encodes the specified ServerGameStateUpdate message, length delimited. Does not implicitly {@link elo.v2.ServerGameStateUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {elo.v2.IServerGameStateUpdate} message ServerGameStateUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ServerGameStateUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a ServerGameStateUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {elo.v2.ServerGameStateUpdate} ServerGameStateUpdate
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
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v2.ServerGameStateUpdate();
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
                            message.playerOne = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 7: {
                            message.playerTwo = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.decode(reader, reader.uint32(), undefined, long + 1);
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
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {elo.v2.ServerGameStateUpdate} ServerGameStateUpdate
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
             * @memberof elo.v2.ServerGameStateUpdate
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
                        break;
                    }
                if (message.privateRoomCode != null && Object.hasOwnProperty.call(message, "privateRoomCode"))
                    if (!$util.isString(message.privateRoomCode))
                        return "privateRoomCode: string expected";
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne")) {
                    let error = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.verify(message.playerOne, long + 1);
                    if (error)
                        return "playerOne." + error;
                }
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo")) {
                    let error = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.verify(message.playerTwo, long + 1);
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
                return null;
            };

            /**
             * Creates a ServerGameStateUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {elo.v2.ServerGameStateUpdate} ServerGameStateUpdate
             */
            ServerGameStateUpdate.fromObject = function fromObject(object, long) {
                if (object instanceof $root.elo.v2.ServerGameStateUpdate)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".elo.v2.ServerGameStateUpdate: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.elo.v2.ServerGameStateUpdate();
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
                }
                if (object.privateRoomCode != null)
                    message.privateRoomCode = String(object.privateRoomCode);
                if (object.playerOne != null) {
                    if (!$util.isObject(object.playerOne))
                        throw TypeError(".elo.v2.ServerGameStateUpdate.playerOne: object expected");
                    message.playerOne = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.fromObject(object.playerOne, long + 1);
                }
                if (object.playerTwo != null) {
                    if (!$util.isObject(object.playerTwo))
                        throw TypeError(".elo.v2.ServerGameStateUpdate.playerTwo: object expected");
                    message.playerTwo = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.fromObject(object.playerTwo, long + 1);
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
                return message;
            };

            /**
             * Creates a plain object from a ServerGameStateUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {elo.v2.ServerGameStateUpdate} message ServerGameStateUpdate
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
                }
                if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                    object.roomId = message.roomId;
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    object.state = options.enums === String ? $root.elo.v2.MatchState[message.state] === undefined ? message.state : $root.elo.v2.MatchState[message.state] : message.state;
                if (message.timeRemainingSeconds != null && Object.hasOwnProperty.call(message, "timeRemainingSeconds"))
                    object.timeRemainingSeconds = message.timeRemainingSeconds;
                if (message.roomType != null && Object.hasOwnProperty.call(message, "roomType"))
                    object.roomType = options.enums === String ? $root.elo.v2.RoomType[message.roomType] === undefined ? message.roomType : $root.elo.v2.RoomType[message.roomType] : message.roomType;
                if (message.privateRoomCode != null && Object.hasOwnProperty.call(message, "privateRoomCode"))
                    object.privateRoomCode = message.privateRoomCode;
                if (message.playerOne != null && Object.hasOwnProperty.call(message, "playerOne"))
                    object.playerOne = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.toObject(message.playerOne, options, q + 1);
                if (message.playerTwo != null && Object.hasOwnProperty.call(message, "playerTwo"))
                    object.playerTwo = $root.elo.v2.ServerGameStateUpdate.PlayerProgress.toObject(message.playerTwo, options, q + 1);
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
                return object;
            };

            /**
             * Converts this ServerGameStateUpdate to JSON.
             * @function toJSON
             * @memberof elo.v2.ServerGameStateUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ServerGameStateUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ServerGameStateUpdate
             * @function getTypeUrl
             * @memberof elo.v2.ServerGameStateUpdate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ServerGameStateUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/elo.v2.ServerGameStateUpdate";
            };

            ServerGameStateUpdate.PlayerProgress = (function() {

                /**
                 * Properties of a PlayerProgress.
                 * @memberof elo.v2.ServerGameStateUpdate
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
                 * @memberof elo.v2.ServerGameStateUpdate
                 * @classdesc Represents a PlayerProgress.
                 * @implements IPlayerProgress
                 * @constructor
                 * @param {elo.v2.ServerGameStateUpdate.IPlayerProgress=} [properties] Properties to set
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
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.playerId = "";

                /**
                 * PlayerProgress username.
                 * @member {string} username
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.username = "";

                /**
                 * PlayerProgress currentScore.
                 * @member {number} currentScore
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.currentScore = 0;

                /**
                 * PlayerProgress currentStreak.
                 * @member {number} currentStreak
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.currentStreak = 0;

                /**
                 * PlayerProgress ghostInput.
                 * @member {string} ghostInput
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.ghostInput = "";

                /**
                 * PlayerProgress elo.
                 * @member {number} elo
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.elo = 0;

                /**
                 * PlayerProgress activeTitle.
                 * @member {string} activeTitle
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.activeTitle = "";

                /**
                 * PlayerProgress level.
                 * @member {number} level
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 */
                PlayerProgress.prototype.level = 0;

                /**
                 * Creates a new PlayerProgress instance using the specified properties.
                 * @function create
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v2.ServerGameStateUpdate.IPlayerProgress=} [properties] Properties to set
                 * @returns {elo.v2.ServerGameStateUpdate.PlayerProgress} PlayerProgress instance
                 */
                PlayerProgress.create = function create(properties) {
                    return new PlayerProgress(properties);
                };

                /**
                 * Encodes the specified PlayerProgress message. Does not implicitly {@link elo.v2.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @function encode
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v2.ServerGameStateUpdate.IPlayerProgress} message PlayerProgress message or plain object to encode
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
                 * Encodes the specified PlayerProgress message, length delimited. Does not implicitly {@link elo.v2.ServerGameStateUpdate.PlayerProgress.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v2.ServerGameStateUpdate.IPlayerProgress} message PlayerProgress message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PlayerProgress.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a PlayerProgress message from the specified reader or buffer.
                 * @function decode
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {elo.v2.ServerGameStateUpdate.PlayerProgress} PlayerProgress
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
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.elo.v2.ServerGameStateUpdate.PlayerProgress();
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
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {elo.v2.ServerGameStateUpdate.PlayerProgress} PlayerProgress
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
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
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
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {elo.v2.ServerGameStateUpdate.PlayerProgress} PlayerProgress
                 */
                PlayerProgress.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.elo.v2.ServerGameStateUpdate.PlayerProgress)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".elo.v2.ServerGameStateUpdate.PlayerProgress: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.elo.v2.ServerGameStateUpdate.PlayerProgress();
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
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {elo.v2.ServerGameStateUpdate.PlayerProgress} message PlayerProgress
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
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PlayerProgress.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for PlayerProgress
                 * @function getTypeUrl
                 * @memberof elo.v2.ServerGameStateUpdate.PlayerProgress
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                PlayerProgress.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/elo.v2.ServerGameStateUpdate.PlayerProgress";
                };

                return PlayerProgress;
            })();

            return ServerGameStateUpdate;
        })();

        return v2;
    })();

    return elo;
})();

export { $root as default };
