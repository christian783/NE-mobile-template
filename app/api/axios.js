import axios from 'axios';

import { BASE_URL, TOKEN_KEY } from '../constants/config';
import { getData, clearAll } from '../utils/storage';
import { getErrorMessage, showError } from '../utils/toast';
import { resetToLogin } from '../navigation/navigationRef';

let unauthorizedHandler = null;
let isHandlingUnauthorized = false;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  async (config) => {
    const token = await getData(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const message =
      status === 401
        ? 'Your session has expired. Please log in again.'
        : getErrorMessage(error);

    showError(message);

    if (status === 401 && !isHandlingUnauthorized) {
      isHandlingUnauthorized = true;
      await clearAll();
      unauthorizedHandler?.();
      setTimeout(resetToLogin, 0);
      isHandlingUnauthorized = false;
    }

    return Promise.reject(error);
  }
);

export default api;
