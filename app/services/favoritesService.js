import AsyncStorage from '@react-native-async-storage/async-storage';

import { FAVORITES_KEY } from '../constants/config';

const normalizeWord = (word = '') => word.trim().toLowerCase();

const buildFavoriteEntry = (wordData) => ({
  word: wordData?.word || '',
  phonetic: wordData?.phonetic || wordData?.phonetics?.[0]?.text || '',
  firstDefinition:
    wordData?.meanings?.[0]?.definitions?.[0]?.definition || '',
  timestamp: Date.now(),
  wordData
});

export const getFavorites = async () => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  } catch (error) {
    console.error('Failed to read favorites', error);
    return [];
  }
};

export const addFavorite = async (wordData) => {
  try {
    const entry = buildFavoriteEntry(wordData);

    if (!entry.word) {
      return;
    }

    const favorites = await getFavorites();
    const exists = favorites.some(
      (item) => normalizeWord(item.word) === normalizeWord(entry.word)
    );

    if (exists) {
      return;
    }

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, entry]));
  } catch (error) {
    console.error('Failed to add favorite', error);
  }
};

export const removeFavorite = async (word) => {
  try {
    const favorites = await getFavorites();
    const normalized = normalizeWord(word);
    const nextFavorites = favorites.filter(
      (item) => normalizeWord(item.word) !== normalized
    );

    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
  } catch (error) {
    console.error('Failed to remove favorite', error);
  }
};

export const isFavorite = async (word) => {
  const favorites = await getFavorites();
  const normalized = normalizeWord(word);

  return favorites.some((item) => normalizeWord(item.word) === normalized);
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Failed to clear favorites', error);
  }
};

export default {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  clearFavorites
};
