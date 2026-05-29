import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Snippets } from '../types/snippet';

export default function SnippetCard({ snippet }: { snippet: Snippets }) {
  const router = useRouter();
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

        {snippet.isFavourite && (
          <Ionicons name="star" size={18} color="#FBBF24" />
        )}
      </View>

      <Text style={styles.language}>{snippet.language}</Text>

      <View style={styles.tags}>
        {snippet.tags.map((tag) => (
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
