import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getAllSnippets } from '../db/snippets';
import { Snippets } from '../types/snippet';

export default function SnippetCard({
  snippet,
  onToggleFavorite,
}: {
  snippet: Snippets;
  onToggleFavorite: (id: string) => void;
}) {
  const router = useRouter();
  const [snippets, setSnippets] = useState<Snippets[]>([]);
  async function loadSnippets() {
    const data = await getAllSnippets();
    setSnippets(data);
  }
  const tags = snippet.tags ?? [];

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/snippet/[id]',
          params: { id: snippet.id },
        })
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{snippet.title}</Text>

        <Pressable hitSlop={10} onPress={() => onToggleFavorite(snippet.id)}>
          <Ionicons
            name={snippet.isFavourite ? 'star' : 'star-outline'}
            size={22}
            color={snippet.isFavourite ? '#FBBF24' : '#A1A1AA'}
          />
        </Pressable>
      </View>

      <Text style={styles.language}>{snippet.language}</Text>

      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.date}>
        Updated {new Date(snippet.updatedAt).toLocaleDateString()}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 18,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  language: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  codeBlock: {
    marginTop: 16,
    backgroundColor: '#020617',
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#C4B5FD',
  },

  code: {
    color: '#E4E4E7',
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 22,
  },

  cardBottom: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },

  tag: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  tagText: {
    color: '#D4D4D8',
    fontSize: 12,
  },

  date: {
    color: '#71717A',
    marginTop: 14,
    fontSize: 12,
  },

  time: {
    color: '#A1A1AA',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },

  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
});
