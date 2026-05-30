import { Directory, File, Paths } from 'expo-file-system';

import * as ImagePicker from 'expo-image-picker';

const rootDir = new Directory(Paths.document, 'snippetvault');

const screenshotsDir = new Directory(rootDir, 'screenshots');

function ensureScreenshotsFolder() {
  if (!rootDir.exists) {
    rootDir.create();
  }

  if (!screenshotsDir.exists) {
    screenshotsDir.create();
  }
}

export async function pickAndSaveScreenshot(snippetId: string) {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,

    quality: 0.8,
  });

  if (result.canceled) {
    return null;
  }

  ensureScreenshotsFolder();

  const asset = result.assets[0];

  const file = new File(screenshotsDir, `${snippetId}.jpg`);

  file.write(await fetch(asset.uri).then((r) => r.bytes()));

  return file.uri;
}
