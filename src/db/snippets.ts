import { SnippetRow, Snippets } from '../types/snippet';
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

export async function getSnippetById(id: string) {
  const row = await db.getFirstAsync<SnippetRow>(
    `SELECT * FROM snippets WHERE id = ?`,
    [id]
  );

  if (!row) return null;

  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
  } as Snippets;
}

export async function toggleFavorite(id: string, favorite: boolean) {
  await db.runAsync(
    `
    UPDATE snippets
    SET favorite = ?, updatedAt = ?
    WHERE id = ?
    `,
    [Number(favorite), new Date().toISOString(), id]
  );
}

export async function updateSnippet(
  id: string,
  payload: {
    title: string;
    code: string;
    language: string;
    tags: string[];
  }
) {
  await db.runAsync(
    `
    UPDATE snippets
    SET
      title = ?,
      code = ?,
      language = ?,
      tags = ?,
      updatedAt = ?
    WHERE id = ?
    `,
    [
      payload.title,
      payload.code,
      payload.language,
      JSON.stringify(payload.tags),
      new Date().toISOString(),
      id,
    ]
  );
}
