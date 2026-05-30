import * as Crypto from 'expo-crypto';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { createSnippet } from '@/db/snippets';

const LANGUAGES = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust'];

export default function NewSnippetScreen() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('TypeScript');

  const [tags, setTags] = useState('');

  async function handleSave() {
    if (!title.trim() || !code.trim()) return;

    const now = new Date().toISOString();

    await createSnippet({
      id: Crypto.randomUUID(),

      title,

      code,

      language,

      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),

      isFavourite: false,

      createdAt: now,
      updatedAt: now,
    });

    router.back();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>New Snippet</Text>

      <TextInput
        placeholder="Snippet title"
        placeholderTextColor="#71717A"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Tags (react, hooks, api)"
        placeholderTextColor="#71717A"
        style={styles.input}
        value={tags}
        onChangeText={setTags}
      />

      <Text style={styles.label}>Language</Text>

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
              style={[
                styles.languageChip,
                selected && styles.languageChipActive,
              ]}
            >
              <Text
                style={[
                  styles.languageText,
                  selected && styles.languageTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <TextInput
        placeholder="Paste code here..."
        placeholderTextColor="#71717A"
        multiline
        textAlignVertical="top"
        style={styles.codeInput}
        value={code}
        onChangeText={setCode}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Snippet</Text>
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

  label: {
    color: '#E4E4E7',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 8,
  },

  input: {
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },

  codeInput: {
    minHeight: 260,
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    color: '#fff',
    fontSize: 15,
    fontFamily: 'monospace',
    marginTop: 8,
  },

  languages: {
    gap: 10,
    marginBottom: 18,
  },

  languageChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#111827',
  },

  languageChipActive: {
    backgroundColor: 'darkblue',
  },

  languageText: {
    color: '#A1A1AA',
    fontWeight: '600',
  },

  languageTextActive: {
    color: '#fff',
  },

  button: {
    backgroundColor: 'darkblue',
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
