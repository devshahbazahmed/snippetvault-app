import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { getAllSnippets } from '@/db/snippets';
import type { Snippets } from '@/types/snippet';
import SnippetCard from '../../components/SnippetCard';

export default function HomeScreen() {
  const [snippets, setSnippets] = useState<Snippets[]>([]);

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

  useFocusEffect(
    useCallback(() => {
      loadSnippets();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SnippetVault</Text>

        <Text style={styles.subtitle}>Your saved code snippets</Text>
      </View>

      <FlatList
        data={snippets}
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
        renderItem={({ item }) => <SnippetCard snippet={item} />}
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

    backgroundColor: '#8B5CF6',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
