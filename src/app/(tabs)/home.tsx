import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { getAllSnippets, toggleFavorite } from '@/db/snippets';
import type { Snippets } from '@/types/snippet';
import SnippetCard from '../../components/SnippetCard';

export default function HomeScreen() {
  const [snippets, setSnippets] = useState<Snippets[]>([]);
  const [search, setSearch] = useState<string>('');

  async function loadSnippets() {
    const data = await getAllSnippets();

    const parsed = data.map((snippet) => ({
      ...snippet,
      tags:
        typeof snippet.tags === 'string'
          ? JSON.parse(snippet.tags)
          : snippet.tags,
    }));

    setSnippets(parsed);
  }

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);

    setSnippets((prev) =>
      prev.map((snippet) =>
        snippet.id === id
          ? {
              ...snippet,
              favorite: !snippet.isFavourite,
            }
          : snippet
      )
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadSnippets();
    }, [])
  );

  const filteredSnippets = snippets.filter((snippet) => {
    const query = search.toLowerCase();
    return (
      snippet.title.toLowerCase().includes(query) ||
      snippet.language.toLowerCase().includes(query) ||
      snippet.code.toLowerCase().includes(query) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SnippetVault</Text>
        <Text style={styles.subtitle}>Your saved code snippets</Text>
        <TextInput
          placeholder="Search snippets..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#71717A"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredSnippets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No snippets yet</Text>

            <Text style={styles.emptySubtext}>
              Tap + to create your first snippet
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <SnippetCard snippet={item} onToggleFavorite={handleToggleFavorite} />
        )}
      />

      <Pressable style={styles.fab} onPress={() => router.push('/snippet/new')}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B1A',
  },

  header: {
    paddingTop: 72,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },

  subtitle: {
    color: '#A1A1AA',
    marginTop: 6,
    fontSize: 15,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 140,
    gap: 14,
  },

  language: {
    marginTop: 8,
    color: '#8B5CF6',
    fontWeight: '600',
  },

  empty: {
    alignItems: 'center',
    marginTop: 120,
  },

  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  emptySubtext: {
    color: '#71717A',
    marginTop: 8,
  },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 110,
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: 'darkblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginTop: 16,
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
  },
});
