import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "../src/store/themeStore.ts";
import { useProfileStore } from "../src/store/profileStore.ts";
import { getBackendUrls } from "../src/utils/auth.ts";
import { decodeServerState, encodeClientAction, MatchState } from "../src/utils/protobuf.ts";
import * as Haptics from "expo-haptics";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Spacing, Typography } from "@/constants/design";
import { IconSymbol } from "@/components/ui/icon-symbol";

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
  const { colors } = useThemeStore();
  const { profile } = useProfileStore();

  const [status, setStatus] = useState<"queue" | "bracket" | "finished">("queue");
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
      <Card key={node.nodeId} style={styles.nodeCard}>
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
          <Button
            label="SPECTATE MATCH"
            variant="primary"
            compact
            onPress={() => handleSpectate(node.activeRoomId)}
            style={styles.specBtn}
          />
        ) : null}
      </Card>
    );
  };

  if (loading || status === "queue") {
    return (
      <Screen>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.title, { color: colors.text, marginTop: Spacing.xl }]}>TOURNAMENT MATCHMAKING</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Pooling 8 competitors of comparable ratings...</Text>
          <Button
            label="LEAVE QUEUE"
            variant="secondary"
            onPress={() => {
              if (wsRef.current) wsRef.current.close();
              router.replace("/(tabs)");
            }}
            style={styles.cancelBtn}
          />
        </View>
      </Screen>
    );
  }

  if (status === "finished") {
    const winnerUsername = bracketNodes.find(n => n.nodeId === "F1")?.playerOneId === winnerId
      ? bracketNodes.find(n => n.nodeId === "F1")?.playerOneUsername
      : bracketNodes.find(n => n.nodeId === "F1")?.playerTwoUsername;

    return (
      <Screen>
        <View style={styles.centerContainer}>
          <IconSymbol name="star" size={72} color={colors.accent} style={{ marginBottom: Spacing.xl }} />
          <Text style={[styles.title, { color: colors.text }]}>TOURNAMENT COMPLETE</Text>
          <Text style={[styles.winnerLabel, { color: colors.accent }]}>WINNER: {winnerUsername || "Champion"}</Text>
          <Button
            label="BACK TO MENU"
            variant="primary"
            onPress={() => router.replace("/(tabs)")}
            style={styles.primaryBtn}
          />
        </View>
      </Screen>
    );
  }

  const qfs = bracketNodes.filter(n => n.roundTier === 1);
  const sfs = bracketNodes.filter(n => n.roundTier === 2);
  const finals = bracketNodes.filter(n => n.roundTier === 3);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.logoText, { color: colors.primary }]}>LIVE BRACKETS</Text>
          <Button
            label="EXIT"
            variant="secondary"
            compact
            onPress={() => router.replace("/(tabs)")}
            style={styles.exitBtn}
          />
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
            <Text style={[styles.roundLabel, { color: colors.textMuted, marginBottom: Spacing.xl }]}>FINALS</Text>
            {finals.map(renderNode)}
          </View>
        </ScrollView>
      </View>
    </Screen>
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
    paddingHorizontal: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  logoText: {
    ...Typography.title,
    fontSize: 24,
  },
  exitBtn: {
    height: 34,
    paddingHorizontal: Spacing.md,
  },
  title: {
    ...Typography.heading,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    ...Typography.body,
    textAlign: "center",
    marginBottom: Spacing.xxxl,
  },
  cancelBtn: {
    width: 240,
  },
  primaryBtn: {
    marginTop: Spacing.xxl,
    width: 240,
  },
  bracketContainer: {
    paddingLeft: Spacing.xl,
    paddingRight: 64,
  },
  roundColumn: {
    width: 220,
    marginRight: Spacing.xxl,
    paddingVertical: Spacing.xl,
  },
  roundLabel: {
    ...Typography.label,
    marginBottom: Spacing.lg,
    textAlign: "center",
  },
  nodeCard: {
    marginBottom: Spacing.xl,
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
    height: 34,
  },
  trophy: {
    fontSize: 72,
    marginBottom: Spacing.xl,
  },
  winnerLabel: {
    ...Typography.heading,
    fontSize: 20,
    marginTop: 12,
  },
});
