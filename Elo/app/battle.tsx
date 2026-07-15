import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Share
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getBackendUrls } from "../src/utils/auth.ts";
import { decodeServerState, encodeClientAction, MatchState } from "../src/utils/protobuf.ts";
import { Keypad } from "../components/Keypad.tsx";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { useThemeStore } from "../src/store/themeStore.ts";
import { Spacing, Radius } from "@/constants/design";
import { IconSymbol } from "@/components/ui/icon-symbol";

const GridBackdrop = () => (
  <View style={[StyleSheet.absoluteFill, { opacity: 0.05, pointerEvents: "none" }]}>
    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
      {[...Array(14)].map((_, i) => (
        <View key={i} style={{ height: 1, backgroundColor: "#FFF" }} />
      ))}
    </View>
    <View style={[StyleSheet.absoluteFill, { flexDirection: "row", justifyContent: "space-between" }]}>
      {[...Array(10)].map((_, i) => (
        <View key={i} style={{ width: 1, backgroundColor: "#FFF" }} />
      ))}
    </View>
  </View>
);

const RadarScanner = () => (
  <View style={styles.radarContainer}>
    <View style={styles.radarRingOuter}>
      <View style={styles.radarRingMiddle}>
        <View style={styles.radarRingInner}>
          <Text style={{ fontSize: 32, fontWeight: "900", color: "#A6E3A1" }}>%</Text>
        </View>
      </View>
    </View>
  </View>
);

