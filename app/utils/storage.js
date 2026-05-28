import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  const serializedValue =
    typeof value === 'string' ? value : JSON.stringify(value);

  await AsyncStorage.setItem(key, serializedValue);
};

export const getData = async (key) => {
  const value = await AsyncStorage.getItem(key);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const removeData = async (key) => {
  await AsyncStorage.removeItem(key);
};

export const clearAll = async () => {
  await AsyncStorage.clear();
};
