export type Snippets = {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];

  isFavourite: boolean;

  screenshotUri?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SnippetRow = Omit<Snippets, 'tags'> & {
  tags: string;
};
