import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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

interface TournamentNode {
  nodeId: string;
  roundTier: number;
  status: number;
  playerOneId: string;
  playerTwoId: string;
  playerOneUsername: string;
  playerTwoUsername: string;
  winnerId: string;
  activeRoomId: string;
}

export default function TournamentLobbyScreen() {
  const router = useRouter();
  const { colors, themeId } = useThemeStore();
  const { profile } = useProfileStore();

  const [status, setStatus] = useState<"queue" | "bracket" | "finished">("queue");
  const [pooledCount, setPooledCount] = useState(1);
  const [bracketNodes, setBracketNodes] = useState<TournamentNode[]>([]);
  const [winnerId, setWinnerId] = useState("");
  const [loading, setLoading] = useState(true);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    connectTournamentWS();
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  const connectTournamentWS = () => {
    if (!profile) return;
    setLoading(true);

    const urls = getBackendUrls();
    const ws = new WebSocket(`${urls.ws}?playerId=${profile.id}`);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      setLoading(false);
      // Join tournament queue
      const action = encodeClientAction({
        playerId: profile.id,
        joinTournamentPlayerId: profile.id
      });
      ws.send(action);
    };

    ws.onmessage = (event) => {
      try {
        const buffer = new Uint8Array(event.data as ArrayBuffer);
        const update = decodeServerState(buffer);

        // Check if player's sub-room is countdown/active -> jump straight to battle!
        if (update.state === MatchState.MATCH_STATE_COUNTDOWN || update.state === MatchState.MATCH_STATE_ACTIVE) {
          if (wsRef.current) wsRef.current.close();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          router.replace({
            pathname: "/battle",
            params: { playerId: profile.id, roomId: update.roomId }
          });
          return;
        }

        if (update.bracketUpdate) {
          setStatus("bracket");
          setBracketNodes(update.bracketUpdate.bracketNodes as TournamentNode[]);
        }

        if (update.state === MatchState.MATCH_STATE_FINISHED && update.winnerId) {
          setStatus("finished");
          setWinnerId(update.winnerId);
        }
      } catch (err) {
        console.error("Bracket sync error:", err);
      }
    };

    ws.onerror = () => {
      setLoading(false);
    };
  };

  const handleSpectate = (roomId: string) => {
    if (!roomId) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (wsRef.current) wsRef.current.close();
    router.push({
      pathname: "/spectator",
      params: { roomId }
    });
  };

  const renderNode = (node: TournamentNode) => {
    const isP1Winner = node.status === 2 && node.winnerId === node.playerOneId;
    const isP2Winner = node.status === 2 && node.winnerId === node.playerTwoId;
    const inProgress = node.status === 1;

    return (
      <View key={node.nodeId} style={[styles.nodeCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.playerRow}>
          <Text style={[styles.playerName, { color: isP1Winner ? colors.accent : colors.text }, !node.playerOneId && { color: colors.textMuted }]}>
            {node.playerOneUsername || "TBD"}
          </Text>
          {isP1Winner && <Text style={[styles.wBadge, { color: colors.accent }]}>W</Text>}
        </View>
        <View style={[styles.nodeDivider, { backgroundColor: colors.cardBorder }]} />
        <View style={styles.playerRow}>
          <Text style={[styles.playerName, { color: isP2Winner ? colors.accent : colors.text }, !node.playerTwoId && { color: colors.textMuted }]}>
            {node.playerTwoUsername || "TBD"}
          </Text>
          {isP2Winner && <Text style={[styles.wBadge, { color: colors.accent }]}>W</Text>}
        </View>

        {inProgress && node.activeRoomId ? (
          <TouchableOpacity
            style={[styles.specBtn, { backgroundColor: colors.primary }]}
            onPress={() => handleSpectate(node.activeRoomId)}
          >
            <Text style={styles.specText}>SPECTATE MATCH</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  if (loading || status === "queue") {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.title, { color: colors.text, marginTop: 24 }]}>TOURNAMENT MATCHMAKING</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Pooling 8 competitors of comparable ratings...</Text>
          <TouchableOpacity
            style={[styles.cancelBtn, { borderColor: colors.cardBorder }]}
            onPress={() => {
              if (wsRef.current) wsRef.current.close();
              router.replace("/(tabs)");
            }}
          >
            <Text style={[styles.cancelText, { color: colors.text }]}>LEAVE QUEUE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (status === "finished") {
    const winnerUsername = bracketNodes.find(n => n.nodeId === "F1")?.playerOneId === winnerId
      ? bracketNodes.find(n => n.nodeId === "F1")?.playerOneUsername
      : bracketNodes.find(n => n.nodeId === "F1")?.playerTwoUsername;

    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar style={themeId === "light" ? "dark" : "light"} />
        <View style={styles.centerContainer}>
          <Text style={[styles.trophy, { color: colors.accent }]}>🏆</Text>
          <Text style={[styles.title, { color: colors.text }]}>TOURNAMENT COMPLETE</Text>
          <Text style={[styles.winnerLabel, { color: colors.accent }]}>WINNER: {winnerUsername || "Champion"}</Text>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary, marginTop: 40, width: 240 }]}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.buttonText}>BACK TO MENU</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const qfs = bracketNodes.filter(n => n.roundTier === 1);
  const sfs = bracketNodes.filter(n => n.roundTier === 2);
  const finals = bracketNodes.filter(n => n.roundTier === 3);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={themeId === "light" ? "dark" : "light"} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.logoText, { color: colors.primary }]}>LIVE BRACKETS</Text>
          <TouchableOpacity
            style={[styles.exitBtn, { borderColor: colors.cardBorder }]}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={[styles.exitText, { color: colors.textMuted }]}>EXIT</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal contentContainerStyle={styles.bracketContainer} showsHorizontalScrollIndicator={false}>
          {/* Quarterfinals */}
          <View style={styles.roundColumn}>
            <Text style={[styles.roundLabel, { color: colors.textMuted }]}>QUARTERFINALS</Text>
            {qfs.map(renderNode)}
          </View>

          {/* Semifinals */}
          <View style={[styles.roundColumn, { justifyContent: "space-around" }]}>
            <Text style={[styles.roundLabel, { color: colors.textMuted }]}>SEMIFINALS</Text>
            {sfs.map(renderNode)}
          </View>

          {/* Finals */}
          <View style={[styles.roundColumn, { justifyContent: "center" }]}>
            <Text style={[styles.roundLabel, { color: colors.textMuted, marginBottom: 20 }]}>FINALS</Text>
            {finals.map(renderNode)}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  exitBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  exitText: {
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
  },
  cancelBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  bracketContainer: {
    paddingLeft: 24,
    paddingRight: 64,
  },
  roundColumn: {
    width: 220,
    marginRight: 32,
    paddingVertical: 20,
  },
  roundLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 16,
    textAlign: "center",
  },
  nodeCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 24,
    justifyContent: "center",
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 28,
  },
  playerName: {
    fontSize: 13,
    fontWeight: "700",
  },
  wBadge: {
    fontSize: 11,
    fontWeight: "900",
  },
  nodeDivider: {
    height: 1,
    marginVertical: 6,
  },
  specBtn: {
    marginTop: 12,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  specText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  trophy: {
    fontSize: 72,
    marginBottom: 20,
  },
  winnerLabel: {
    fontSize: 20,
    fontWeight: "900",
    marginTop: 12,
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
