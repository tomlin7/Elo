import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Layout, Radius, Spacing, Typography } from "@/constants/design";
import { appStorage } from "@/src/utils/storage";
import { useThemeStore } from "@/src/store/themeStore";
import { IconSymbol } from "@/components/ui/icon-symbol";

const INTRO_KEY = "elo_intro_seen";
const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    iconName: "bolt" as const,
    title: "Welcome to Elo",
    body: "1v1 mental math duels. Out-calculate opponents in real time and climb the global rankings.",
  },
  {
    id: "2",
    iconName: "psychology" as const,
    title: "Train & Compete",
    body: "Complete daily puzzles, enter tournaments, and sharpen your speed across math, memory, and logic.",
  },
  {
    id: "3",
    iconName: "star" as const,
    title: "Earn & Customize",
    body: "Stack Pies, unlock themes in the Vault, and flex your rank on the leaderboard.",
  },
];

export default function IntroScreen() {
  const router = useRouter();
  const { colors } = useThemeStore();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const finishIntro = () => {
    appStorage.set(INTRO_KEY, "true");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace("/(tabs)");
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      finishIntro();
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    if (next !== index) setIndex(next);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.brand, { color: colors.primary }]}>ELO</Text>

        <FlatList
          ref={listRef}
          data={SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <View style={[styles.emojiRing, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                <IconSymbol name={item.iconName} size={44} color={colors.primary} />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.body, { color: colors.textMuted }]}>{item.body}</Text>
            </View>
          )}
        />

        <View style={styles.footer}>
          <View style={styles.dots}>
            {SLIDES.map((slide, i) => (
              <View
                key={slide.id}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === index ? colors.primary : colors.cardBorder,
                    width: i === index ? 20 : 8,
                  },
                ]}
              />
            ))}
          </View>

          <Button
            label={index === SLIDES.length - 1 ? "GET STARTED" : "NEXT"}
            onPress={handleNext}
            style={styles.cta}
          />

          {index < SLIDES.length - 1 ? (
            <Button label="SKIP" variant="ghost" onPress={finishIntro} style={styles.skip} compact />
          ) : null}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.xxl,
  },
  brand: {
    ...Typography.hero,
    textAlign: "center",
    fontSize: 36,
    letterSpacing: 6,
    marginBottom: Spacing.xl,
  },
  slide: {
    paddingHorizontal: Spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
  },
  emojiRing: {
    width: 96,
    height: 96,
    borderRadius: Radius.pill,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.title,
    fontSize: 24,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  body: {
    ...Typography.body,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: Spacing.xl,
  },
  dot: {
    height: 8,
    borderRadius: Radius.pill,
  },
  cta: { width: "100%" },
  skip: {
    marginTop: Spacing.sm,
    alignSelf: "center",
    borderWidth: 0,
    height: Layout.buttonHeight - 8,
  },
});
