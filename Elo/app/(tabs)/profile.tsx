import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Share
} from "react-native";
import { useRouter } from "expo-router";
import { useProfileStore } from "../../src/store/profileStore.ts";
import { useThemeStore } from "../../src/store/themeStore.ts";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing, Radius } from "@/constants/design";
import Svg, { Polygon } from "react-native-svg";

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const { colors } = useThemeStore();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Add me on Elo Math Duel! My username is ${profile?.username ?? "Novice"}. Let's battle!`,
      });
    } catch (err) {}
  };

  const username = profile?.username ?? "Dheeraj Charaungonath";
  const userHandle = `@${username.toLowerCase().replace(/\s+/g, "")}`;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Patterned Math Symbols Header Backdrop */}
        <View style={[styles.patternHeader, { backgroundColor: colors.success + "33", borderColor: colors.cardBorder }]}>
          <Text style={[styles.patternText, { top: 12, left: 24 }]}>+</Text>
          <Text style={[styles.patternText, { top: 40, right: 36 }]}>-</Text>
          <Text style={[styles.patternText, { bottom: 18, left: 70 }]}>×</Text>
          <Text style={[styles.patternText, { top: 10, left: 160 }]}>÷</Text>
          <Text style={[styles.patternText, { bottom: 24, right: 90 }]}>+</Text>
          <Text style={[styles.patternText, { top: 35, left: 280 }]}>÷</Text>
          <Text style={[styles.patternText, { bottom: 15, left: 210 }]}>-</Text>

          {/* Bold heavy Novice rank title badge */}
          <View style={[styles.noviceBadge, { backgroundColor: "#000000", borderColor: colors.cardBorder }]}>
            <Text style={[styles.noviceBadgeText, { color: colors.success }]}>NOVICE</Text>
          </View>
        </View>

        {/* Overlapping Avatar Row */}
        <View style={styles.avatarRow}>
          <View style={styles.avatarShadowContainer}>
            <View style={[styles.avatarShadow, { backgroundColor: "#000000" }]} />
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary, borderColor: colors.cardBorder }]}>
              <Text style={[styles.avatarText, { color: colors.onPrimary }]}>
                {username[0].toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* User profile tags and detail texts */}
        <View style={styles.profileDetails}>
          <Text style={[styles.usernameText, { color: colors.text }]}>{username}</Text>
          <Text style={[styles.handleText, { color: colors.textMuted }]}>{userHandle}</Text>
          <Text style={[styles.friendsText, { color: colors.success }]}>0 Friends</Text>
        </View>

        {/* Micro outline metadata buttons */}
        <View style={styles.metaBtnRow}>
          <TouchableOpacity style={[styles.metaBtn, { borderColor: colors.cardBorder }]}>
            <Text style={[styles.metaBtnText, { color: colors.text }]}>+ Add College</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.metaBtn, { borderColor: colors.cardBorder }]}>
            <Text style={[styles.metaBtnText, { color: colors.text }]}>+ Add Socials</Text>
          </TouchableOpacity>
        </View>

        {/* Primary 3D Action buttons */}
        <View style={styles.actionBlock}>
          <View style={styles.actionBtnRow}>
            <Button
              label="ADD MORE FRIENDS"
              variant="success"
              style={styles.addFriendsBtn}
              onPress={() => {}}
            />
            <TouchableOpacity onPress={handleShare} style={[styles.shareBtn, { borderColor: colors.cardBorder }]}>
              <IconSymbol name="code" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Button
            label="VISIT COSMETICS SHOP"
            variant="primary"
            style={styles.shopBtn}
            onPress={() => router.push("/vault")}
          />
        </View>

        {/* Ratings grid cards section */}
        <View style={styles.ratingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Ratings</Text>
            <IconSymbol name="chevron.right" size={16} color={colors.success} />
          </View>

          <View style={styles.ratingsGrid}>
            {/* Math Card */}
            <Card style={[styles.ratingCard, { borderColor: colors.cardBorder }]}>
              <IconSymbol name="slider.horizontal.3" size={18} color="#F9E2AF" />
              <Text style={[styles.ratingValText, { color: colors.text }]}>1005</Text>
              <Text style={[styles.ratingLabel, { color: colors.textMuted }]}>MATH</Text>
            </Card>

            {/* Logic Card */}
            <Card style={[styles.ratingCard, { borderColor: colors.cardBorder }]}>
              <IconSymbol name="logic.circles" size={18} color="#F38BA8" />
              <Text style={[styles.ratingValText, { color: colors.text }]}>1000</Text>
              <Text style={[styles.ratingLabel, { color: colors.textMuted }]}>LOGIC</Text>
            </Card>

            {/* Memory Card */}
            <Card style={[styles.ratingCard, { borderColor: colors.cardBorder }]}>
              <IconSymbol name="square.stack.3d.down.right" size={18} color="#89B4FA" />
              <Text style={[styles.ratingValText, { color: colors.text }]}>1000</Text>
              <Text style={[styles.ratingLabel, { color: colors.textMuted }]}>MEMORY</Text>
            </Card>

            {/* Puzzle Card */}
            <Card style={[styles.ratingCard, { borderColor: colors.cardBorder }]}>
              <IconSymbol name="grid.sharp" size={18} color="#A6E3A1" />
              <Text style={[styles.ratingValText, { color: colors.text }]}>1000</Text>
              <Text style={[styles.ratingLabel, { color: colors.textMuted }]}>PUZZLE</Text>
            </Card>
          </View>
        </View>

        {/* Custom rank selector dropdown */}
        <View style={styles.rankRow}>
          <TouchableOpacity style={[styles.dropdownContainer, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <IconSymbol name="slider.horizontal.3" size={14} color="#F9E2AF" style={{ marginRight: 8 }} />
            <Text style={[styles.dropdownText, { color: colors.text }]}>Math Rank</Text>
            <IconSymbol name="chevron.right" size={12} color={colors.textMuted} style={{ marginLeft: 6, transform: [{ rotate: "90deg" }] }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rankChevronBtn, { borderColor: colors.cardBorder }]}>
            <IconSymbol name="chevron.right" size={14} color={colors.success} />
          </TouchableOpacity>
        </View>

        {/* Lower Memphis Polygon shape decoration */}
        <View style={styles.decorContainer}>
          <Svg width={140} height={140} viewBox="0 0 100 100">
            <Polygon points="50,5 95,38 78,90 22,90 5,38" fill="#A6E3A1" stroke={colors.cardBorder} strokeWidth="3" opacity="0.4" />
            <Polygon points="50,20 80,45 68,80 32,80 20,45" fill="#89B4FA" stroke={colors.cardBorder} strokeWidth="2" opacity="0.6" />
          </Svg>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: Spacing.xxxl,
  },
  patternHeader: {
    height: 140,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 3,
  },
  patternText: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "900",
    opacity: 0.18,
  },
  noviceBadge: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: 6,
    borderRadius: Radius.sm,
    borderWidth: 3,
  },
  noviceBadgeText: {
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
  },
  avatarRow: {
    alignItems: "center",
    marginTop: -40,
    marginBottom: Spacing.md,
  },
  avatarShadowContainer: {
    position: "relative",
    width: 80,
    height: 80,
  },
  avatarShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "900",
  },
  profileDetails: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "800",
  },
  handleText: {
    fontSize: 11,
    marginTop: 2,
  },
  friendsText: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
  },
  metaBtnRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  metaBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 15,
    marginHorizontal: 6,
  },
  metaBtnText: {
    fontSize: 10,
    fontWeight: "800",
  },
  actionBlock: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  actionBtnRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  addFriendsBtn: {
    flex: 1,
    height: 46,
    marginRight: 10,
  },
  shareBtn: {
    width: 46,
    height: 46,
    borderRadius: Radius.sm,
    borderWidth: 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  shopBtn: {
    width: "100%",
    height: 46,
  },
  ratingsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  ratingsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingCard: {
    width: "23%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    marginRight: 0,
  },
  ratingValText: {
    fontSize: 14,
    fontWeight: "900",
    marginVertical: 4,
  },
  ratingLabel: {
    fontSize: 7,
    fontWeight: "900",
  },
  rankRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  dropdownContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    height: 40,
    borderRadius: Radius.sm,
    borderWidth: 2,
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: "800",
    flex: 1,
  },
  rankChevronBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  decorContainer: {
    alignItems: "center",
    marginTop: Spacing.lg,
  },
});