export default function BattleScreen() {
  const router = useRouter();
  const { playerId, roomId } = useLocalSearchParams<{ playerId: string; roomId?: string }>();

  const [status, setStatus] = useState<"connecting" | "queue" | "countdown" | "active" | "finished" | "disconnected">("connecting");
  const [countdown, setCountdown] = useState(3);
  const [gameState, setGameState] = useState<any>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showTelemetry, setShowTelemetry] = useState(false);
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(12);
  const [connectedRegion, setConnectedRegion] = useState("APAC-South");

  const wsRef = useRef<WebSocket | null>(null);
  const prevStateRef = useRef<any>(null);

  // Reanimated values for screen flashes
  const flashColor = useSharedValue<string>("rgba(0,0,0,0)");
  const flashOpacity = useSharedValue<number>(0);

  // Time remaining
  const [timeRemaining, setTimeRemaining] = useState(60);
  const { colors, themeId } = useThemeStore();

  useEffect(() => {
    // Geoping region
    const fetchRegion = async () => {
      try {
        const urls = getBackendUrls();
        const res = await fetch(`${urls.http}/api/ping-region`);
        const data = await res.json();
        if (data.regionLabel) setConnectedRegion(data.regionLabel);
      } catch {}
    };
    fetchRegion();

    // Measure FPS
    let frames = 0;
    let lastFpsTime = Date.now();
    let animFrameId: number;

    const measureFps = () => {
      frames++;
      const now = Date.now();
      if (now >= lastFpsTime + 1000) {
        setFps(Math.round((frames * 1000) / (now - lastFpsTime)));
        frames = 0;
        lastFpsTime = now;
      }
      animFrameId = requestAnimationFrame(measureFps);
    };
    animFrameId = requestAnimationFrame(measureFps);

    // Measure Ping
    const pingHistory: number[] = [];
    const interval = setInterval(async () => {
      try {
        const urls = getBackendUrls();
        const start = Date.now();
        await fetch(`${urls.http}/api/ping`);
        const rtt = Date.now() - start;
        pingHistory.push(rtt);
        if (pingHistory.length > 5) pingHistory.shift();
        const avg = Math.round(pingHistory.reduce((a, b) => a + b, 0) / pingHistory.length);
        setPing(avg);
      } catch {}
    }, 3000);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!playerId) {
      setErrorMsg("Missing player configuration.");
      return;
    }

    connectWebSocket(roomId);

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [playerId, roomId]);

  const connectWebSocket = (roomIdToRejoin?: string) => {
    setStatus("connecting");
    const urls = getBackendUrls();
    let url = `${urls.ws}?playerId=${playerId}`;
    if (roomIdToRejoin) {
      url += `&roomId=${roomIdToRejoin}`;
    }

    const ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected.");
      if (roomIdToRejoin) {
        // Automatically rejoining active room
      } else {
        const action = encodeClientAction({ joinQueuePlayerId: playerId });
        ws.send(action);
        setStatus("queue");
      }
    };

    ws.onmessage = (event) => {
      try {
        const buffer = new Uint8Array(event.data as ArrayBuffer);
        const update = decodeServerState(buffer);
        handleStateUpdate(update);
      } catch (err) {
        console.error("Error decoding server update:", err);
      }
    };
  };

  const handleStateUpdate = (update: any) => {
    if (update.matchState) {
      const match = update.matchState;
      setGameState(match);
      setTimeRemaining(match.timeLeftSeconds || 60);

      // Handle transition states
      if (match.state === MatchState.MATCH_STATE_COUNTDOWN) {
        setStatus("countdown");
        setCountdown(match.countdownSeconds || 3);
      } else if (match.state === MatchState.MATCH_STATE_ACTIVE || match.state === MatchState.MATCH_STATE_PAUSED_DISCONNECT) {
        setStatus("active");
      } else if (match.state === MatchState.MATCH_STATE_FINISHED) {
        setStatus("finished");
      }

      // Check flashes
      const me = isPlayerOne ? match.playerOne : match.playerTwo;
      const prevMe = isPlayerOne ? prevStateRef.current?.playerOne : prevStateRef.current?.playerTwo;

      if (me && prevMe) {
        if (me.currentScore > prevMe.currentScore) {
          triggerSuccessFlash();
        } else if (me.currentStreak === 0 && prevMe.currentStreak > 0) {
          triggerFailureFlash();
        }
      }

      prevStateRef.current = match;
    }
  };

  const triggerSuccessFlash = () => {
    flashColor.value = colors.success;
    flashOpacity.value = withSequence(
      withTiming(0.2, { duration: 100 }),
      withTiming(0, { duration: 400 })
    );
  };

  const triggerFailureFlash = () => {
    flashColor.value = colors.danger;
    flashOpacity.value = withSequence(
      withTiming(0.2, { duration: 100 }),
      withTiming(0, { duration: 400 })
    );
  };

  const handleKeyPress = (val: string) => {
    if (status !== "active") return;

    if (val === "delete") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (val === "-") {
      if (currentInput.startsWith("-")) {
        setCurrentInput((prev) => prev.slice(1));
      } else {
        setCurrentInput((prev) => "-" + prev);
      }
    } else {
      // Append number
      if (currentInput.length < 8) {
        const next = currentInput + val;
        setCurrentInput(next);
        sendGhostInput(next);
      }
    }
  };

  const sendGhostInput = (val: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const action = encodeClientAction({
        submitAnswer: {
          playerId,
          answerValue: val,
          isGhostUpdate: true,
        },
      });
      wsRef.current.send(action);
    }
  };

  // Submit Answer Action
  useEffect(() => {
    if (status !== "active" || !gameState) return;
    const currentQ = gameState.nextQuestionText;
    if (!currentQ) return;

    // Fast check if answer is reached
    const checkSubmit = () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        const action = encodeClientAction({
          submitAnswer: {
            playerId,
            answerValue: currentInput,
            isGhostUpdate: false,
          },
        });
        wsRef.current.send(action);
        setCurrentInput("");
      }
    };

    // Auto submit if length matches or on enter/numeric lengths
    if (currentInput.length >= 4) {
      checkSubmit();
    }
  }, [currentInput, status, gameState]);

  const handleReconnectPress = () => {
    connectWebSocket(roomId);
  };

  const handleBackToMenu = () => {
    if (wsRef.current) wsRef.current.close();
    router.replace("/(tabs)");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored a victory in Elo Math Duel! Come battle me!`,
      });
    } catch {}
  };

  const isPlayerOne = gameState?.playerOne?.playerId === playerId;
  const me = isPlayerOne ? gameState?.playerOne : gameState?.playerTwo;
  const opponent = isPlayerOne ? gameState?.playerTwo : gameState?.playerOne;

  const animatedFlashStyle = useAnimatedStyle(() => ({
    backgroundColor: flashColor.value,
    opacity: flashOpacity.value,
  }));

  // 1. Handshake Handshake Loading
  if (status === "connecting") {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textMuted }]}>Establishing server handshake...</Text>
      </View>
    );
  }

  // 2. Radar Matchmaker Searching
  if (status === "queue") {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <GridBackdrop />
        <View style={styles.matchmakingContainer}>
          <Text style={[styles.matchmakingTitle, { color: colors.textMuted }]}>SEARCHING FOR OPPONENT</Text>
          <RadarScanner />
          <Button
            label="Cancel Search"
            onPress={handleBackToMenu}
            variant="secondary"
            style={styles.cancelBtn3D}
          />
        </View>
      </SafeAreaView>
    );
  }

  // 3. Disconnected Screen
  if (status === "disconnected") {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.disconnectedContainer}>
          <Text style={[styles.disconnectedTitle, { color: colors.text }]}>CONNECTION LOST</Text>
          <Text style={[styles.disconnectedText, { color: colors.textMuted }]}>
            You have disconnected from the server.
          </Text>
          <Button
            label="RECONNECT TO DUEL"
            onPress={handleReconnectPress}
            style={styles.reconnectBtn}
          />
          <Button
            label="EXIT TO MENU"
            onPress={handleBackToMenu}
            variant="secondary"
            style={[styles.cancelBtn3D, { marginTop: 12 }]}
          />
        </View>
      </SafeAreaView>
    );
  }

  // 4. Countdown Screen
  if (status === "countdown") {
    return (
      <View style={[styles.countdownContainer, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <Text style={[styles.countdownLabel, { color: colors.textMuted }]}>MATCH BEGINNING IN</Text>
        <Text style={[styles.countdownNum, { color: colors.primary }]}>{countdown}</Text>
      </View>
    );
  }

  // 5. Active Duel Gameplay Arena
  if (status === "active" && gameState && me && opponent) {
    const isPaused = gameState.state === MatchState.MATCH_STATE_PAUSED_DISCONNECT;
    const formattedTimer = `00:${timeRemaining.toString().padStart(2, "0")}`;

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <GridBackdrop />
        <Animated.View style={[StyleSheet.absoluteFill, animatedFlashStyle, { pointerEvents: "none", zIndex: 10 }]} />

        {isPaused ? (
          <View style={[styles.pausedOverlay, { backgroundColor: "rgba(0,0,0,0.85)" }]}>
            <ActivityIndicator size="large" color="#EF4444" style={{ marginBottom: 12 }} />
            <Text style={styles.pausedTitle}>OPPONENT DISCONNECTED</Text>
            <Text style={styles.pausedSubtitle}>Waiting 7s for reconnection...</Text>
          </View>
        ) : null}

        <View style={styles.battleContainer}>
          {/* Header row */}
          <View style={styles.battleHeader}>
            {/* Left section: me */}
            <View style={styles.playerSectionLeft}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={[styles.playerAvatarSquircle, { backgroundColor: colors.primary, borderColor: colors.cardBorder, borderWidth: 2 }]}>
                  <Text style={[styles.avatarInitial, { color: colors.onPrimary }]}>
                    {me.username[0].toUpperCase()}
                  </Text>
                </View>
                <View style={{ marginLeft: Spacing.sm }}>
                  <Text style={[styles.playerName, { color: colors.text }]}>You</Text>
                  <Text style={[styles.playerRating, { color: colors.textMuted }]}>1000</Text>
                </View>
              </View>
              <View style={[styles.scorePill, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
                <Text style={[styles.scorePillText, { color: colors.text }]}>{me.currentScore}</Text>
              </View>
            </View>

            {/* Center section: timer */}
            <View style={styles.timerPillWrapper}>
              <View style={[styles.timerPillActive, { borderColor: colors.accent, backgroundColor: colors.cardBg }]}>
                <IconSymbol name="star" size={10} color={colors.accent} style={{ marginRight: 4 }} />
                <Text style={[styles.timerPillText, { color: colors.accent }]}>{formattedTimer}</Text>
              </View>
            </View>

            {/* Right section: opponent */}
            <View style={styles.playerSectionRight}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginRight: Spacing.sm, alignItems: "flex-end" }}>
                  <Text style={[styles.playerName, { color: colors.text }]}>{opponent.username}</Text>
                  <Text style={[styles.playerRating, { color: colors.textMuted }]}>1026</Text>
                </View>
                <View style={[styles.playerAvatarCircle, { backgroundColor: colors.danger, borderColor: colors.cardBorder, borderWidth: 2 }]}>
                  <Text style={[styles.avatarInitial, { color: colors.onPrimary }]}>
                    {opponent.username[0].toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={[styles.scorePill, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
                <Text style={[styles.scorePillText, { color: colors.text }]}>{opponent.currentScore}</Text>
              </View>
            </View>
          </View>

          {/* Equation Grid Area */}
          <View style={styles.arena}>
            <Text style={[styles.questionText, { color: colors.text }]}>{gameState.nextQuestionText}</Text>
          </View>

          {/* Input field and keypad */}
          <View style={styles.inputKeypadArea}>
            <Text style={[styles.inputTypeLabel, { color: colors.textMuted }]}>TYPE OUT YOUR ANSWER</Text>
            <View style={[styles.inputBoxArea, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={[styles.inputBoxText, { color: currentInput ? colors.text : colors.textMuted }]}>
                {currentInput || "Enter answer"}
              </Text>
            </View>

            <Keypad onPress={handleKeyPress} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 6. Finished Results Screen Overhaul
  if (status === "finished" && gameState && me && opponent) {
    const isWinner = gameState.winnerId === playerId;
    const isDraw = gameState.winnerId === null;
    const myEloChange = isPlayerOne ? gameState.playerOneEloChange : gameState.playerTwoEloChange;
    const myXpChange = isPlayerOne ? gameState.playerOneXpChange : gameState.playerTwoXpChange;

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <GridBackdrop />

        {/* Action Header row */}
        <View style={styles.resultsHeaderActions}>
          <TouchableOpacity onPress={handleBackToMenu} style={[styles.resultsHeaderBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
            <IconSymbol name="house.fill" size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={[styles.resultsHeaderBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
            <IconSymbol name="code" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.resultsContainer}>
          {/* Layered 3D text banner */}
          <View style={styles.victoryBadge}>
            <Text style={[styles.layeredTextShadow, { color: "rgba(166,227,161,0.18)", transform: [{ translateX: 4 }, { translateY: 4 }] }]}>
              {isWinner ? "VICTORY" : isDraw ? "DRAW" : "DEFEAT"}
            </Text>
            <Text style={[styles.layeredTextShadow, { color: "rgba(166,227,161,0.36)", transform: [{ translateX: 2 }, { translateY: 2 }] }]}>
              {isWinner ? "VICTORY" : isDraw ? "DRAW" : "DEFEAT"}
            </Text>
            <Text style={[styles.layeredTextMain, { color: isWinner ? colors.success : isDraw ? "#F59E0B" : "#EF4444" }]}>
              {isWinner ? "VICTORY" : isDraw ? "DRAW" : "DEFEAT"}
            </Text>
          </View>

          {/* Scores values */}
          <Text style={[styles.vsScoreText, { color: colors.text }]}>
            <Text style={{ color: isWinner ? colors.success : colors.text }}>{me.currentScore}</Text>
            <Text style={{ color: colors.textMuted }}> - </Text>
            <Text style={{ color: !isWinner ? colors.success : colors.text }}>{opponent.currentScore}</Text>
          </Text>

          {/* Players sub labels */}
          <View style={styles.playerMetaRow}>
            <Text style={[styles.playerMetaName, { color: colors.text }]}>{me.username}</Text>
            <IconSymbol name="star" size={14} color={colors.success} style={{ marginHorizontal: 8 }} />
            <Text style={[styles.playerMetaName, { color: colors.text }]}>{opponent.username}</Text>
          </View>

          {/* Shifting Capsules */}
          <View style={styles.resultsStatRow}>
            <Card style={[styles.statOverlayCard, { borderColor: colors.cardBorder }]}>
              <Text style={[styles.statLabelHeader, { color: colors.textMuted }]}>RATING</Text>
              <Text style={[styles.statValueLarge, { color: colors.text }]}>
                {me.elo} <Text style={{ color: colors.success }}>+{myEloChange}</Text>
              </Text>
            </Card>

            <Card style={[styles.statOverlayCard, { borderColor: colors.cardBorder }]}>
              <Text style={[styles.statLabelHeader, { color: colors.textMuted }]}>TOTAL XP</Text>
              <Text style={[styles.statValueLarge, { color: colors.text }]}>
                {me.xp || 10} <Text style={{ color: colors.accent }}>+{myXpChange}</Text>
              </Text>
            </Card>
          </View>

          {/* Trigger buttons */}
          <View style={styles.bottomButtonsRow}>
            <Button
              label="REMATCH"
              variant="secondary"
              style={styles.rematchBtn}
              onPress={() => {}}
            />
            <Button
              label="NEW GAME"
              variant="success"
              style={styles.newGameBtn}
              onPress={handleBackToMenu}
            />
          </View>

          <Text style={[styles.swipeLabel, { color: colors.textMuted }]}>SWIPE UP FOR GAME ANALYSIS</Text>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: "monospace",
  },
  matchmakingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  matchmakingTitle: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 8,
  },
  radarContainer: {
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  radarRingOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  radarRingMiddle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  radarRingInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn3D: {
    width: 160,
    height: 44,
  },
  disconnectedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  disconnectedTitle: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 8,
  },
  disconnectedText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  reconnectBtn: {
    width: "100%",
    height: 48,
  },
  countdownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
    marginBottom: 16,
  },
  countdownNum: {
    fontSize: 100,
    fontWeight: "950",
  },
  battleContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  battleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  playerSectionLeft: {
    alignItems: "flex-start",
    flex: 1,
  },
  playerSectionRight: {
    alignItems: "flex-end",
    flex: 1,
  },
  playerAvatarSquircle: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  playerAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: "900",
  },
  playerName: {
    fontSize: 12,
    fontWeight: "800",
  },
  playerRating: {
    fontSize: 9,
    fontWeight: "600",
    marginTop: 1,
  },
  scorePill: {
    paddingHorizontal: 16,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  scorePillText: {
    fontSize: 12,
    fontWeight: "900",
  },
  timerPillWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerPillActive: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.md,
    borderWidth: 2,
  },
  timerPillText: {
    fontSize: 12,
    fontFamily: "monospace",
    fontWeight: "900",
  },
  arena: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 56,
  },
  inputKeypadArea: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    alignItems: "center",
  },
  inputTypeLabel: {
    fontSize: 9,
    fontWeight: "900",
    marginBottom: 8,
  },
  inputBoxArea: {
    width: "100%",
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 2.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  inputBoxText: {
    fontSize: 18,
    fontWeight: "800",
  },
  resultsHeaderActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    width: "100%",
  },
  resultsHeaderBtn: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: Radius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
  },
  victoryBadge: {
    position: "relative",
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  layeredTextShadow: {
    position: "absolute",
    fontSize: 48,
    fontWeight: "950",
    letterSpacing: 2,
  },
  layeredTextMain: {
    fontSize: 48,
    fontWeight: "950",
    letterSpacing: 2,
  },
  vsScoreText: {
    fontSize: 64,
    fontWeight: "900",
    marginVertical: Spacing.md,
  },
  playerMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  playerMetaName: {
    fontSize: 14,
    fontWeight: "800",
  },
  resultsStatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 36,
  },
  statOverlayCard: {
    width: "48%",
    height: 72,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
  statLabelHeader: {
    fontSize: 8,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  statValueLarge: {
    fontSize: 16,
    fontWeight: "900",
  },
  bottomButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: Spacing.xl,
  },
  rematchBtn: {
    width: "48%",
    height: 48,
  },
  newGameBtn: {
    width: "48%",
    height: 48,
  },
  swipeLabel: {
    fontSize: 9,
    fontWeight: "900",
  },
});
