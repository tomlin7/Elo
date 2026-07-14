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
import { Radius, Spacing, Typography } from "@/constants/design";
import { appStorage } from "@/src/utils/storage";
import { useThemeStore } from "@/src/store/themeStore";
import { ShapesComposition } from "@/components/ui/Shapes";

const INTRO_KEY = "elo_intro_seen";
const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    compositionType: "slide1" as const,
    title: "Welcome to Elo",
    body: "1v1 real-time mental math duels.",
  },
  {
    id: "2",
    compositionType: "slide2" as const,
    title: "Train & Compete",
    body: "Solve dailies and join tournaments.",
  },
  {
    id: "3",
    compositionType: "slide3" as const,
    title: "Earn & Customize",
    body: "Unlock premium custom themes.",
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
              <View style={styles.shapesWrapper}>
                <ShapesComposition type={item.compositionType} size={130} />
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
  shapesWrapper: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xxl,
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
    maxWidth: 260,
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
  },
});
