import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import { TOKEN_KEY, USER_KEY } from '../constants/config';
import { loginRequest, registerRequest } from '../services/authService';
import { clearAll, getData, removeData, storeData } from '../utils/storage';
import { setUnauthorizedHandler } from '../api/axios';
import { resetToLogin } from '../navigation/navigationRef';

export const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => undefined,
  register: async () => undefined,
  logout: async () => undefined,
  hasRole: () => false
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(async () => {
    await removeData(TOKEN_KEY);
    await removeData(USER_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    const hydrateSession = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          getData(TOKEN_KEY),
          getData(USER_KEY)
        ]);

        if (storedToken && storedUser) {
          setUser({
            ...storedUser,
            token: storedToken
          });
        } else {
          await clearAll();
          setUser(null);
        }
      } catch {
        await clearAll();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateSession();
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, []);

  const login = useCallback(async (username, password) => {
    const authenticatedUser = await loginRequest(username, password);
    const { token, ...userWithoutToken } = authenticatedUser;

    await Promise.all([
      storeData(TOKEN_KEY, token),
      storeData(USER_KEY, userWithoutToken)
    ]);

    setUser(authenticatedUser);
    return authenticatedUser;
  }, []);

  const register = useCallback(async (payload) => {
    return registerRequest(payload);
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
    resetToLogin();
  }, [clearSession]);

  const hasRole = useCallback(
    (role) => {
      if (!role || !Array.isArray(user?.roles)) {
        return false;
      }

      return user.roles.includes(role);
    },
    [user?.roles]
  );

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user?.token),
      login,
      register,
      logout,
      hasRole
    }),
    [hasRole, isLoading, login, logout, register, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
