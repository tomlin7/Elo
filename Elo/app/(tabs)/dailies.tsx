import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { useProfileStore } from "../../src/store/profileStore.ts";
import { StatusBar } from "expo-status-bar";

interface PuzzleCardProps {
  title: string;
  desc: string;
  icon: string;
  isHard: boolean;
  onToggleDifficulty: () => void;
}

const PuzzleCard: React.FC<PuzzleCardProps> = ({ title, desc, icon, isHard, onToggleDifficulty }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.titleBlock}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>{desc}</Text>
        </View>
      </View>

      {/* Easy/Hard toggle selection row */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, !isHard && styles.activeToggle]}
          onPress={() => isHard && onToggleDifficulty()}
        >
          <Text style={[styles.toggleBtnText, !isHard && styles.activeToggleText]}>EASY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, isHard && styles.activeToggle]}
          onPress={() => !isHard && onToggleDifficulty()}
        >
          <Text style={[styles.toggleBtnText, isHard && styles.activeToggleText]}>HARD 🔒</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.solveBtn}>
        <Text style={styles.solveBtnText}>SOLVE PUZZLE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function DailiesScreen() {
  const { profile } = useProfileStore();
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Pinned status capsules */}
        <View style={styles.capsuleRow}>
          <View style={styles.capsule}>
            <Text style={styles.capsuleIcon}>π</Text>
            <Text style={styles.capsuleValue}>{profile?.credits ?? 0} Pies</Text>
          </View>
          <View style={styles.capsule}>
            <Text style={styles.capsuleIcon}>🔥</Text>
            <Text style={styles.capsuleValue}>{profile?.dailyStreak ?? 0} Streaks</Text>
          </View>
          <View style={styles.capsule}>
            <Text style={styles.capsuleIcon}>⬡</Text>
            <Text style={styles.capsuleValue}>{profile?.xp ?? 0} XP</Text>
          </View>
        </View>

        {/* Dynamic target milestones progress */}
        <View style={styles.trackerCard}>
          <Text style={styles.trackerTitle}>🎯 Daily Target Milestones</Text>
          {challenges.map((ch: any) => (
            <View key={ch.id} style={styles.trackerRow}>
              <View style={styles.trackerInfo}>
                <Text style={styles.trackerName}>{ch.challenge_type.replace(/_/g, " ")}</Text>
                <Text style={styles.trackerVal}>
                  {ch.current_value}/{ch.target_value} ({ch.is_completed ? "Completed" : `+${ch.reward_stars} CS`})
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[
                  styles.barFill,
                  { width: `${Math.min(100, (ch.current_value / ch.target_value) * 100)}%` },
                  ch.is_completed ? styles.barComplete : {}
                ]} />
              </View>
            </View>
          ))}
          {challenges.length === 0 && (
            <Text style={styles.noChallengesText}>Solve matches in Arena Hub to clear targets!</Text>
          )}
        </View>

        {/* Puzzle Grids */}
        <Text style={styles.sectionLabel}>BRAIN-TRAINING PUZZLES</Text>
        <View style={styles.puzzleGrid}>
          <PuzzleCard
            title="Sudoku"
            desc="High-density numeral constraint grid placement."
            icon="🧩"
            isHard={sudokuHard}
            onToggleDifficulty={() => setSudokuHard(!sudokuHard)}
          />
          <PuzzleCard
            title="Cross Math"
            desc="Systemic intersecting arithmetic expression pathways."
            icon="🧮"
            isHard={crossMathHard}
            onToggleDifficulty={() => setCrossMathHard(!crossMathHard)}
          />
          <PuzzleCard
            title="KenKen"
            desc="Segmented constraint group calculations."
            icon="🔬"
            isHard={kenKenHard}
            onToggleDifficulty={() => setKenKenHard(!kenKenHard)}
          />
          <PuzzleCard
            title="Math Maze"
            desc="Step-sequence directional arithmetic routing."
            icon="🌀"
            isHard={mazeHard}
            onToggleDifficulty={() => setMazeHard(!mazeHard)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#161616" },
  scrollContainer: { paddingBottom: 40 },
  capsuleRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 20, marginBottom: 20 },
  capsule: { flexDirection: "row", backgroundColor: "#262626", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignItems: "center", borderWidth: 1, borderColor: "#333" },
  capsuleIcon: { color: "#8AFF29", fontSize: 14, fontWeight: "800", marginRight: 6 },
  capsuleValue: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  // Tracker Card
  trackerCard: { backgroundColor: "#262626", marginHorizontal: 16, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#333", marginBottom: 24 },
  trackerTitle: { color: "#E5E7EB", fontSize: 14, fontWeight: "700", marginBottom: 12 },
  trackerRow: { marginBottom: 10 },
  trackerInfo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  trackerName: { color: "#8E8E93", fontSize: 12, fontWeight: "600" },
  trackerVal: { color: "#8AFF29", fontSize: 12, fontWeight: "700" },
  barTrack: { height: 5, backgroundColor: "#161616", borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: "#8AFF29", borderRadius: 3 },
  barComplete: { backgroundColor: "#00E676" },
  noChallengesText: { color: "#8E8E93", fontSize: 12, textAlign: "center", marginVertical: 8 },

  // Puzzle grid cards
  sectionLabel: { color: "#8E8E93", fontSize: 11, fontWeight: "800", letterSpacing: 1.5, marginLeft: 16, marginBottom: 12 },
  puzzleGrid: { paddingHorizontal: 16 },
  card: { backgroundColor: "#262626", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#333", marginBottom: 16 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  cardIcon: { fontSize: 24, marginRight: 12 },
  titleBlock: { flex: 1 },
  cardTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  cardDesc: { color: "#8E8E93", fontSize: 11, marginTop: 2, lineHeight: 14 },

  // Toggle selection
  toggleRow: { flexDirection: "row", backgroundColor: "#161616", borderRadius: 8, padding: 2, marginBottom: 12 },
  toggleBtn: { flex: 1, paddingVertical: 6, alignItems: "center", borderRadius: 6 },
  activeToggle: { backgroundColor: "#262626", borderWidth: 1, borderColor: "#333" },
  toggleBtnText: { color: "#8E8E93", fontSize: 10, fontWeight: "700" },
  activeToggleText: { color: "#8AFF29" },

  // Solve button
  solveBtn: { width: "100%", height: 38, backgroundColor: "#8AFF29", borderRadius: 10, justifyContent: "center", alignItems: "center" },
  solveBtnText: { color: "#000000", fontSize: 12, fontWeight: "800", letterSpacing: 0.5 }
});
