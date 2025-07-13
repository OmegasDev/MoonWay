import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'isLoggedIn';

export const setLogin = async () => {
  await AsyncStorage.setItem(AUTH_KEY, 'true');
};

export const setLogout = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

export const isLoggedIn = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(AUTH_KEY);
  return value === 'true';
};

