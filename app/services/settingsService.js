import AsyncStorage from '@react-native-async-storage/async-storage';

import { SETTINGS_KEY } from '../constants/config';

export const DEFAULT_SETTINGS = {
  darkMode: true,
  fontSize: 'medium'
};

export const getSettings = async () => {
  try {
    const stored = await AsyncStorage.getItem(SETTINGS_KEY);
    const parsed = stored ? JSON.parse(stored) : {};

    return {
      ...DEFAULT_SETTINGS,
      ...(parsed && typeof parsed === 'object' ? parsed : {})
    };
  } catch (error) {
    console.error('Failed to read settings', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ ...DEFAULT_SETTINGS, ...settings })
    );
  } catch (error) {
    console.error('Failed to save settings', error);
  }
};

export const updateSetting = async (key, value) => {
  try {
    const currentSettings = await getSettings();
    await saveSettings({ ...currentSettings, [key]: value });
  } catch (error) {
    console.error('Failed to update setting', error);
  }
};

export default {
  DEFAULT_SETTINGS,
  getSettings,
  saveSettings,
  updateSetting
};
