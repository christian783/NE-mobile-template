export const API_PROVIDER =
  (process.env.EXPO_PUBLIC_API_PROVIDER || 'mockapi').toLowerCase();

export const SERVER_BASE_URL =
  process.env.EXPO_PUBLIC_SERVER_BASE_URL ||
  'https://your-api-base-url.com/api/v1';

export const MOCK_API_BASE_URL =
  process.env.EXPO_PUBLIC_MOCK_API_BASE_URL ||
  'https://6a17d7511878294b597beb61.mockapi.io/api/v1';

export const USE_MOCK_API = API_PROVIDER === 'mockapi';
export const BASE_URL = USE_MOCK_API ? MOCK_API_BASE_URL : SERVER_BASE_URL;
export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'auth_user';
