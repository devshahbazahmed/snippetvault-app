import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('snippetvault.db');

export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS snippets (
      id TEXT PRIMARY KEY NOT NULL,

      title TEXT NOT NULL,

      code TEXT NOT NULL,

      language TEXT NOT NULL,

      tags TEXT,

      favorite INTEGER DEFAULT 0,

      screenshotUri TEXT,

      createdAt TEXT NOT NULL,

      updatedAt TEXT NOT NULL
    );
  `);
}
