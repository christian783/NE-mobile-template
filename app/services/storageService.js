import AsyncStorage from '@react-native-async-storage/async-storage';

import { HISTORY_KEY } from '../constants/config';

export const getHistory = async () => {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read search history', error);
    return [];
  }
};

export const saveToHistory = async (word) => {
  try {
    const normalized = word.trim();

    if (!normalized) {
      return;
    }

    const current = await getHistory();
    const exists = current.some(
      (item) => item.toLowerCase() === normalized.toLowerCase()
    );

    if (exists) {
      return;
    }

    await AsyncStorage.setItem(
      HISTORY_KEY,
      JSON.stringify([normalized, ...current].slice(0, 50))
    );
  } catch (error) {
    console.error('Failed to save search history', error);
  }
};

export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear search history', error);
  }
};

export default {
  getHistory,
  saveToHistory,
  clearHistory
};
