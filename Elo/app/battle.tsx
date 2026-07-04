import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getBackendUrls } from "../src/utils/auth.ts";
import { decodeServerState, encodeClientAction, MatchState } from "../src/utils/protobuf.ts";
import { Keypad } from "../components/Keypad.tsx";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

export default function BattleScreen() {
  const router = useRouter();
  const { playerId } = useLocalSearchParams<{ playerId: string }>();

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

  useEffect(() => {
    // Geoping the closest edge region
    const fetchRegion = async () => {
      try {
        const urls = getBackendUrls();
        const res = await fetch(`${urls.http}/api/ping-region`);
        const data = await res.json();
        if (data.regionLabel) setConnectedRegion(data.regionLabel);
      } catch {}
    };
    fetchRegion();

    // 1. Measure FPS
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

    // 2. Measure average ping (sliding window every 3 seconds)
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

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [playerId]);

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
        // Request to join matchmaking queue
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

    ws.onerror = (e) => {
      console.error("WebSocket error:", e);
      setErrorMsg("Connection error. Retrying...");
    };

    ws.onclose = (e) => {
      console.log("WebSocket closed:", e.code, e.reason);
      setStatus("disconnected");
    };
  };

  const handleStateUpdate = (update: any) => {
    setGameState(update);
    setTimeRemaining(update.timeRemainingSeconds);

    // Sync reconnect info
    if (wsRef.current) {
      // In expo-router/RN we can save roomId inside ws instance
      (wsRef.current as any).roomId = update.roomId;
    }

    // Determine state
    if (update.state === MatchState.MATCH_STATE_COUNTDOWN) {
      setStatus("countdown");
      // Countdown is handled by the server ticking, but we can compute countdown value locally
      // Or just count down
      setCountdown(Math.max(1, Math.min(3, update.timeRemainingSeconds || 3)));
    } else if (update.state === MatchState.MATCH_STATE_ACTIVE) {
      setStatus("active");
    } else if (update.state === MatchState.MATCH_STATE_PAUSED_DISCONNECT) {
      setStatus("active"); // Keep game UI but maybe show a overlay
    } else if (update.state === MatchState.MATCH_STATE_FINISHED) {
      setStatus("finished");
      if (update.winnerId === playerId) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }

    // Reactive flash feedback
    const prev = prevStateRef.current;
    if (prev) {
      const isPlayerOne = update.playerOne.playerId === playerId;
      const me = isPlayerOne ? update.playerOne : update.playerTwo;
      const prevMe = isPlayerOne ? prev.playerOne : prev.playerTwo;

      if (me && prevMe) {
        // Correct answer flash (score went up)
        if (me.currentScore > prevMe.currentScore) {
          triggerFlash("rgba(16, 185, 129, 0.25)"); // Emerald Green
          setCurrentInput(""); // Clear local typing
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        // Wrong answer flash (streak reset to 0 but score did not go up)
        else if (me.currentStreak === 0 && prevMe.currentStreak > 0 && me.currentScore === prevMe.currentScore) {
          triggerFlash("rgba(239, 68, 68, 0.25)"); // Rose Red
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
      }
    }
    prevStateRef.current = update;
  };

  const triggerFlash = (color: string) => {
    flashColor.value = color;
    flashOpacity.value = withSequence(
      withTiming(1, { duration: 80 }),
      withTiming(0, { duration: 250 })
    );
  };

  const handleKeyPress = (key: string) => {
    if (status !== "active" || !gameState) return;

    let nextInput = currentInput;
    if (key === "delete") {
      nextInput = currentInput.slice(0, -1);
    } else {
      nextInput = currentInput + key;
    }

    setCurrentInput(nextInput);

    // Send update to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const buffer = encodeClientAction({
        roomId: gameState.roomId,
        playerId: playerId,
        timestamp: Date.now(),
        submittedAnswer: nextInput // Submit on every key for prefix-evaluation
      });
      wsRef.current.send(buffer);
    }
  };

  const handleBackToMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace("/(tabs)");
  };

  const handleReconnectPress = () => {
    const roomId = wsRef.current ? (wsRef.current as any).roomId : undefined;
    connectWebSocket(roomId);
  };

  // Reanimated style
  const animatedFlashStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: flashColor.value,
      opacity: flashOpacity.value,
    };
  });

  const { colors, themeId } = useThemeStore();

  const isPlayerOne = gameState && gameState.playerOne.playerId === playerId;
  const me = gameState ? (isPlayerOne ? gameState.playerOne : gameState.playerTwo) : null;
  const opponent = gameState ? (isPlayerOne ? gameState.playerTwo : gameState.playerOne) : null;

  // 1. Loading / Connecting Screen
  if (status === "connecting") {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textMuted }]}>Establishing server handshake...</Text>
      </View>
    );
  }

  // 2. Matchmaking Queue Screen
  if (status === "queue") {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.matchmakingContainer}>
          <ActivityIndicator size="large" color={colors.primary} style={{ marginBottom: 20 }} />
          <Text style={[styles.matchmakingTitle, { color: colors.text }]}>SEARCHING FOR DUEL</Text>
          <Text style={[styles.matchmakingSubtitle, { color: colors.textMuted }]}>Looking for opponent in your Elo rating...</Text>
          <Text style={[styles.matchmakingTip, { color: colors.textMuted }]}>Matches fall back to an adaptive bot after 20s</Text>
          <TouchableOpacity
            style={[styles.cancelBtn, { borderColor: colors.cardBorder }]}
            onPress={handleBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={[styles.cancelBtnText, { color: colors.text }]}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 3. Reconnect / Disconnected Screen
  if (status === "disconnected") {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.disconnectedContainer}>
          <Text style={[styles.disconnectedTitle, { color: colors.text }]}>CONNECTION LOST</Text>
          <Text style={[styles.disconnectedText, { color: colors.textMuted }]}>
            You have disconnected from the server.
          </Text>
          <TouchableOpacity
            style={[styles.reconnectBtn, { backgroundColor: colors.primary }]}
            onPress={handleReconnectPress}
            activeOpacity={0.8}
          >
            <Text style={styles.reconnectBtnText}>RECONNECT TO DUEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelBtn, { marginTop: 12, borderColor: colors.cardBorder }]}
            onPress={handleBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={[styles.cancelBtnText, { color: colors.text }]}>EXIT TO MENU</Text>
          </TouchableOpacity>
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

  // 5. Active Battle Screen
  if (status === "active" && gameState && me && opponent) {
    const isPaused = gameState.state === MatchState.MATCH_STATE_PAUSED_DISCONNECT;

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <Animated.View style={[StyleSheet.absoluteFill, animatedFlashStyle, { pointerEvents: "none", zIndex: 10 }]} />

        {isPaused ? (
          <View style={[styles.pausedOverlay, { backgroundColor: "rgba(0,0,0,0.85)" }]}>
            <ActivityIndicator size="large" color="#EF4444" style={{ marginBottom: 12 }} />
            <Text style={styles.pausedTitle}>OPPONENT DISCONNECTED</Text>
            <Text style={styles.pausedSubtitle}>Waiting 7s for reconnection before forfeit...</Text>
          </View>
        ) : null}

        <View style={styles.battleContainer}>
          {/* Top Bar: Progress and Timer */}
          <View style={styles.battleHeader}>
            <View style={styles.playerScoreBlock}>
              <Text style={[styles.battleUsername, { color: colors.text }]} numberOfLines={1}>{me.username}</Text>
              <Text style={[styles.battleTitle, { color: colors.primary }]} numberOfLines={1}>
                {me.activeTitle || `LVL ${me.level || 1}`}
              </Text>
              <Text style={[styles.battleScore, { color: colors.text }]}>{me.currentScore} / 20</Text>
              <Text style={[styles.battleStreak, { color: colors.accent }]}>Streak: {me.currentStreak}</Text>
            </View>

            <View style={styles.timerBlock}>
              <Text style={[styles.timerText, { color: colors.text }, timeRemaining <= 10 && styles.lowTimerText]}>
                {timeRemaining}s
              </Text>
            </View>

            <View style={[styles.playerScoreBlock, { alignItems: "flex-end" }]}>
              <Text style={[styles.battleUsername, { color: colors.text, textAlign: "right" }]} numberOfLines={1}>{opponent.username}</Text>
              <Text style={[styles.battleTitle, { color: colors.primary, textAlign: "right" }]} numberOfLines={1}>
                {opponent.activeTitle || `LVL ${opponent.level || 1}`}
              </Text>
              <Text style={[styles.battleScore, { color: colors.text, textAlign: "right" }]}>{opponent.currentScore} / 20</Text>
              <Text style={[styles.battleStreak, { color: colors.accent, textAlign: "right" }]}>Streak: {opponent.currentStreak}</Text>
            </View>
          </View>

          {/* Time Progress Bar */}
          <View style={[styles.progressBarContainer, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={[styles.progressBar, { width: `${(timeRemaining / (gameState.durationSeconds || 60)) * 100}%`, backgroundColor: timeRemaining <= 10 ? "#EF4444" : colors.primary }]} />
          </View>

          {/* Telemetry Control Panel */}
          <View style={styles.telemetryControlsRow}>
            <TouchableOpacity
              style={[styles.telemetryToggleBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}
              onPress={() => setShowTelemetry(!showTelemetry)}
            >
              <Text style={[styles.telemetryToggleText, { color: colors.textMuted }]}>
                {showTelemetry ? "HIDE METRICS" : "SHOW METRICS"}
              </Text>
            </TouchableOpacity>

            {showTelemetry && (
              <View style={[styles.telemetryPill, { backgroundColor: colors.cardBg, borderColor: colors.accentMuted }]}>
                <Text style={[styles.telemetryDataText, { color: colors.text }]}>
                  FPS: {fps} | PING: {ping}ms [{connectedRegion}] | LOSS: 0%
                </Text>
              </View>
            )}
          </View>

          {/* Core Battle Arena */}
          <View style={styles.arena}>
            <Text style={[styles.questionText, { color: colors.text }]}>{gameState.nextQuestionText}</Text>
            
            {/* Input Display Area */}
            <View style={[styles.inputDisplayArea, { borderBottomColor: colors.cardBorder }]}>
              <Text style={[styles.currentInputText, { color: colors.primary }]}>{currentInput || "?"}</Text>
            </View>

            {/* Opponent Ghost Progress */}
            <View style={styles.ghostProgressArea}>
              <Text style={[styles.ghostInputText, { color: colors.textMuted }]}>
                {opponent.ghostInput ? `${opponent.username} typing: ${opponent.ghostInput}` : "Opponent thinking..."}
              </Text>
            </View>
          </View>

          {/* Keypad */}
          <Keypad onPress={handleKeyPress} />
        </View>
      </SafeAreaView>
    );
  }

  // 6. Finished Results Screen
  if (status === "finished" && gameState && me && opponent) {
    const isWinner = gameState.winnerId === playerId;
    const isDraw = gameState.winnerId === null;
    const myEloChange = isPlayerOne ? gameState.playerOneEloChange : gameState.playerTwoEloChange;
    const myXpChange = isPlayerOne ? gameState.playerOneXpChange : gameState.playerTwoXpChange;

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultBanner, isWinner ? styles.winBanner : isDraw ? styles.drawBanner : styles.loseBanner]}>
            {isWinner ? "VICTORY" : isDraw ? "DRAW" : "DEFEAT"}
          </Text>

          <View style={[styles.resultsCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={styles.resultRow}>
              <View style={styles.resultCol}>
                <Text style={[styles.resultUsername, { color: colors.textMuted }]}>{me.username}</Text>
                <Text style={[styles.resultScoreBig, { color: colors.text }]}>{me.currentScore}</Text>
                <Text style={[styles.resultLabel, { color: colors.textMuted }]}>Correct Answers</Text>
              </View>

              <Text style={[styles.vsText, { color: colors.cardBorder }]}>VS</Text>

              <View style={[styles.resultCol, { alignItems: "flex-end" }]}>
                <Text style={[styles.resultUsername, { textAlign: "right", color: colors.textMuted }]}>{opponent.username}</Text>
                <Text style={[styles.resultScoreBig, { color: colors.text }]}>{opponent.currentScore}</Text>
                <Text style={[styles.resultLabel, { color: colors.textMuted }]}>Correct Answers</Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />

            <View style={styles.eloShiftSection}>
              {gameState.roomType === 0 && ( // ROOM_TYPE_RANKED
                <>
                  <Text style={[styles.eloShiftLabel, { color: colors.textMuted }]}>ELO RATING CHANGE</Text>
                  <Text style={[styles.eloShiftVal, myEloChange >= 0 ? styles.eloPositive : styles.eloNegative]}>
                    {myEloChange >= 0 ? `+${myEloChange}` : myEloChange}
                  </Text>
                  <Text style={[styles.newEloLabel, { color: colors.textMuted }]}>New Rating: {me.elo}</Text>
                  <View style={[styles.divider, { backgroundColor: colors.cardBorder, width: "100%" }]} />
                </>
              )}

              <Text style={[styles.eloShiftLabel, { color: colors.textMuted }]}>XP PROGRESS</Text>
              <Text style={[styles.eloShiftVal, { color: colors.accent }]}>
                +{myXpChange} XP
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.doneBtn, { backgroundColor: colors.primary }]}
            onPress={handleBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={styles.doneBtnText}>EXIT TO MENU</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0A0C",
  },
  telemetryControlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 10,
    height: 32,
  },
  telemetryToggleBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  telemetryToggleText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  telemetryPill: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  telemetryDataText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0A0A0C",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 12,
    fontSize: 16,
  },
  matchmakingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  matchmakingTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 8,
  },
  matchmakingSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    marginBottom: 4,
  },
  matchmakingTip: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.35)",
    textAlign: "center",
    marginBottom: 48,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cancelBtnText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
  },
  disconnectedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  disconnectedTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#EF4444",
    letterSpacing: 1,
    marginBottom: 8,
  },
  disconnectedText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    textAlign: "center",
    marginBottom: 24,
  },
  reconnectBtn: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  reconnectBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
  countdownContainer: {
    flex: 1,
    backgroundColor: "#0A0A0C",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.4)",
    letterSpacing: 3,
    marginBottom: 16,
  },
  countdownNum: {
    fontSize: 120,
    fontWeight: "900",
    color: "#6366F1",
  },
  battleContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  battleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  playerScoreBlock: {
    flex: 1,
  },
  battleUsername: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    fontWeight: "700",
  },
  battleScore: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 2,
  },
  battleStreak: {
    color: "#10B981",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 1,
  },
  timerBlock: {
    width: 60,
    alignItems: "center",
  },
  timerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  lowTimerText: {
    color: "#EF4444",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
  },
  progressBar: {
    height: "100%",
  },
  arena: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  questionText: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 20,
    letterSpacing: 1,
  },
  inputDisplayArea: {
    height: 72,
    minWidth: 120,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  currentInputText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#6366F1",
  },
  ghostProgressArea: {
    height: 24,
  },
  ghostInputText: {
    color: "rgba(255, 255, 255, 0.35)",
    fontSize: 13,
    fontStyle: "italic",
  },
  pausedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 10, 12, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
    paddingHorizontal: 32,
  },
  pausedTitle: {
    color: "#EF4444",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 8,
  },
  pausedSubtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  resultBanner: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 36,
  },
  winBanner: {
    color: "#10B981",
  },
  drawBanner: {
    color: "#F59E0B",
  },
  loseBanner: {
    color: "#EF4444",
  },
  resultsCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 24,
    marginBottom: 40,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultCol: {
    flex: 1,
  },
  resultUsername: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "700",
  },
  resultScoreBig: {
    fontSize: 40,
    fontWeight: "900",
    color: "#FFF",
    marginTop: 6,
  },
  resultLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 4,
  },
  vsText: {
    color: "rgba(255, 255, 255, 0.2)",
    fontSize: 18,
    fontWeight: "800",
    marginHorizontal: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginVertical: 20,
  },
  eloShiftSection: {
    alignItems: "center",
  },
  eloShiftLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.4)",
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  eloShiftVal: {
    fontSize: 36,
    fontWeight: "900",
    marginTop: 6,
  },
  eloPositive: {
    color: "#10B981",
  },
  eloNegative: {
    color: "#EF4444",
  },
  newEloLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  doneBtn: {
    backgroundColor: "#6366F1",
    height: 56,
    width: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  doneBtnText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },
});
