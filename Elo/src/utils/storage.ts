import { Platform } from "react-native";

interface SimpleStorage {
  getString(key: string): string | undefined;
  set(key: string, value: string): void;
  delete(key: string): void;
  clearAll(): void;
}

let storageInstance: SimpleStorage;

if (Platform.OS !== "web") {
  try {
    const { MMKV } = require("react-native-mmkv");
    const mmkv = new MMKV();
    storageInstance = {
      getString: (key) => mmkv.getString(key),
      set: (key, value) => mmkv.set(key, value),
      delete: (key) => mmkv.delete(key),
      clearAll: () => mmkv.clearAll(),
    };
  } catch (e) {
    console.warn("MMKV not loaded, falling back to memory storage:", e);
    createMemoryStorage();
  }
} else {
  createMemoryStorage();
}

function createMemoryStorage() {
  const memMap = new Map<string, string>();
  storageInstance = {
    getString: (key) => {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key) || undefined;
      }
      return memMap.get(key);
    },
    set: (key, value) => {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      } else {
        memMap.set(key, value);
      }
    },
    delete: (key) => {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      } else {
        memMap.delete(key);
      }
    },
    clearAll: () => {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.clear();
      } else {
        memMap.clear();
      }
    },
  };
}

export const appStorage = {
  getString(key: string): string | null {
    return storageInstance.getString(key) || null;
  },

  getObject<T>(key: string): T | null {
    const val = storageInstance.getString(key);
    if (!val) return null;
    try {
      return JSON.parse(val) as T;
    } catch {
      return null;
    }
  },

  set(key: string, value: any): void {
    const strVal = typeof value === "string" ? value : JSON.stringify(value);
    storageInstance.set(key, strVal);
  },

  delete(key: string): void {
    storageInstance.delete(key);
  },

  clearAll(): void {
    storageInstance.clearAll();
  }
};
