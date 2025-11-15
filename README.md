# TrialTracker

TrialTracker is an offline-first desktop experience for browsing, filtering, and tracking clinical trials with an optional investor intelligence layer. The application mirrors the familiar ClinicalTrials.gov layout while layering in sponsor analytics, pipeline heatmaps, catalyst alerts, and a milestone calendar for biotech investors.

## Features

- **Patient mode** by default with eligibility highlights, treatment alternatives, risk/benefit summaries, and similarity suggestions computed locally.
- **Investor mode** toggle exposing catalysts, ticker links, pipeline heatmaps, PDUFA alerts, historical win rates, and sponsor benchmarks.
- **Powerful filtering** by condition, phase, status, trial type, age band, gender, and geography.
- **Infinite-scroll results** with blazing-fast local SQLite queries and instant copy-to-clipboard summaries.
- **Monthly milestone calendar** with investor callouts (PDUFA, Phase III readouts) and sponsor/ticker quick filters.
- **Watchlist with notifications** leveraging the Tauri notification API and background sync delta checks.
- **Portable exports** to CSV and PDF generated locally for both patients and investors.
- **Daily sync engine** against the ClinicalTrials.gov v2 API with optional FDA augmentation and resilient offline fallbacks.
- **System tray presence** showing new trial counts and last-sync timestamps for passive monitoring.

## Getting started

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (via `rustup`) with the latest stable toolchain.
- [pnpm](https://pnpm.io/) package manager.
- Node.js 18+.

### Initial setup

```bash
pnpm install
npx prisma generate
npx prisma db push
```

### Development

```bash
pnpm tauri dev
```

This launches the Vite development server and attaches the Tauri shell for a native desktop preview.

### Production build

```bash
pnpm tauri build
```

The optimized, code-signed bundles (MSI, DMG, AppImage, and portable executables) are generated in `src-tauri/target/release/bundle`.

## Architecture

- **Frontend**: React 18 + Vite + TypeScript styled with Tailwind CSS and shadcn/ui primitives. State management uses Zustand for mode and filter persistence.
- **Backend**: Tauri 2 (Rust) orchestrating SQLite via `sqlx` for runtime access and the Tauri SQL plugin for portability. All HTTP requests occur inside Tauri commands to maintain an offline-first posture.
- **Database**: SQLite schema modelled in `prisma/schema.prisma` (development migrations via Prisma CLI only). Runtime queries run through Rust commands defined in `src-tauri/src/lib.rs`.
- **Sync**: Scheduled and manual sync operations query ClinicalTrials.gov v2 endpoints, hydrate normalized tables, enrich with FDA metadata, and drive notifications.

## Development tips

- Use `pnpm run format` to format source code.
- Trigger a manual sync from the UI or by invoking the `sync_now` Tauri command.
- Local exports are written to the OS downloads directory and surfaced back to the UI for convenience.
- To seed quickly, supply the official ClinicalTrials.gov ZIP dump to the Rust command `sync_now` (automatically handled on first run).

## Portable mode

The Tauri configuration enables portable single-file builds. Double-clicking the binary (Windows `.exe`, macOS `.app`/`.dmg`, Linux `.AppImage`) immediately launches TrialTracker without additional installation steps.

## License

TrialTracker is provided for educational purposes. Consult your compliance team before using any exported data for commercial decision-making.
