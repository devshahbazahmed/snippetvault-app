import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { deleteSnippet, getSnippetById, toggleFavorite } from '@/db/snippets';
import { exportSnippet } from '@/lib/export-snippet';
import ActionButton from '../../components/ActionButton';
import { Snippets } from '../../types/snippet';

export default function SnippetDetailScreen() {
  const { id } = useLocalSearchParams();

  const [snippet, setSnippet] = useState<any>(null);

  async function loadSnippet() {
    const data = await getSnippetById(String(id));

    if (!data) return;

    setSnippet(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadSnippet();
    }, [id])
  );

  async function handleCopy() {
    await Clipboard.setStringAsync(snippet.code);
  }

  function handleEdit() {
    router.push({
      pathname: '/snippet/edit/[id]',
      params: {
        id: snippet.id,
      },
    });
  }

  function handleDelete() {
    Alert.alert('Delete snippet', 'This action cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteSnippet(snippet.id);
          router.back();
        },
      },
    ]);
  }

  if (!snippet) return null;
  const handleToggleFavorite = async () => {
    await toggleFavorite(snippet.id);

    setSnippet((prev: Snippets) =>
      prev
        ? {
            ...prev,
            favorite: !prev.isFavourite,
          }
        : null
    );
  };

  async function handleExport() {
    if (!snippet) return;

    await exportSnippet(snippet, 'txt');

    Alert.alert('Exported', 'Snippet saved to local storage');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>

        <Text style={styles.title}>{snippet.title}</Text>

        <View style={styles.headerActions}>
          <Pressable hitSlop={10} onPress={handleToggleFavorite}>
            <Ionicons
              name={snippet.isFavourite ? 'star' : 'star-outline'}
              size={24}
              color={snippet.isFavourite ? '#FBBF24' : '#fff'}
            />
          </Pressable>

          <Pressable hitSlop={10} onPress={handleEdit}>
            <Ionicons name="create-outline" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.languageBadge}>
          <Text style={styles.languageText}>{snippet.language}</Text>
        </View>

        <Text style={styles.date}>
          Created {new Date(snippet.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.tagRow}>
        {snippet.tags.map((tag: string) => (
          <Text key={tag} style={styles.tag}>
            #{tag}
          </Text>
        ))}
      </View>

      <View style={styles.codeCard}>
        <View style={styles.codeHeader}>
          <Text style={styles.fileName}>
            {snippet.title.replace(/\s+/g, '-').toLowerCase()}
            .ts
          </Text>

          <Pressable style={styles.copyButton} onPress={handleCopy}>
            <Ionicons name="copy-outline" size={18} color="#C4B5FD" />

            <Text style={styles.copyText}>Copy</Text>
          </Pressable>
        </View>

        <ScrollView horizontal>
          <Text style={styles.code}>{snippet.code}</Text>
        </ScrollView>
      </View>

      <Pressable style={styles.aiButton} onPress={handleCopy}>
        <Ionicons name="copy-outline" size={20} color="#4C1D95" />

        <Text style={styles.aiButtonText}>Copy</Text>
      </Pressable>

      <View style={styles.actionsRow}>
        <ActionButton
          icon="download-outline"
          label="Export"
          onPress={handleExport}
        />

        <ActionButton icon="share-social-outline" label="Share" />

        <ActionButton
          icon="trash-outline"
          label="Delete"
          danger
          onPress={handleDelete}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B1A',
  },

  content: {
    padding: 20,
    paddingTop: 64,
    paddingBottom: 140,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: '#DDD6FE',
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    marginHorizontal: 16,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 12,
  },

  languageBadge: {
    backgroundColor: '#06B6D4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  languageText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  date: {
    color: '#A1A1AA',
    fontSize: 18,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },

  tag: {
    color: '#22D3EE',
    fontSize: 18,
  },

  codeCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    marginTop: 28,
    overflow: 'hidden',
  },

  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#27272A',
  },

  fileName: {
    color: '#D4D4D8',
    fontWeight: '700',
  },

  copyButton: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },

  copyText: {
    color: '#C4B5FD',
    fontWeight: '700',
  },

  code: {
    color: '#E4E4E7',
    fontFamily: 'monospace',
    fontSize: 15,
    lineHeight: 24,
    padding: 20,
  },

  aiButton: {
    marginTop: 28,
    backgroundColor: '#C4B5FD',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  aiButtonText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#4C1D95',
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});
