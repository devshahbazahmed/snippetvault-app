import { Snippets } from '../types/snippet';
import { db } from './index';

export async function getAllSnippets() {
  return await db.getAllAsync<Snippets>(
    `SELECT * FROM snippets
     ORDER BY updatedAt DESC`
  );
}

export async function createSnippet(snippet: Snippets) {
  await db.runAsync(
    `
    INSERT INTO snippets (
      id,
      title,
      code,
      language,
      tags,
      favorite,
      screenshotUri,
      createdAt,
      updatedAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      snippet.id,
      snippet.title,
      snippet.code,
      snippet.language,
      JSON.stringify(snippet.tags),
      Number(snippet.isFavourite),
      snippet.screenshotUri ?? null,
      snippet.createdAt,
      snippet.updatedAt,
    ]
  );
}

export async function deleteSnippet(id: string) {
  await db.runAsync(`DELETE FROM snippets WHERE id = ?`, [id]);
}
