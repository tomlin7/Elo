import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { useProfileStore } from "../src/store/profileStore.ts";
import { getBackendUrls } from "../src/utils/auth.ts";
import { decodeServerState, encodeClientAction, MatchState } from "../src/utils/protobuf.ts";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface FloatingEmoji {
  id: string;
  type: string;
  x: number;
}

export default function SpectatorScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const { profile } = useProfileStore();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [status, setStatus] = useState<"connecting" | "active" | "finished">("connecting");
  const [gameState, setGameState] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) {
      setErrorMsg("Missing room ID.");
      return;
    }
    connectSpectatorWS();
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [roomId]);

  const connectSpectatorWS = () => {
    setStatus("connecting");
    const urls = getBackendUrls();
    const ws = new WebSocket(`${urls.ws}?playerId=${profile?.id || "spectator"}`);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      // Send spectate registration action
      const action = encodeClientAction({
        playerId: profile?.id || "spectator",
        spectateRoomId: roomId
      });
      ws.send(action);
    };

    ws.onmessage = (event) => {
      try {
        const buffer = new Uint8Array(event.data as ArrayBuffer);
        const update = decodeServerState(buffer);

        if (update.emojiBurst) {
          triggerEmojiFloat(update.emojiBurst.emojiType || "🔥", update.emojiBurst.executionCoordinateX || 50);
          return;
        }

        setGameState(update);
        setTimeRemaining(update.timeRemainingSeconds);

        if (update.state === MatchState.MATCH_STATE_FINISHED) {
          setStatus("finished");
        } else if (update.state === MatchState.MATCH_STATE_ACTIVE || update.state === MatchState.MATCH_STATE_COUNTDOWN) {
          setStatus("active");
        }
      } catch (err) {
        console.error("Spectator sync error:", err);
      }
    };

    ws.onerror = () => {
      setErrorMsg("Connection error.");
    };

    ws.onclose = () => {
      setStatus("finished");
    };
  };

  const triggerEmojiFloat = (emoji: string, x: number) => {
    const id = `${Date.now()}_${Math.random()}`;
    setEmojis((prev) => [...prev, { id, type: emoji, x }]);

    // Remove after animation completes (3 seconds)
    setTimeout(() => {
      setEmojis((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  };

  const handleSendReaction = (emoji: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const randomX = Math.floor(Math.random() * 80) + 10; // percentage coordinate
    const action = encodeClientAction({
      roomId,
      playerId: profile?.id || "spectator",
      emojiBurst: {
        roomId,
        emojiType: emoji,
        executionCoordinateX: randomX
      }
    });
    wsRef.current.send(action);
  };

  const renderCompetitor = (player: any, questionText: string, align: "left" | "right") => {
    if (!player) return null;
    return (
      <View style={[styles.playerCol, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.competitorName, { color: colors.text }]} numberOfLines={1}>{player.username}</Text>
        <Text style={[styles.competitorTitle, { color: colors.primary }]}>{player.activeTitle || `LVL ${player.level || 1}`}</Text>
        
        <View style={styles.scoreRow}>
          <Text style={[styles.scoreVal, { color: colors.text }]}>{player.currentScore}</Text>
          <Text style={[styles.streakVal, { color: colors.accent }]}>Streak: {player.currentStreak}</Text>
        </View>

        <View style={styles.questionSection}>
          <Text style={[styles.qLabel, { color: colors.textMuted }]}>CURRENT QUESTION</Text>
          <Text style={[styles.qText, { color: colors.text }]}>{questionText || "Thinking..."}</Text>
        </View>

        <View style={styles.ghostSection}>
          <Text style={[styles.ghostLabel, { color: colors.textMuted }]}>GHOST TYPING</Text>
          <View style={[styles.ghostBox, { backgroundColor: "rgba(0,0,0,0.2)", borderColor: colors.cardBorder }]}>
            <Text style={[styles.ghostText, { color: colors.primary }]}>{player.ghostInput || "?"}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (status === "connecting") {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.statusText, { color: colors.textMuted }]}>Buffering live streams...</Text>
          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
        </View>
      </SafeAreaView>
    );
  }

  const p1Q = gameState ? (gameState.nextQuestionText || "").split("|")[0] : "";
  const p2Q = gameState ? (gameState.nextQuestionText || "").split("|")[1] : "";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.logoText, { color: colors.primary }]}>SPECTATING HUB</Text>
          <TouchableOpacity
            style={[styles.exitBtn, { borderColor: colors.cardBorder }]}
            onPress={() => router.replace("/tournament-lobby")}
          >
            <Text style={[styles.exitText, { color: colors.text }]}>LEAVE HUB</Text>
          </TouchableOpacity>
        </View>

        {/* Global Timer */}
        <View style={styles.timerBar}>
          <Text style={[styles.timerLabel, { color: colors.textMuted }]}>TIME REMAINING: </Text>
          <Text style={[styles.timerVal, { color: colors.accent }]}>{timeRemaining}s</Text>
        </View>

        {/* Side-by-side Competitors Display */}
        <View style={styles.streamRow}>
          {renderCompetitor(gameState?.playerOne, p1Q, "left")}
          <View style={{ width: 12 }} />
          {renderCompetitor(gameState?.playerTwo, p2Q, "right")}
        </View>

        {/* Floating Emoji Canvas Overlay */}
        <View style={styles.canvasContainer} pointerEvents="none">
          {emojis.map((e) => (
            <EmojiFloatBubble key={e.id} emoji={e.type} startX={e.x} />
          ))}
        </View>

        {/* Floating Action Reaction Bar */}
        <View style={[styles.reactionContainer, { borderTopColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
          {["🔥", "🤯", "⚡", "👑", "🎯"].map((emoji) => (
            <TouchableOpacity
              key={emoji}
              style={[styles.reactBtn, { backgroundColor: "rgba(255,255,255,0.05)" }]}
              onPress={() => handleSendReaction(emoji)}
            >
              <Text style={styles.reactEmoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Inner helper component for floating emoji animations
function EmojiFloatBubble({ emoji, startX }: { emoji: string; startX: number }) {
  const floatAnim = useSharedValue(0);
  const opacityAnim = useSharedValue(1);

  useEffect(() => {
    floatAnim.value = withTiming(-400, { duration: 2500 });
    opacityAnim.value = withTiming(0, { duration: 2500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatAnim.value }],
      opacity: opacityAnim.value,
      left: `${startX}%`
    };
  });

  return (
    <Animated.View style={[styles.emojiBubble, animatedStyle]}>
      <Text style={styles.bubbleText}>{emoji}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
  },
  error: {
    color: "#EF4444",
    marginTop: 12,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },
  exitBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  exitText: {
    fontSize: 11,
    fontWeight: "700",
  },
  timerBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 11,
    fontWeight: "800",
  },
  timerVal: {
    fontSize: 14,
    fontWeight: "900",
  },
  streamRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    flex: 1,
  },
  playerCol: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
  competitorName: {
    fontSize: 16,
    fontWeight: "800",
  },
  competitorTitle: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 12,
    marginBottom: 20,
  },
  scoreVal: {
    fontSize: 36,
    fontWeight: "900",
  },
  streakVal: {
    fontSize: 11,
    fontWeight: "700",
  },
  questionSection: {
    marginBottom: 16,
  },
  qLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  qText: {
    fontSize: 18,
    fontWeight: "800",
  },
  ghostSection: {
    flex: 1,
    justifyContent: "flex-end",
  },
  ghostLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  ghostBox: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  ghostText: {
    fontSize: 20,
    fontWeight: "900",
  },
  canvasContainer: {
    position: "absolute",
    bottom: 120,
    left: 0,
    right: 0,
    top: 100,
    zIndex: 10,
  },
  emojiBubble: {
    position: "absolute",
    bottom: 0,
    zIndex: 12,
  },
  bubbleText: {
    fontSize: 32,
  },
  reactionContainer: {
    height: 96,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  reactBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  reactEmoji: {
    fontSize: 24,
  },
});
