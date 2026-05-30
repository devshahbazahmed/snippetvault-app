import { getAllSnippets } from '@/db/snippets';
import { Directory, Paths } from 'expo-file-system';

export async function getSnippetStats() {
  const snippets = await getAllSnippets();

  return {
    total: snippets.length,
    favorites: snippets.filter((snippet) => snippet.favorite).length,
  };
}

export async function getStorageUsage() {
  const rootDir = new Directory(Paths.document, 'snippetvault');

  if (!rootDir.exists) {
    return '0 MB';
  }

  const files = rootDir.list();

  let totalBytes = 0;

  files.forEach((item) => {
    if ('size' in item) {
      totalBytes += item.size ?? 0;
    }
  });

  const mb = totalBytes / 1024 / 1024;

  return `${mb.toFixed(2)} MB`;
}
