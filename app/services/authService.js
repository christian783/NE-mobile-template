import api from '../api/axios';
import { USE_MOCK_API } from '../constants/config';

const normalizeRoles = (roles) => {
  if (Array.isArray(roles)) {
    return roles;
  }

  if (typeof roles === 'string') {
    return roles
      .split(',')
      .map((role) => role.trim())
      .filter(Boolean);
  }

  return [];
};

const createMockToken = (user) =>
  `mock-token-${user.id || user.username}-${Date.now()}`;

const normalizeUser = (payload, fallbackUsername) => {
  const user = payload?.user || payload?.data?.user || payload || {};
  const token =
    payload?.token ||
    payload?.accessToken ||
    payload?.access_token ||
    payload?.data?.token ||
    payload?.data?.accessToken ||
    payload?.data?.access_token ||
    user?.token;

  if (!token) {
    throw new Error('Authentication response did not include a token.');
  }

  return {
    id: user.id || user.userId || user._id || fallbackUsername,
    username: user.username || user.name || fallbackUsername,
    email: user.email || '',
    roles: normalizeRoles(user.roles),
    token
  };
};

const findMockUserByUsername = async (username) => {
  const response = await api.get('/users', {
    params: { username }
  });

  const users = Array.isArray(response.data) ? response.data : [];
  const normalizedUsername = username.trim().toLowerCase();

  return users.find(
    (user) => String(user.username || '').trim().toLowerCase() === normalizedUsername
  );
};

const loginWithMockApi = async (username, password) => {
  const user = await findMockUserByUsername(username);

  if (!user || String(user.password) !== password) {
    throw new Error('Invalid username or password.');
  }

  return normalizeUser(
    {
      ...user,
      token: user.token || createMockToken(user)
    },
    username
  );
};

const registerWithMockApi = async ({ username, password }) => {
  const existingUser = await findMockUserByUsername(username);

  if (existingUser) {
    throw new Error('Username is already registered.');
  }

  const response = await api.post('/users', {
    username: username.trim(),
    password,
    email: '',
    roles: ['user'],
    createdAt: new Date().toISOString()
  });

  return response.data;
};

export const loginRequest = async (username, password) => {
  if (USE_MOCK_API) {
    return loginWithMockApi(username, password);
  }

  const response = await api.post('/auth/login', {
    username,
    password
  });

  return normalizeUser(response.data, username);
};

export const registerRequest = async ({ username, password }) => {
  if (USE_MOCK_API) {
    return registerWithMockApi({ username, password });
  }

  const response = await api.post('/auth/register', {
    username,
    password
  });

  return response.data;
};
