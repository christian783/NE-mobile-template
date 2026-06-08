import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  addFavorite as addStoredFavorite,
  clearFavorites,
  getFavorites,
  removeFavorite as removeStoredFavorite
} from '../services/favoritesService';

const FavoritesContext = createContext(null);

const normalizeWord = (word = '') => word.trim().toLowerCase();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setLoadingFavorites(true);
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    } catch (error) {
      console.error('Failed to load favorites', error);
      setFavorites([]);
    } finally {
      setLoadingFavorites(false);
    }
  }, []);

  const addFavorite = useCallback(
    async (wordData) => {
      await addStoredFavorite(wordData);
      await loadFavorites();
    },
    [loadFavorites]
  );

  const removeFavorite = useCallback(
    async (word) => {
      await removeStoredFavorite(word);
      await loadFavorites();
    },
    [loadFavorites]
  );

  const isFavorite = useCallback(
    (word) => {
      const normalized = normalizeWord(word);
      return favorites.some((item) => normalizeWord(item.word) === normalized);
    },
    [favorites]
  );

  const clearAllFavorites = useCallback(async () => {
    await clearFavorites();
    setFavorites([]);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadFavorites().catch(() => undefined);
    }, 0);

    return () => clearTimeout(timeout);
  }, [loadFavorites]);

  const value = useMemo(
    () => ({
      favorites,
      loadingFavorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      loadFavorites,
      clearAllFavorites
    }),
    [
      addFavorite,
      clearAllFavorites,
      favorites,
      isFavorite,
      loadFavorites,
      loadingFavorites,
      removeFavorite
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside a FavoritesProvider');
  }

  return context;
};

export default FavoritesProvider;
