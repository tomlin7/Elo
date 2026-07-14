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
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

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
          setRoomCode(update.privateRoomCode);
          setMode("waiting");
        } else if (update.state === MatchState.MATCH_STATE_COUNTDOWN || update.state === MatchState.MATCH_STATE_ACTIVE) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          if (wsRef.current) wsRef.current.close();
          router.replace({
            pathname: "/battle",
            params: { playerId: profile.id, roomId: update.roomId }
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

            <Button
              label="CREATE CUSTOM ROOM"
              onPress={() => setMode("create")}
              style={{ marginBottom: 12 }}
            />

            <Button
              label="JOIN PRIVATE ROOM"
              onPress={() => setMode("join")}
              variant="secondary"
              style={{ marginBottom: 36 }}
            />

            <Button
              label="BACK TO MAIN MENU"
              onPress={() => router.replace("/(tabs)")}
              variant="ghost"
            />
          </View>
        );

      case "create":
        return (
          <View style={styles.menuContainer}>
            <Text style={[styles.title, { color: colors.text }]}>ROOM SETTINGS</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>Customize your duel modifiers</Text>

            <Card style={{ marginBottom: 20 }}>
              <View style={[styles.settingRow, { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Allow Multiplication</Text>
                <TouchableOpacity
                  style={[styles.toggleBtn, { borderWidth: 2, borderColor: "#000" }, allowMultiplication ? { backgroundColor: colors.primary } : { backgroundColor: "rgba(255,255,255,0.05)" }]}
                  onPress={() => setAllowMultiplication(!allowMultiplication)}
                >
                  <Text style={styles.toggleText}>{allowMultiplication ? "YES" : "NO"}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.settingRow, { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Allow Division</Text>
                <TouchableOpacity
                  style={[styles.toggleBtn, { borderWidth: 2, borderColor: "#000" }, allowDivision ? { backgroundColor: colors.primary } : { backgroundColor: "rgba(255,255,255,0.05)" }]}
                  onPress={() => setAllowDivision(!allowDivision)}
                >
                  <Text style={styles.toggleText}>{allowDivision ? "YES" : "NO"}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingRow}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Round Duration</Text>
                <View style={styles.durationSelector}>
                  {[30, 60, 120].map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[
                        styles.durationOption,
                        { borderWidth: 2, borderColor: "#000" },
                        duration === d ? { backgroundColor: colors.primary } : { backgroundColor: "rgba(255,255,255,0.05)" }
                      ]}
                      onPress={() => setDuration(d)}
                    >
                      <Text style={styles.durationText}>{d}s</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Card>

            <Button
              label="GENERATE ROOM CODE"
              onPress={handleCreateRoom}
              style={{ marginTop: 12, marginBottom: 12 }}
            />

            <Button
              label="CANCEL"
              onPress={() => setMode("menu")}
              variant="ghost"
            />
          </View>
        );

      case "waiting":
        return (
          <View style={styles.menuContainer}>
            <Text style={[styles.title, { color: colors.text }]}>ROOM CREATED</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>Share this 6-digit code with your opponent</Text>

            <Card style={styles.codeBox}>
              <Text style={[styles.codeText, { color: colors.accent }]}>{roomCode}</Text>
            </Card>

            <Button
              label="SHARE INVITE CODE"
              onPress={handleShareCode}
              style={{ marginBottom: 20 }}
            />

            <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 24, marginBottom: 8 }} />
            <Text style={[styles.waitingLabel, { color: colors.textMuted }]}>Waiting for opponent to connect...</Text>

            <Button
              label="FORFEIT / CLOSE ROOM"
              onPress={() => {
                if (wsRef.current) wsRef.current.close();
                setMode("menu");
              }}
              variant="ghost"
            />
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

            <Button
              label="CONNECT & DUEL"
              onPress={handleJoinRoom}
              style={{ marginTop: 16, marginBottom: 12 }}
            />

            <Button
              label="BACK"
              onPress={() => setMode("menu")}
              variant="ghost"
            />
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
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  settingLabel: {
    fontSize: 15,
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
  codeBox: {
    alignItems: "center",
    marginBottom: 24,
    marginRight: 0,
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
    borderWidth: 2,
    borderRadius: 18,
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 6,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginBottom: 16,
  },
});
