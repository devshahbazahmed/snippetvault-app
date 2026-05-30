import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'dark' | 'system';

export type FontSizePreference = 'small' | 'medium' | 'large';

export type Preferences = {
  theme: ThemePreference;
  codeWrap: boolean;
  fontSize: FontSizePreference;
};

const STORAGE_KEY = '@snippetvault/preferences';

const defaultPreferences: Preferences = {
  theme: 'dark',
  codeWrap: true,
  fontSize: 'medium',
};

export async function getPreferences() {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return defaultPreferences;
  }

  return {
    ...defaultPreferences,
    ...JSON.parse(stored),
  };
}

export async function updatePreferences(updates: Partial<Preferences>) {
  const current = await getPreferences();

  const next = {
    ...current,
    ...updates,
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));

  return next;
}
