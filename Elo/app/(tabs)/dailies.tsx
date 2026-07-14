import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useProfileStore } from "../../src/store/profileStore.ts";
import { useThemeStore } from "../../src/store/themeStore.ts";
import { Screen } from "@/components/ui/Screen";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCapsuleRow } from "@/components/ui/StatCapsuleRow";
import { Spacing, Radius } from "@/constants/design";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ShapesComposition } from "@/components/ui/Shapes";

interface PuzzleCardProps {
  title: string;
  desc: string;
  iconName: "grid.sharp" | "plus.square.fill" | "atom" | "arrow.triangle.path";
  isHard: boolean;
  onToggleDifficulty: () => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ title, desc, iconName, isHard, onToggleDifficulty }) => {
  const { colors } = useThemeStore();

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <IconSymbol name={iconName} size={24} color={colors.primary} style={styles.cardIcon} />
        <View style={styles.titleBlock}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "95%" }}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
            <ShapesComposition type="miniDecor" />
          </View>
          <Text style={[styles.cardDesc, { color: colors.textMuted }]}>{desc}</Text>
        </View>
      </View>

      <View style={[styles.toggleRow, { backgroundColor: colors.background, borderColor: colors.cardBorder, borderWidth: 2 }]}>
        <TouchableOpacity
          style={[styles.toggleBtn, !isHard && { backgroundColor: colors.cardBg }]}
          onPress={() => isHard && onToggleDifficulty()}
        >
          <Text style={[styles.toggleBtnText, { color: colors.textMuted }, !isHard && { color: colors.primary, fontWeight: "900" }]}>EASY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, isHard && { backgroundColor: colors.cardBg }]}
          onPress={() => !isHard && onToggleDifficulty()}
        >
          <Text style={[styles.toggleBtnText, { color: colors.textMuted }, isHard && { color: colors.primary, fontWeight: "900" }]}>HARD</Text>
        </TouchableOpacity>
      </View>

      <Button label="SOLVE PUZZLE" style={styles.solveBtn} compact />
    </Card>
  );
};

export default function DailiesScreen() {
  const { profile } = useProfileStore();
  const { colors } = useThemeStore();
  const [sudokuHard, setSudokuHard] = useState(false);
  const [crossMathHard, setCrossMathHard] = useState(false);
  const [kenKenHard, setKenKenHard] = useState(false);
  const [mazeHard, setMazeHard] = useState(false);
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    if (profile?.id) {
      fetch(`http://10.0.2.2:8080/api/profile/challenges?playerId=${profile.id}`)
        .then(r => r.json())
        .then(data => setChallenges(Array.isArray(data) ? data : []))
        .catch(() => {});
    }
  }, [profile?.id]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <StatCapsuleRow
          stats={[
            { icon: "dollarsign.circle.fill", value: `${profile?.credits ?? 0} Pies` },
            { icon: "bolt", value: `${profile?.dailyStreak ?? 0} Streaks` },
            { icon: "star", value: `${profile?.xp ?? 0} XP` },
          ]}
        />

        <Card style={styles.trackerCard}>
          <Text style={[styles.trackerTitle, { color: colors.text }]}>Daily Target Milestones</Text>
          {challenges.map((ch: any) => (
            <View key={ch.id} style={styles.trackerRow}>
              <View style={styles.trackerInfo}>
                <Text style={[styles.trackerName, { color: colors.textMuted }]}>{ch.challenge_type.replace(/_/g, " ")}</Text>
                <Text style={[styles.trackerVal, { color: colors.primary }]}>
                  {ch.current_value}/{ch.target_value} ({ch.is_completed ? "Completed" : `+${ch.reward_stars} CS`})
                </Text>
              </View>
              <View style={[styles.barTrack, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <View style={[
                  styles.barFill,
                  { width: `${Math.min(100, (ch.current_value / ch.target_value) * 100)}%`, backgroundColor: ch.is_completed ? colors.success : colors.primary },
                ]} />
              </View>
            </View>
          ))}
          {challenges.length === 0 && (
            <Text style={[styles.noChallengesText, { color: colors.textMuted }]}>Solve matches in Arena Hub to clear targets!</Text>
          )}
        </Card>

        <SectionLabel>BRAIN-TRAINING PUZZLES</SectionLabel>
        <View style={styles.puzzleGrid}>
          <PuzzleCard title="Sudoku" desc="Complete the classic grid challenge." iconName="grid.sharp" isHard={sudokuHard} onToggleDifficulty={() => setSudokuHard(!sudokuHard)} />
          <PuzzleCard title="Cross Math" desc="Solve intersecting equation paths." iconName="plus.square.fill" isHard={crossMathHard} onToggleDifficulty={() => setCrossMathHard(!crossMathHard)} />
          <PuzzleCard title="KenKen" desc="Segmented calculations grid." iconName="atom" isHard={kenKenHard} onToggleDifficulty={() => setKenKenHard(!kenKenHard)} />
          <PuzzleCard title="Math Maze" desc="Find the arithmetic route." iconName="arrow.triangle.path" isHard={mazeHard} onToggleDifficulty={() => setMazeHard(!mazeHard)} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: Spacing.xxxl },
  trackerCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.xl },
  trackerTitle: { fontSize: 14, fontWeight: "700", marginBottom: Spacing.md },
  trackerRow: { marginBottom: 10 },
  trackerInfo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  trackerName: { fontSize: 12, fontWeight: "600" },
  trackerVal: { fontSize: 12, fontWeight: "700" },
  barTrack: { height: 12, borderRadius: Radius.sm, overflow: "hidden", borderWidth: 2 },
  barFill: { height: "100%" },
  noChallengesText: { fontSize: 12, textAlign: "center", marginVertical: 8 },
  puzzleGrid: { paddingHorizontal: Spacing.lg },
  card: { marginBottom: Spacing.lg },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: Spacing.md },
  cardIcon: { marginRight: Spacing.md },
  titleBlock: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  cardDesc: { fontSize: 11, marginTop: 2, lineHeight: 14 },
  toggleRow: { flexDirection: "row", borderRadius: Radius.sm, padding: 2, marginBottom: Spacing.md },
  toggleBtn: { flex: 1, paddingVertical: 6, alignItems: "center", borderRadius: 6 },
  toggleBtnText: { fontSize: 10, fontWeight: "700" },
  solveBtn: { width: "100%" }
});
