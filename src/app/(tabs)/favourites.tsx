import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { getFavoriteSnippets, toggleFavorite } from '@/db/snippets';

import type { Snippets } from '@/types/snippet';

export default function FavouritesScreen() {
  const [snippets, setSnippets] = useState<Snippets[]>([]);

  async function loadSnippets() {
    const data = await getFavoriteSnippets();

    setSnippets(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadSnippets();
    }, [])
  );

  async function handleToggle(snippet: Snippets) {
    await toggleFavorite(snippet.id);

    loadSnippets();
  }

  function renderItem({ item }: { item: Snippets }) {
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: '/snippet/[id]',
            params: {
              id: item.id,
            },
          })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.language}>{item.language.toUpperCase()}</Text>

          <Pressable onPress={() => handleToggle(item)}>
            <Ionicons name="star" size={26} color="#FBBF24" />
          </Pressable>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.previewBox}>
          <Text style={styles.preview} numberOfLines={1}>
            {item.code}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.tags}>
            {item.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.date}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favourite Snippets</Text>

      <Text style={styles.subtitle}>
        Your curated collection of essential code blocks.
      </Text>

      <FlatList
        data={snippets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
          paddingTop: 24,
        }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="star-outline" size={48} color="#71717A" />

            <Text style={styles.emptyText}>No starred snippets yet</Text>
          </View>
        }
      />
    </View>
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
    fontSize: 42,
    fontWeight: '700',
    color: '#E4E4E7',
  },

  subtitle: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 30,
    color: '#A1A1AA',
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  language: {
    color: '#22D3EE',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 2,
  },

  title: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: '700',
    color: '#E4E4E7',
  },

  previewBox: {
    marginTop: 18,
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 16,
  },

  preview: {
    color: '#A1A1AA',
    fontFamily: 'monospace',
    fontSize: 16,
  },

  footer: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tag: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  tagText: {
    color: '#D4D4D8',
    fontSize: 13,
  },

  date: {
    color: '#A1A1AA',
    fontSize: 15,
  },

  emptyState: {
    marginTop: 120,
    alignItems: 'center',
    gap: 16,
  },

  emptyText: {
    color: '#71717A',
    fontSize: 16,
  },
});
