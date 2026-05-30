import { Directory, File, Paths } from 'expo-file-system';

import type { Snippets } from '@/types/snippet';

const rootDir = new Directory(Paths.document, 'snippetvault');

const exportsDir = new Directory(rootDir, 'exports');

function ensureExportsFolder() {
  if (!rootDir.exists) {
    rootDir.create();
  }

  if (!exportsDir.exists) {
    exportsDir.create();
  }
}

export async function exportSnippet(
  snippet: Snippets,
  format: 'txt' | 'js' | 'json'
) {
  ensureExportsFolder();

  const extension =
    format === 'json'
      ? 'json'
      : format === 'txt'
        ? 'txt'
        : snippet.language.toLowerCase();

  const filename = `${snippet.title}.${extension}`;

  const file = new File(exportsDir, filename);

  const content =
    format === 'json' ? JSON.stringify(snippet, null, 2) : snippet.code;

  file.write(content);

  return file.uri;
}
