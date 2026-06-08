export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://api.dictionaryapi.dev/api/v2/entries/en';

export const HISTORY_KEY =
  process.env.EXPO_PUBLIC_HISTORY_STORAGE_KEY || 'lexi_search_history';

export const FAVORITES_KEY =
  process.env.EXPO_PUBLIC_FAVORITES_STORAGE_KEY || 'lexi_favorites';

export const SETTINGS_KEY =
  process.env.EXPO_PUBLIC_SETTINGS_STORAGE_KEY || 'lexi_settings';

export default {
  API_BASE_URL,
  HISTORY_KEY,
  FAVORITES_KEY,
  SETTINGS_KEY
};
