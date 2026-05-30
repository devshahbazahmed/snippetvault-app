# SnippetVault

SnippetVault is a local-first Expo app for saving, searching, editing, exporting, and organizing code snippets on mobile. It uses Expo Router for navigation, Expo SQLite for persistent snippet storage, and Expo FileSystem for exported snippets and attachments.

## Features

- Create, edit, delete, and view code snippets.
- Search snippets by title, language, code, or tag.
- Mark important snippets as favourites.
- Copy snippet code to the clipboard.
- Attach screenshots from the device media library.
- Export snippets to local storage.
- Browse, share, rename, and delete exported local files.
- Track basic snippet and storage stats.
- Persist simple preferences such as theme, code wrapping, and font size.

## Tech Stack

- Expo SDK 55
- React 19 and React Native 0.83
- Expo Router
- Expo SQLite
- Expo FileSystem
- Expo Image Picker
- Expo Sharing
- TypeScript

## Requirements

Expo SDK 55 requires Node.js 20.19.x or newer. Install dependencies with the package manager used by the lockfile:

```bash
pnpm install
```

You can also use another package manager, but keep the lockfile consistent for the project.

## Running the App

Start the Expo development server:

```bash
pnpm start
```

Then choose a target from the Expo CLI prompt, or run one directly:

```bash
pnpm ios
pnpm android
pnpm web
```

The app is configured for portrait orientation and uses the `snippetvault://` scheme.

## Project Structure

```text
src/
  app/                 Expo Router routes and screens
    (tabs)/            Home, favourites, files, and settings tabs
    snippet/           New, detail, and edit snippet screens
  components/          Shared UI components
  db/                  SQLite setup and snippet queries
  lib/                 File, backup, export, stats, attachment, and preference helpers
  types/               Shared TypeScript types
assets/                Icons, splash assets, and images
```

## Data and Storage

Snippet data is stored locally in `snippetvault.db` using Expo SQLite. Exported snippets and screenshots are written under the app document directory in a `snippetvault` folder:

- `exports/` for exported snippet files
- `screenshots/` for attached snippet screenshots
- `backups/` for backup files

No remote API or account system is required.

## Useful Scripts

```bash
pnpm start      # Start Expo
pnpm ios        # Start Expo for iOS simulator
pnpm android    # Start Expo for Android emulator
pnpm web        # Start Expo for web
pnpm lint       # Run Expo lint
```

## Development Notes

- The app initializes the SQLite schema in `src/app/_layout.tsx`.
- Snippet CRUD and favourite state live in `src/db/snippets.ts`.
- File exports and the local file browser use helpers in `src/lib/files.ts` and `src/lib/export-snippet.ts`.
- Backup and restore UI exists in settings, but backup content is currently minimal and restore behavior is not yet wired up.
