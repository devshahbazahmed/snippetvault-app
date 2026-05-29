import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

const LANGUAGES = ['All', 'JavaScript', 'Python', 'TypeScript'];

const SNIPPETS = [
  {
    id: '1',
    language: 'JAVASCRIPT',
    title: 'Async Fetch Wrapper',
    code: `const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};`,
    time: '2 HOURS AGO',
  },
  {
    id: '2',
    language: 'PYTHON',
    title: 'List Comprehension Map',
    code: `def format_users(users):
  return [user.name.title()
          for user in users]`,
    time: '5 HOURS AGO',
  },
  {
    id: '3',
    language: 'RUST',
    title: 'Safe Option Unwrap',
    code: `fn main() {
  let x: Option<&str> = None;
  let val = x.unwrap_or("default");
}`,
    time: 'YESTERDAY',
  },
  {
    id: '4',
    language: 'TYPESCRIPT',
    title: 'Generic Interface',
    code: `interface Response<T> {
  data: T;
  status: number;
}`,
    time: '2 DAYS AGO',
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Pressable>
            <Text style={styles.viewAll}>VIEW ALL →</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {LANGUAGES.map((language, index) => (
            <Pressable
              key={language}
              style={[styles.chip, index === 0 && styles.activeChip]}
            >
              <Text
                style={[styles.chipText, index === 0 && styles.activeChipText]}
              >
                {language.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>
          Recent Snippets
        </Text>

        <View style={styles.snippetList}>
          {SNIPPETS.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.fab}>
        <SymbolView
          name="plus"
          size={30}
          tintColor="#140E22"
          weight="semibold"
        />
      </Pressable>
    </SafeAreaView>
  );
}

function SnippetCard({
  snippet,
}: {
  snippet: {
    language: string;
    title: string;
    code: string;
    time: string;
  };
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.language}>{snippet.language}</Text>

        <SymbolView name="star" size={22} tintColor="#D4D4D8" />
      </View>

      <Text style={styles.cardTitle}>{snippet.title}</Text>

      <View style={styles.codeBlock}>
        <Text style={styles.code}>{snippet.code}</Text>
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.time}>{snippet.time}</Text>

        <View style={styles.cardActions}>
          <SymbolView name="doc.on.doc" size={20} tintColor="#D4D4D8" />

          <SymbolView
            name="square.and.arrow.up"
            size={20}
            tintColor="#D4D4D8"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B1A',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 64,
    paddingBottom: 160,
  },

  sectionHeader: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F4F4F5',
  },

  viewAll: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },

  chips: {
    marginTop: 18,
    gap: 12,
  },

  chip: {
    backgroundColor: '#1C2235',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 18,
  },

  activeChip: {
    backgroundColor: '#8B5CF6',
  },

  chipText: {
    color: '#D4D4D8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },

  activeChipText: {
    color: '#fff',
  },

  snippetList: {
    marginTop: 20,
    gap: 20,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  language: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },

  cardTitle: {
    color: '#F9FAFB',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 14,
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

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 110,
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
});
