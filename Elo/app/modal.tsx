import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { useThemeStore } from '../src/store/themeStore.ts';
import { Spacing, Typography } from '@/constants/design';

export default function ModalScreen() {
  const { colors } = useThemeStore();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>This is a modal</Text>
        <Link href="/" dismissTo style={styles.link}>
          <Text style={[styles.linkText, { color: colors.primary }]}>Go to home screen</Text>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  title: {
    ...Typography.title,
    fontSize: 20,
    textAlign: 'center',
  },
  link: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  linkText: {
    ...Typography.bodyBold,
    textDecorationLine: 'underline',
  },
});
