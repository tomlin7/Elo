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
import { StatCapsuleRow } from "@/components/ui/StatCapsuleRow";
import { Spacing, Radius } from "@/constants/design";
import { Card } from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/icon-symbol";
import {
  SudokuIllustration,
  CrossMathIllustration,
  KenKenIllustration,
  MathMazeIllustration,
} from "@/components/ui/Shapes";

interface PuzzleCardProps {
  title: string;
  illustration: React.ReactNode;
  isHard: boolean;
  onToggleDifficulty: () => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ title, illustration, isHard, onToggleDifficulty }) => {
  const { colors } = useThemeStore();

  return (
    <Card style={styles.puzzleCard}>
      {/* Top half: Radios + Graphics */}
      <View style={styles.cardHeaderArea}>
        <View style={styles.difficultyRadioRow}>
          <TouchableOpacity style={styles.radioOption} onPress={onToggleDifficulty}>
            <Text style={[styles.radioLabel, { color: colors.textMuted }]}>Easy</Text>
            <View style={[styles.radioCircle, { borderColor: colors.cardBorder }, !isHard && { backgroundColor: colors.primary }]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioOption} onPress={onToggleDifficulty}>
            <Text style={[styles.radioLabel, { color: colors.textMuted }]}>Hard</Text>
            <View style={[styles.radioCircle, { borderColor: colors.cardBorder }, isHard && { backgroundColor: colors.primary }]}>
              <IconSymbol name="lock.fill" size={8} color={isHard ? colors.onPrimary : colors.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.illustrationContainer}>
          {illustration}
        </View>
      </View>

      {/* Bottom half: Title + Action Trigger */}
      <View style={[styles.cardTitleRow, { borderTopColor: colors.cardBorder }]}>
        <Text style={[styles.puzzleTitleText, { color: colors.text }]}>{title.toUpperCase()}</Text>
        <View style={[styles.chevronCircle, { backgroundColor: colors.primary, borderColor: colors.cardBorder }]}>
          <IconSymbol name="chevron.right" size={12} color={colors.onPrimary} />
        </View>
      </View>
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

  const [timeLeft, setTimeLeft] = useState("12:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = night.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const completedToday = profile?.completedTodayCount ?? 0;
  const targetTotal = 4;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Custom Screen Title Header with Ticker timer */}
        <View style={styles.topHeader}>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Daily Challenges</Text>
          <View style={[styles.timerPill, { backgroundColor: colors.accentMuted, borderColor: colors.accent }]}>
            <IconSymbol name="star" size={12} color={colors.accent} style={{ marginRight: 4 }} />
            <Text style={[styles.timerText, { color: colors.accent }]}>{timeLeft}</Text>
          </View>
        </View>

        <StatCapsuleRow
          stats={[
            { icon: "dollarsign.circle.fill", value: `${profile?.credits ?? 0} Pies` },
            { icon: "bolt", value: `${profile?.dailyStreak ?? 0} Streaks` },
            { icon: "star", value: `${profile?.xp ?? 0} XP` },
          ]}
        />

        {/* Milestone Road Tracker */}
        <Card style={styles.timelineCard}>
          <Text style={[styles.timelineMainVal, { color: colors.success }]}>
            {completedToday}/{targetTotal}
          </Text>
          <Text style={[styles.timelineSubtitle, { color: colors.textMuted }]}>
            Puzzle Completed
          </Text>

          <View style={styles.timelineTrackRow}>
            {/* Step 1: Grid */}
            <View style={[styles.timelineNode, completedToday >= 1 ? { borderColor: colors.success, backgroundColor: colors.success } : { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
              <IconSymbol name="grid.sharp" size={14} color={completedToday >= 1 ? colors.onPrimary : colors.textMuted} />
            </View>

            {/* Line 1 */}
            <View style={[styles.timelineLine, { backgroundColor: completedToday >= 2 ? colors.success : colors.cardBorder }]} />

            {/* Step 2: PI (5) */}
            <View style={[styles.timelineNode, completedToday >= 2 ? { borderColor: colors.success, backgroundColor: colors.success } : { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
              <View style={styles.piBox}>
                <Text style={[styles.piLabel, { color: completedToday >= 2 ? colors.onPrimary : colors.accent }]}>π</Text>
                <Text style={[styles.piSub, { color: completedToday >= 2 ? colors.onPrimary : colors.accent }]}>5</Text>
              </View>
            </View>

            {/* Line 2 */}
            <View style={[styles.timelineLine, { backgroundColor: completedToday >= 3 ? colors.success : colors.cardBorder }]} />

            {/* Step 3: Grid */}
            <View style={[styles.timelineNode, completedToday >= 3 ? { borderColor: colors.success, backgroundColor: colors.success } : { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
              <IconSymbol name="grid.sharp" size={14} color={completedToday >= 3 ? colors.onPrimary : colors.textMuted} />
            </View>

            {/* Line 3 */}
            <View style={[styles.timelineLine, { backgroundColor: completedToday >= 4 ? colors.success : colors.cardBorder }]} />

            {/* Step 4: PI (15) */}
            <View style={[styles.timelineNode, completedToday >= 4 ? { borderColor: colors.success, backgroundColor: colors.success } : { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}>
              <View style={styles.piBox}>
                <Text style={[styles.piLabel, { color: completedToday >= 4 ? colors.onPrimary : colors.accent }]}>π</Text>
                <Text style={[styles.piSub, { color: completedToday >= 4 ? colors.onPrimary : colors.accent }]}>15</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Puzzle 2x2 Grid */}
        <View style={styles.puzzleGrid}>
          <PuzzleCard
            title="Sudoku"
            illustration={<SudokuIllustration />}
            isHard={sudokuHard}
            onToggleDifficulty={() => setSudokuHard(!sudokuHard)}
          />
          <PuzzleCard
            title="Cross Math"
            illustration={<CrossMathIllustration />}
            isHard={crossMathHard}
            onToggleDifficulty={() => setCrossMathHard(!crossMathHard)}
          />
          <PuzzleCard
            title="KenKen"
            illustration={<KenKenIllustration />}
            isHard={kenKenHard}
            onToggleDifficulty={() => setKenKenHard(!kenKenHard)}
          />
          <PuzzleCard
            title="Math Maze"
            illustration={<MathMazeIllustration />}
            isHard={mazeHard}
            onToggleDifficulty={() => setMazeHard(!mazeHard)}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: Spacing.xxxl },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  timerPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
  },
  timerText: {
    fontSize: 10,
    fontFamily: "monospace",
    fontWeight: "800",
  },
  timelineCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: "center",
    paddingVertical: Spacing.xl,
    marginRight: 0,
  },
  timelineMainVal: {
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 1,
  },
  timelineSubtitle: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
    marginBottom: 24,
    textTransform: "uppercase",
  },
  timelineTrackRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
  },
  timelineNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineLine: {
    flex: 1,
    height: 3,
  },
  piBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  piLabel: {
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 12,
  },
  piSub: {
    fontSize: 7,
    fontWeight: "900",
    lineHeight: 8,
  },
  puzzleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
  },
  puzzleCard: {
    width: "48%",
    marginBottom: Spacing.lg,
    padding: 0,
    overflow: "hidden",
    marginRight: 0,
  },
  cardHeaderArea: {
    padding: 12,
    alignItems: "center",
  },
  difficultyRadioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 9,
    fontWeight: "800",
    marginRight: 4,
  },
  radioCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationContainer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  puzzleTitleText: {
    fontSize: 12,
    fontWeight: "900",
    flex: 1,
    marginRight: 6,
  },
  chevronCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
