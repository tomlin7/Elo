import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { Palette } from '@/constants/design';
import { appStorage } from '@/src/utils/storage';
import { useThemeStore } from '@/src/store/themeStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

const INTRO_KEY = 'elo_intro_seen';

function IntroGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!segments || segments.length === 0) return;

    const seen = appStorage.getString(INTRO_KEY) === 'true';
    const onIntro = segments[0] === 'intro';

    if (!seen && !onIntro) {
      const timer = setTimeout(() => {
        router.replace('/intro');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [segments]);

  return <>{children}</>;
}

function NavigationThemeProvider({ children }: { children: React.ReactNode }) {
  const { colors } = useThemeStore();

  const navTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.cardBg,
      text: colors.text,
      border: colors.cardBorder,
      notification: colors.accent,
    },
  };

  return <ThemeProvider value={navTheme}>{children}</ThemeProvider>;
}

export default function RootLayout() {
  return (
    <NavigationThemeProvider>
      <IntroGate>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: Palette.charcoal },
            headerShown: false,
          }}
        >
          <Stack.Screen name="intro" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="battle" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="private-lobby" options={{ headerShown: false }} />
          <Stack.Screen name="tournament-lobby" options={{ headerShown: false }} />
          <Stack.Screen name="spectator" options={{ headerShown: false }} />
          <Stack.Screen name="analytics" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="plugins" options={{ headerShown: false }} />
          <Stack.Screen name="battle-pass" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="light" />
      </IntroGate>
    </NavigationThemeProvider>
  );
}
