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

interface PuzzleCardProps {
  title: string;
  desc: string;
  icon: string;
  isHard: boolean;
  onToggleDifficulty: () => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ title, desc, icon, isHard, onToggleDifficulty }) => {
  const { colors } = useThemeStore();

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.titleBlock}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.cardDesc, { color: colors.textMuted }]}>{desc}</Text>
        </View>
      </View>

      <View style={[styles.toggleRow, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.toggleBtn, !isHard && { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: 1 }]}
          onPress={() => isHard && onToggleDifficulty()}
        >
          <Text style={[styles.toggleBtnText, { color: colors.textMuted }, !isHard && { color: colors.primary }]}>EASY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, isHard && { backgroundColor: colors.cardBg, borderColor: colors.cardBorder, borderWidth: 1 }]}
          onPress={() => !isHard && onToggleDifficulty()}
        >
          <Text style={[styles.toggleBtnText, { color: colors.textMuted }, isHard && { color: colors.primary }]}>HARD 🔒</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.solveBtn, { backgroundColor: colors.primary }]}>
        <Text style={[styles.solveBtnText, { color: colors.onPrimary }]}>SOLVE PUZZLE</Text>
      </TouchableOpacity>
    </View>
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
            { icon: "π", value: `${profile?.credits ?? 0} Pies` },
            { icon: "🔥", value: `${profile?.dailyStreak ?? 0} Streaks` },
            { icon: "⬡", value: `${profile?.xp ?? 0} XP` },
          ]}
        />

        <View style={[styles.trackerCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.trackerTitle, { color: colors.text }]}>🎯 Daily Target Milestones</Text>
          {challenges.map((ch: any) => (
            <View key={ch.id} style={styles.trackerRow}>
              <View style={styles.trackerInfo}>
                <Text style={[styles.trackerName, { color: colors.textMuted }]}>{ch.challenge_type.replace(/_/g, " ")}</Text>
                <Text style={[styles.trackerVal, { color: colors.primary }]}>
                  {ch.current_value}/{ch.target_value} ({ch.is_completed ? "Completed" : `+${ch.reward_stars} CS`})
                </Text>
              </View>
              <View style={[styles.barTrack, { backgroundColor: colors.background }]}>
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
        </View>

        <SectionLabel>BRAIN-TRAINING PUZZLES</SectionLabel>
        <View style={styles.puzzleGrid}>
          <PuzzleCard title="Sudoku" desc="High-density numeral constraint grid placement." icon="🧩" isHard={sudokuHard} onToggleDifficulty={() => setSudokuHard(!sudokuHard)} />
          <PuzzleCard title="Cross Math" desc="Systemic intersecting arithmetic expression pathways." icon="🧮" isHard={crossMathHard} onToggleDifficulty={() => setCrossMathHard(!crossMathHard)} />
          <PuzzleCard title="KenKen" desc="Segmented constraint group calculations." icon="🔬" isHard={kenKenHard} onToggleDifficulty={() => setKenKenHard(!kenKenHard)} />
          <PuzzleCard title="Math Maze" desc="Step-sequence directional arithmetic routing." icon="🌀" isHard={mazeHard} onToggleDifficulty={() => setMazeHard(!mazeHard)} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: Spacing.xxxl },
  trackerCard: { marginHorizontal: Spacing.lg, borderRadius: Radius.lg, padding: Spacing.lg, borderWidth: 1, marginBottom: Spacing.xl },
  trackerTitle: { fontSize: 14, fontWeight: "700", marginBottom: Spacing.md },
  trackerRow: { marginBottom: 10 },
  trackerInfo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  trackerName: { fontSize: 12, fontWeight: "600" },
  trackerVal: { fontSize: 12, fontWeight: "700" },
  barTrack: { height: 5, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  noChallengesText: { fontSize: 12, textAlign: "center", marginVertical: 8 },
  puzzleGrid: { paddingHorizontal: Spacing.lg },
  card: { borderRadius: Radius.lg, padding: Spacing.lg, borderWidth: 1, marginBottom: Spacing.lg },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: Spacing.md },
  cardIcon: { fontSize: 24, marginRight: Spacing.md },
  titleBlock: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  cardDesc: { fontSize: 11, marginTop: 2, lineHeight: 14 },
  toggleRow: { flexDirection: "row", borderRadius: Radius.sm, padding: 2, marginBottom: Spacing.md },
  toggleBtn: { flex: 1, paddingVertical: 6, alignItems: "center", borderRadius: 6 },
  toggleBtnText: { fontSize: 10, fontWeight: "700" },
  solveBtn: { width: "100%", height: 38, borderRadius: Radius.sm + 2, justifyContent: "center", alignItems: "center" },
  solveBtnText: { fontSize: 12, fontWeight: "800", letterSpacing: 0.5 },
});
