import { create } from "zustand";
import { appStorage } from "../utils/storage.ts";

export interface ProfileData {
  id: string;
  username: string;
  elo: number;
  credits: number;
  xp: number;
  level: number;
  dailyStreak: number;
  lastPlayedDate: string | null;
  completedTodayCount: number;
  unlockedThemes: string[];
  activeTitle: string;
}

interface ProfileState {
  profile: ProfileData | null;
  setProfile: (profile: ProfileData) => void;
  updateStats: (updates: Partial<ProfileData>) => void;
  clear: () => void;
}

const CACHE_KEY = "elo_cached_profile";
const cached = appStorage.getObject<ProfileData>(CACHE_KEY);

export const useProfileStore = create<ProfileState>((set) => ({
  profile: cached,
  setProfile: (profile) => {
    appStorage.set(CACHE_KEY, profile);
    set({ profile });
  },
  updateStats: (updates) => {
    set((state) => {
      if (!state.profile) return {};
      const updated = { ...state.profile, ...updates };
      appStorage.set(CACHE_KEY, updated);
      return { profile: updated };
    });
  },
  clear: () => {
    appStorage.delete(CACHE_KEY);
    set({ profile: null });
  }
}));
