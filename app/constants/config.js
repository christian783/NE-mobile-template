export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://api.dictionaryapi.dev/api/v2/entries/en';

export const HISTORY_KEY =
  process.env.EXPO_PUBLIC_HISTORY_STORAGE_KEY || 'lexi_search_history';

export default {
  API_BASE_URL,
  HISTORY_KEY
};
