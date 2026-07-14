import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spacing, Radius, Typography, Layout } from "@/constants/design";

interface FloatingEmoji {
  id: string;
  type: string;
  x: number;
}

export default function SpectatorScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
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
      <Card style={styles.playerCol}>
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
          <View style={[styles.ghostBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
            <Text style={[styles.ghostText, { color: colors.primary }]}>{player.ghostInput || "?"}</Text>
          </View>
        </View>
      </Card>
    );
  };

  if (status === "connecting") {
    return (
      <Screen>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.statusText, { color: colors.textMuted }]}>Buffering live streams...</Text>
          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
        </View>
      </Screen>
    );
  }

  const p1Q = gameState ? (gameState.nextQuestionText || "").split("|")[0] : "";
  const p2Q = gameState ? (gameState.nextQuestionText || "").split("|")[1] : "";

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.logoText, { color: colors.primary }]}>SPECTATING HUB</Text>
          <Button
            label="LEAVE HUB"
            variant="secondary"
            compact
            onPress={() => router.replace("/tournament-lobby")}
            style={styles.exitBtn}
          />
        </View>

        {/* Global Timer */}
        <View style={styles.timerBar}>
          <Text style={[styles.timerLabel, { color: colors.textMuted }]}>TIME REMAINING: </Text>
          <Text style={[styles.timerVal, { color: colors.accent }]}>{timeRemaining}s</Text>
        </View>

        {/* Side-by-side Competitors Display */}
        <View style={styles.streamRow}>
          {renderCompetitor(gameState?.playerOne, p1Q, "left")}
          <View style={{ width: Spacing.md }} />
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
              style={[styles.reactBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder, borderWidth: 2 }]}
              onPress={() => handleSendReaction(emoji)}
              activeOpacity={0.8}
            >
              <Text style={styles.reactEmoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Screen>
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
  container: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    marginTop: Spacing.md,
    ...Typography.bodyBold,
  },
  error: {
    color: "#EF4444",
    marginTop: Spacing.md,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  logoText: {
    ...Typography.heading,
    fontSize: 20,
  },
  exitBtn: {
    height: 34,
    paddingHorizontal: Spacing.md,
  },
  timerBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  timerLabel: {
    ...Typography.label,
  },
  timerVal: {
    fontSize: 14,
    fontWeight: "900",
    marginLeft: 4,
  },
  streamRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    flex: 1,
  },
  playerCol: {
    flex: 1,
  },
  competitorName: {
    ...Typography.heading,
    fontSize: 16,
  },
  competitorTitle: {
    ...Typography.label,
    marginTop: 2,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  scoreVal: {
    fontSize: 36,
    fontWeight: "900",
  },
  streakVal: {
    ...Typography.caption,
  },
  questionSection: {
    marginBottom: Spacing.lg,
  },
  qLabel: {
    ...Typography.label,
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
    ...Typography.label,
    marginBottom: 6,
  },
  ghostBox: {
    height: 48,
    borderWidth: 1,
    borderRadius: Radius.md,
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
    height: Layout.tabBarHeight + 30,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.lg,
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
