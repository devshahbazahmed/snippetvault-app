import * as Sharing from 'expo-sharing';

export async function shareFile(uri: string) {
  const available = await Sharing.isAvailableAsync();

  if (!available) return;

  await Sharing.shareAsync(uri);
}
