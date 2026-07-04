import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import Constants from "expo-constants";

// Detect local environment (dynamically resolves PC's local IP for physical devices/Expo Go)
export const getBackendUrls = () => {
  let host = "localhost";
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    host = hostUri.split(":")[0];
  } else if (Platform.OS === "android") {
    host = "10.0.2.2";
  }
  
  return {
    http: `http://${host}:8080`,
    ws: `ws://${host}:8080/ws`
  };
};

const GUEST_ID_KEY = "elo_guest_id";
const USERNAME_KEY = "elo_username";

export interface GuestProfile {
  id: string;
  username: string;
  elo: number;
}

export const authService = {
  async getOrCreateGuestId(): Promise<string> {
    try {
      let guestId = await SecureStore.getItemAsync(GUEST_ID_KEY);
      if (!guestId) {
        guestId = "guest_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await SecureStore.setItemAsync(GUEST_ID_KEY, guestId);
      }
      return guestId;
    } catch (e) {
      // Fallback for web or errors
      const fallback = "guest_web_" + Math.random().toString(36).substring(2, 10);
      return fallback;
    }
  },

  async loginGuest(username?: string): Promise<GuestProfile> {
    const urls = getBackendUrls();
    const guestId = await this.getOrCreateGuestId();

    const response = await fetch(`${urls.http}/api/auth/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: guestId,
        username: username || undefined,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Authentication failed");
    }

    const data = await response.json();
    if (data.username) {
      await SecureStore.setItemAsync(USERNAME_KEY, data.username);
    }
    return {
      id: data.id,
      username: data.username,
      elo: data.elo,
    };
  },

  async getStoredUsername(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(USERNAME_KEY);
    } catch {
      return null;
    }
  }
};
