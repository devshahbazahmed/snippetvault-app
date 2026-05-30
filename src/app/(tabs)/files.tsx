import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { deleteFile, getFiles, renameFile, type LocalFile } from '@/lib/files';
import { shareFile } from '@/lib/share-file';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type FileItem = {
  id: string;
  name: string;
  type: 'code' | 'image' | 'document';
  size: string;
  updatedAt: string;
  uri?: string;
};

const folders = [
  {
    id: '1',
    name: 'Screenshots',
    items: 0,
    updated: 'Recently',
  },

  {
    id: '2',
    name: 'Templates',
    items: 0,
    updated: 'Empty',
  },

  {
    id: '3',
    name: 'Exported Snippets',
    items: 0,
    updated: 'Empty',
  },
];

const files: FileItem[] = [];

const filters = ['All Files', 'Recent', 'Favorites', 'Trash'];

export default function FilesScreen() {
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [activeFilter, setActiveFilter] = useState('All Files');

  const filteredFolders = useMemo(
    () =>
      folders.filter((folder) =>
        folder.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  async function loadFiles() {
    const data = await getFiles();

    setFiles(data);
  }

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  async function handleDelete(uri: string) {
    Alert.alert('Delete file', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },

      {
        text: 'Delete',

        style: 'destructive',

        onPress: async () => {
          await deleteFile(uri);

          await loadFiles();
        },
      },
    ]);
  }

  async function handleRename(uri: string, name: string) {
    const renamed = `copy-${name}`;

    await renameFile(uri, renamed);

    await loadFiles();
  }

  async function handleShare(uri: string) {
    await shareFile(uri);
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Local Storage</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#71717A" />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search snippets and folders..."
            placeholderTextColor="#71717A"
            style={styles.input}
          />
        </View>

        <View style={styles.storageCard}>
          <View style={styles.storageRow}>
            <Text style={styles.storageLabel}>STORAGE USED</Text>

            <Text style={styles.storageValue}>Local Files</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.storageMeta}>SnippetVault local storage</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text
                  style={[styles.filterText, active && styles.filterTextActive]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {filteredFolders.map((folder) => (
          <Pressable key={folder.id} style={styles.folderCard}>
            <View style={styles.folderIcon}>
              <Ionicons name="folder" size={28} color="#4DD0E1" />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={styles.folderTitle}>{folder.name}</Text>

              <Text style={styles.folderMeta}>
                {folder.items} items • {folder.updated}
              </Text>
            </View>

            <Ionicons name="ellipsis-vertical" size={20} color="#A1A1AA" />
          </Pressable>
        ))}

        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 140,
          }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.fileCard}
              onPress={() => handleShare(item.uri)}
              onLongPress={() =>
                Alert.alert(item.name, 'Choose an action', [
                  {
                    text: 'Share',
                    onPress: () => handleShare(item.uri),
                  },

                  {
                    text: 'Rename',
                    onPress: () => handleRename(item.uri, item.name),
                  },

                  {
                    text: 'Delete',
                    style: 'destructive',

                    onPress: () => handleDelete(item.uri),
                  },

                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ])
              }
            >
              <View style={styles.fileIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={22}
                  color="#8B5CF6"
                />
              </View>

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={styles.fileName}>{item.name}</Text>

                <Text style={styles.fileMeta}>
                  {Math.round(item.size / 1024)} KB
                </Text>
              </View>

              <Ionicons name="ellipsis-vertical" size={18} color="#71717A" />
            </Pressable>
          )}
        />
      </ScrollView>

      <Pressable style={styles.fab}>
        <Ionicons name="add" size={34} color="#2E1065" />
      </Pressable>
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

  searchBox: {
    marginTop: 24,

    backgroundColor: '#111827',

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 14,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },

  storageCard: {
    marginTop: 24,

    backgroundColor: '#111827',

    borderRadius: 22,

    padding: 20,
  },

  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  storageLabel: {
    color: '#A1A1AA',
    letterSpacing: 2,
    fontSize: 12,
  },

  storageValue: {
    color: '#C4B5FD',
    fontWeight: '600',
  },

  progressTrack: {
    marginTop: 16,
    height: 10,

    backgroundColor: '#1E293B',

    borderRadius: 999,
  },

  progressFill: {
    width: '35%',
    height: '100%',

    backgroundColor: '#8B5CF6',

    borderRadius: 999,
  },

  storageMeta: {
    marginTop: 14,
    color: '#A1A1AA',
  },

  filterRow: {
    gap: 12,
    marginTop: 24,
    paddingRight: 20,
  },

  filterChip: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },

  filterChipActive: {
    backgroundColor: '#8B5CF6',
  },

  filterText: {
    color: '#D4D4D8',
  },

  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  folderCard: {
    marginTop: 18,

    backgroundColor: '#111827',

    borderRadius: 22,

    padding: 18,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  folderIcon: {
    width: 56,
    height: 56,

    borderRadius: 16,

    backgroundColor: '#1E293B',

    alignItems: 'center',
    justifyContent: 'center',
  },

  folderTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  folderMeta: {
    marginTop: 4,
    color: '#A1A1AA',
  },

  fab: {
    position: 'absolute',

    right: 24,
    bottom: 120,

    width: 72,
    height: 72,

    borderRadius: 24,

    backgroundColor: '#C4B5FD',

    alignItems: 'center',
    justifyContent: 'center',
  },

  fileCard: {
    marginTop: 14,

    backgroundColor: '#111827',

    borderRadius: 20,

    padding: 16,

    flexDirection: 'row',
    alignItems: 'center',

    gap: 14,
  },

  fileIcon: {
    width: 48,
    height: 48,

    borderRadius: 14,

    backgroundColor: '#1E293B',

    alignItems: 'center',
    justifyContent: 'center',
  },

  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  fileMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#71717A',
  },
});
