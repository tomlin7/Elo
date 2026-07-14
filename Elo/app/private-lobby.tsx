import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { useProfileStore } from "../src/store/profileStore.ts";
import { getBackendUrls } from "../src/utils/auth.ts";
import { decodeServerState, encodeClientAction, MatchState } from "../src/utils/protobuf.ts";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";

export default function PrivateLobbyScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const { profile } = useProfileStore();

  const [mode, setMode] = useState<"menu" | "create" | "waiting" | "join">("menu");
  
  // Custom room configuration
  const [allowDivision, setAllowDivision] = useState(false);
  const [allowMultiplication, setAllowMultiplication] = useState(true);
  const [duration, setDuration] = useState(60);

  // Joining state
  const [joinCode, setJoinCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const connectPrivateWebSocket = (onOpenCallback: (ws: WebSocket) => void) => {
    if (!profile) return;
    setLoading(true);

    const urls = getBackendUrls();
    const ws = new WebSocket(`${urls.ws}?playerId=${profile.id}`);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      setLoading(false);
      onOpenCallback(ws);
    };

    ws.onmessage = (event) => {
      try {
        const buffer = new Uint8Array(event.data as ArrayBuffer);
        const update = decodeServerState(buffer);

        if (update.privateRoomCode && update.state === MatchState.MATCH_STATE_UNSPECIFIED) {
          // Lobby created, waiting for opponent
          setRoomCode(update.privateRoomCode);
          setMode("waiting");
        } else if (update.state === MatchState.MATCH_STATE_COUNTDOWN || update.state === MatchState.MATCH_STATE_ACTIVE) {
          // Game started! Transition immediately to battle
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          if (wsRef.current) wsRef.current.close(); // Close this temporary config connection
          router.replace({
            pathname: "/battle",
            params: { playerId: profile.id, roomId: update.roomId } // Will trigger reconnection in battle screen
          });
        } else if (update.winnerId === "error_invalid_code") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          Alert.alert("Error", "Invalid or expired room code. Please try again.");
          setMode("join");
          if (wsRef.current) wsRef.current.close();
        }
      } catch (err) {
        console.error("Lobby message error:", err);
      }
    };

    ws.onerror = (e) => {
      setLoading(false);
      Alert.alert("Connection Error", "Failed to reach game server.");
    };

    ws.onclose = () => {
      setLoading(false);
    };
  };

  const handleCreateRoom = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    connectPrivateWebSocket((ws) => {
      const action = encodeClientAction({
        playerId: profile?.id,
        createCustomRoom: {
          hostPlayerId: profile?.id,
          allowDivision,
          allowMultiplication,
          customDurationSeconds: duration
        }
      });
      ws.send(action);
    });
  };

  const handleJoinRoom = () => {
    if (joinCode.trim().length !== 6) {
      Alert.alert("Invalid Code", "Please enter a 6-digit room code.");
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    connectPrivateWebSocket((ws) => {
      const action = encodeClientAction({
        playerId: profile?.id,
        joinPrivateRoomCode: joinCode.trim()
      });
      ws.send(action);
    });
  };

  const handleShareCode = async () => {
    if (!roomCode) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `Duel me in mental math on Elo! Join room code: ${roomCode}`
      });
    } catch (e) {
      console.log("Error sharing:", e);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textMuted }]}>Configuring lobby...</Text>
        </View>
      );
    }

    switch (mode) {
      case "menu":
        return (
          <View style={styles.menuContainer}>
            <Text style={[styles.title, { color: colors.text }]}>PRIVATE DUEL</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>Play custom matches with friends</Text>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => setMode("create")}
            >
              <Text style={styles.buttonText}>CREATE CUSTOM ROOM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}
              onPress={() => setMode("join")}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.text }]}>JOIN PRIVATE ROOM</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.backButton, { borderTopColor: colors.cardBorder }]}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={[styles.backButtonText, { color: colors.textMuted }]}>BACK TO MAIN MENU</Text>
            </TouchableOpacity>
          </View>
        );

      case "create":
        return (
          <View style={styles.menuContainer}>
            <Text style={[styles.title, { color: colors.text }]}>ROOM SETTINGS</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>Customize your duel modifiers</Text>

            {/* Custom Rules Selection */}
            <View style={[styles.settingRow, { borderBottomColor: colors.cardBorder }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Allow Multiplication</Text>
              <TouchableOpacity
                style={[styles.toggleBtn, allowMultiplication ? { backgroundColor: colors.primary } : { backgroundColor: "rgba(255,255,255,0.05)" }]}
                onPress={() => setAllowMultiplication(!allowMultiplication)}
              >
                <Text style={styles.toggleText}>{allowMultiplication ? "YES" : "NO"}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.settingRow, { borderBottomColor: colors.cardBorder }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Allow Division (Integer)</Text>
              <TouchableOpacity
                style={[styles.toggleBtn, allowDivision ? { backgroundColor: colors.primary } : { backgroundColor: "rgba(255,255,255,0.05)" }]}
                onPress={() => setAllowDivision(!allowDivision)}
              >
                <Text style={styles.toggleText}>{allowDivision ? "YES" : "NO"}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.settingRow, { borderBottomColor: colors.cardBorder }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Round Duration</Text>
              <View style={styles.durationSelector}>
                {[30, 60, 120].map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.durationOption,
                      duration === d ? { backgroundColor: colors.primary } : { backgroundColor: "rgba(255,255,255,0.05)" }
                    ]}
                    onPress={() => setDuration(d)}
                  >
                    <Text style={styles.durationText}>{d}s</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary, marginTop: 24 }]}
              onPress={handleCreateRoom}
            >
              <Text style={styles.buttonText}>GENERATE ROOM CODE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelLink}
              onPress={() => setMode("menu")}
            >
              <Text style={[styles.cancelText, { color: colors.textMuted }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        );

      case "waiting":
        return (
          <View style={styles.menuContainer}>
            <Text style={[styles.title, { color: colors.text }]}>ROOM CREATED</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>Share this 6-digit code with your opponent</Text>

            <View style={[styles.codeBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={[styles.codeText, { color: colors.accent }]}>{roomCode}</Text>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={handleShareCode}
            >
              <Text style={styles.buttonText}>SHARE INVITE CODE</Text>
            </TouchableOpacity>

            <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 32, marginBottom: 8 }} />
            <Text style={[styles.waitingLabel, { color: colors.textMuted }]}>Waiting for opponent to connect...</Text>

            <TouchableOpacity
              style={styles.cancelLink}
              onPress={() => {
                if (wsRef.current) wsRef.current.close();
                setMode("menu");
              }}
            >
              <Text style={[styles.cancelText, { color: colors.textMuted }]}>Forfeit / Close Room</Text>
            </TouchableOpacity>
          </View>
        );

      case "join":
        return (
          <View style={styles.menuContainer}>
            <Text style={[styles.title, { color: colors.text }]}>JOIN ROOM</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>{"Enter your friend's 6-digit access code"}</Text>

            <TextInput
              style={[styles.codeInput, { borderColor: colors.cardBorder, color: colors.text }]}
              placeholder="000000"
              placeholderTextColor="rgba(255,255,255,0.2)"
              maxLength={6}
              keyboardType="number-pad"
              value={joinCode}
              onChangeText={(text) => setJoinCode(text.replace(/[^0-9]/g, ""))}
            />

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary, marginTop: 16 }]}
              onPress={handleJoinRoom}
            >
              <Text style={styles.buttonText}>CONNECT & DUEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelLink}
              onPress={() => setMode("menu")}
            >
              <Text style={[styles.cancelText, { color: colors.textMuted }]}>Back</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <View style={styles.container}>{renderContent()}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  centerContainer: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
  },
  menuContainer: {
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },
  primaryButton: {
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8AFF29",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  secondaryButton: {
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1,
  },
  backButton: {
    borderTopWidth: 1,
    paddingTop: 24,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  toggleBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    width: 68,
    alignItems: "center",
  },
  toggleText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },
  durationSelector: {
    flexDirection: "row",
  },
  durationOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 6,
    width: 52,
    alignItems: "center",
  },
  durationText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },
  cancelLink: {
    marginTop: 20,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "700",
  },
  codeBox: {
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 24,
  },
  codeText: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 6,
  },
  waitingLabel: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 40,
  },
  codeInput: {
    height: 72,
    borderWidth: 1,
    borderRadius: 18,
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 6,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 16,
  },
});
