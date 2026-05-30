import { SnippetRow, Snippets } from '../types/snippet';
import { db } from './index';

export async function getAllSnippets() {
  const rows = await db.getAllAsync<SnippetRow>(
    `
      SELECT *
      FROM snippets
      ORDER BY updatedAt DESC
      `
  );

  return rows.map((row) => ({
    ...row,

    tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : [],

    favorite: Boolean(row.isFavourite),
  }));
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
    favorite: Boolean(row.isFavourite),
  };
}

export async function toggleFavorite(id: string) {
  await db.runAsync(
    `
    UPDATE snippets
    SET favorite =
      CASE
        WHEN favorite = 1 THEN 0
        ELSE 1
      END
    WHERE id = ?
    `,
    [id]
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

export async function getFavoriteSnippets() {
  const rows = await db.getAllAsync<SnippetRow>(
    `
    SELECT *
    FROM snippets
    WHERE favorite = 1
    ORDER BY updatedAt DESC
    `
  );

  return rows.map((row) => ({
    ...row,
    tags: JSON.parse(row.tags || '[]'),
    favorite: Boolean(row.isFavourite),
  }));
}
