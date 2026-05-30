import { Directory, File, Paths } from 'expo-file-system';

import * as Sharing from 'expo-sharing';

const rootDir = new Directory(Paths.document, 'snippetvault');

const backupDir = new Directory(rootDir, 'backups');

function ensureBackupFolder() {
  if (!rootDir.exists) rootDir.create();

  if (!backupDir.exists) {
    backupDir.create();
  }
}

export async function exportBackup() {
  ensureBackupFolder();

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const file = new File(backupDir, `snippetvault-backup-${timestamp}.json`);

  const data = {
    exportedAt: new Date().toISOString(),
  };

  file.write(JSON.stringify(data, null, 2));

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri);
  }

  return file.uri;
}
