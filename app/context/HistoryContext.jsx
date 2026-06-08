import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  clearHistory as clearStoredHistory,
  getHistory,
  saveToHistory
} from '../services/storageService';

const HistoryContext = createContext(null);

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    try {
      const storedHistory = await getHistory();
      setHistory(storedHistory);
    } catch (error) {
      console.error('Failed to load history', error);
      setHistory([]);
    }
  }, []);

  const addToHistory = useCallback(
    async (word) => {
      try {
        await saveToHistory(word);
        await loadHistory();
      } catch (error) {
        console.error('Failed to add history item', error);
      }
    },
    [loadHistory]
  );

  const clearHistory = useCallback(async () => {
    try {
      await clearStoredHistory();
      setHistory([]);
    } catch (error) {
      console.error('Failed to clear history', error);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadHistory().catch(() => undefined);
    }, 0);

    return () => clearTimeout(timeout);
  }, [loadHistory]);

  const value = useMemo(
    () => ({ history, addToHistory, loadHistory, clearHistory }),
    [addToHistory, clearHistory, history, loadHistory]
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error('useHistory must be used inside a HistoryProvider');
  }

  return context;
};

export default HistoryProvider;
