import { useFocusEffect } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SettingsRow } from '../../components/SettingsRow';

import { useCallback, useState } from 'react';

import { getSnippetStats, getStorageUsage } from '@/lib/stats';
import {
  getPreferences,
  updatePreferences,
  type Preferences,
} from '@/lib/preferences';

export default function SettingsScreen() {
  const [stats, setStats] = useState({
    total: 0,
    favorites: 0,
  });

  const [storageUsed, setStorageUsed] = useState('0 MB');
  const [preferences, setPreferences] = useState<Preferences>({
    theme: 'dark',
    codeWrap: true,
    fontSize: 'medium',
  });

  async function loadStats() {
    const snippetStats = await getSnippetStats();

    const storage = await getStorageUsage();
    const prefs = await getPreferences();

    setPreferences(prefs);

    setStats(snippetStats);

    setStorageUsed(storage);
  }

  async function handleThemeToggle() {
    const next = await updatePreferences({
      theme: preferences.theme === 'dark' ? 'system' : 'dark',
    });

    setPreferences(next);
  }

  async function handleCodeWrapToggle() {
    const next = await updatePreferences({
      codeWrap: !preferences.codeWrap,
    });

    setPreferences(next);
  }

  async function handleFontSizeChange() {
    const nextSize =
      preferences.fontSize === 'small'
        ? 'medium'
        : preferences.fontSize === 'medium'
          ? 'large'
          : 'small';

    const next = await updatePreferences({
      fontSize: nextSize,
    });

    setPreferences(next);
  }

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 140,
      }}
    >
      <Text style={styles.heading}>Settings</Text>

      <Text style={styles.subtitle}>Manage your SnippetVault preferences</Text>

      <Text style={styles.sectionTitle}>Overview</Text>

      <View style={styles.card}>
        <SettingsRow
          icon="code-slash-outline"
          title="Total Snippets"
          subtitle={`${stats.total} snippets`}
        />

        <SettingsRow
          icon="star-outline"
          title="Favorites"
          subtitle={`${stats.favorites} favourites`}
        />
      </View>

      <Text style={styles.sectionTitle}>Storage</Text>

      <View style={styles.card}>
        <SettingsRow
          icon="folder-open-outline"
          title="Storage Used"
          subtitle={storageUsed}
        />

        <SettingsRow
          icon="download-outline"
          title="Export Backup"
          subtitle="Save snippets locally"
        />

        <SettingsRow
          icon="cloud-upload-outline"
          title="Restore Backup"
          subtitle="Import previous backup"
        />
        <SettingsRow
          icon="moon-outline"
          title="Theme"
          subtitle={preferences.theme}
          onPress={handleThemeToggle}
        />
        <SettingsRow
          icon="document-text-outline"
          title="Code Wrap"
          subtitle={preferences.codeWrap ? 'Enabled' : 'Disabled'}
          onPress={handleCodeWrapToggle}
        />
        <SettingsRow
          icon="text-outline"
          title="Font Size"
          subtitle={preferences.fontSize}
          onPress={handleFontSizeChange}
        />
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>

      <View style={styles.card}>
        <SettingsRow icon="moon-outline" title="Theme" subtitle="Dark" />

        <SettingsRow
          icon="document-text-outline"
          title="Code Wrap"
          subtitle="Enabled"
        />

        <SettingsRow icon="text-outline" title="Font Size" subtitle="Medium" />
      </View>

      <Text style={styles.sectionTitle}>Danger Zone</Text>

      <View style={styles.card}>
        <SettingsRow
          icon="trash-outline"
          title="Clear All Snippets"
          subtitle="Delete all saved snippets"
          danger
        />

        <SettingsRow
          icon="folder-outline"
          title="Delete All Files"
          subtitle="Remove exports & screenshots"
          danger
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B1A',
    paddingHorizontal: 20,
    paddingTop: 64,
  },

  heading: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#A1A1AA',
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    overflow: 'hidden',
  },
});
