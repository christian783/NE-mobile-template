import { create } from 'axios';

import { API_BASE_URL } from '../constants/config';

const axiosInstance = create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 404) {
      throw new Error('WORD_NOT_FOUND');
    }

    if (!error.response) {
      throw new Error('NETWORK_ERROR');
    }

    throw new Error('SERVER_ERROR');
  }
);

export default axiosInstance;
