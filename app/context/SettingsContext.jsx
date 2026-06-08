import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { COLORS, FONT_SIZES, LIGHT_COLORS } from '../constants';
import {
  DEFAULT_SETTINGS,
  getSettings,
  updateSetting
} from '../services/settingsService';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const loadSettings = useCallback(async () => {
    const storedSettings = await getSettings();
    setSettings(storedSettings);
  }, []);

  const toggleDarkMode = useCallback(async () => {
    const nextDarkMode = !settings.darkMode;
    setSettings((current) => ({ ...current, darkMode: nextDarkMode }));
    await updateSetting('darkMode', nextDarkMode);
  }, [settings.darkMode]);

  const setFontSize = useCallback(async (size) => {
    if (!FONT_SIZES[size]) {
      return;
    }

    setSettings((current) => ({ ...current, fontSize: size }));
    await updateSetting('fontSize', size);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadSettings().catch((error) => console.error('Failed to hydrate settings', error));
    }, 0);

    return () => clearTimeout(timeout);
  }, [loadSettings]);

  const colors = settings.darkMode ? COLORS : LIGHT_COLORS;
  const fontSizes = FONT_SIZES[settings.fontSize] || FONT_SIZES.medium;

  const value = useMemo(
    () => ({
      settings,
      colors,
      fontSizes,
      toggleDarkMode,
      setFontSize,
      loadSettings
    }),
    [colors, fontSizes, loadSettings, setFontSize, settings, toggleDarkMode]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used inside a SettingsProvider');
  }

  return context;
};

export default SettingsProvider;
