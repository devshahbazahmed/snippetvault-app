import { Directory, File, Paths } from 'expo-file-system';

export type LocalFile = {
  id: string;
  name: string;
  uri: string;
  size: number;
};

const rootDir = new Directory(Paths.document, 'snippetvault');

const exportsDir = new Directory(rootDir, 'exports');

export function ensureRootFolder() {
  if (!rootDir.exists) {
    rootDir.create();
  }

  if (!exportsDir.exists) {
    exportsDir.create();
  }
}

export async function getFiles(): Promise<LocalFile[]> {
  ensureRootFolder();

  const files = exportsDir.list();

  return files
    .filter((item): item is File => item instanceof File)
    .map((file) => ({
      id: file.uri,
      name: file.name,
      uri: file.uri,
      size: file.size ?? 0,
    }));
}

export async function deleteFile(uri: string) {
  const file = new File(uri);

  if (file.exists) {
    file.delete();
  }
}

export async function renameFile(uri: string, newName: string) {
  const file = new File(uri);

  if (!file.exists) return;

  const parent = file.parentDirectory;

  const nextFile = new File(parent, newName);

  file.move(nextFile);

  return nextFile.uri;
}

export async function copyFile(sourceUri: string, targetFolder: Directory) {
  const file = new File(sourceUri);

  if (!file.exists) return;

  const copy = new File(targetFolder, file.name);

  file.copy(copy);

  return copy.uri;
}

export async function moveFile(sourceUri: string, targetFolder: Directory) {
  const file = new File(sourceUri);

  if (!file.exists) return;

  const destination = new File(targetFolder, file.name);

  file.move(destination);

  return destination.uri;
}

export async function createFolder(name: string) {
  const folder = new Directory(rootDir, name);

  if (!folder.exists) {
    folder.create();
  }

  return folder.uri;
}
