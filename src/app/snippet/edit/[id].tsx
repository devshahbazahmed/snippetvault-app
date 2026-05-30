import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { getSnippetById, updateSnippet } from '@/db/snippets';

const LANGUAGES = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust'];

export default function EditSnippetScreen() {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('TypeScript');
  const [tags, setTags] = useState('');

  useEffect(() => {
    loadSnippet();
  }, []);

  async function loadSnippet() {
    const snippet = await getSnippetById(String(id));

    if (!snippet) return;

    setTitle(snippet.title);
    setCode(snippet.code);
    setLanguage(snippet.language);

    setTags(snippet.tags.join(', '));
  }

  async function handleUpdate() {
    await updateSnippet(String(id), {
      title,
      code,
      language,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    router.back();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Edit Snippet</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#71717A"
      />

      <TextInput
        style={styles.input}
        value={tags}
        onChangeText={setTags}
        placeholder="Tags"
        placeholderTextColor="#71717A"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.languages}
      >
        {LANGUAGES.map((item) => {
          const selected = item === language;

          return (
            <Pressable
              key={item}
              onPress={() => setLanguage(item)}
              style={[styles.chip, selected && styles.chipActive]}
            >
              <Text
                style={[styles.chipText, selected && styles.chipTextActive]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <TextInput
        multiline
        textAlignVertical="top"
        style={styles.codeInput}
        value={code}
        onChangeText={setCode}
      />

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
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
    paddingBottom: 40,
  },

  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
  },

  input: {
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    marginBottom: 16,
  },

  languages: {
    gap: 10,
    marginBottom: 18,
  },

  chip: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  chipActive: {
    backgroundColor: 'darkblue',
  },

  chipText: {
    color: '#A1A1AA',
    fontWeight: '600',
  },

  chipTextActive: {
    color: '#fff',
  },

  codeInput: {
    minHeight: 260,
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    color: '#fff',
    fontFamily: 'monospace',
    fontSize: 15,
  },

  button: {
    backgroundColor: 'darkblue',
    marginTop: 24,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
