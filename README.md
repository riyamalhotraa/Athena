# Athena — Autonomous Data Scientist Platform

Production-ready React frontend for Athena, unifying eight independently-designed
Stitch mockups (Login, Dashboard, Dataset Upload, Analysis, Visualizations, AI Chat,
Reports, Settings) into a single, visually consistent SaaS application.

## Tech Stack

- React 18 + Vite
- Tailwind CSS (custom design-system tokens)
- React Router DOM v6 (lazy-loaded routes)
- Axios (API layer, ready for the FastAPI backend)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy the env template and point it at your FastAPI backend
cp .env.example .env
# VITE_API_BASE_URL=http://localhost:8000

# 3. Run the dev server
npm run dev
# → http://localhost:5173

# 4. Production build
npm run build
npm run preview
```

### Required npm packages

Already declared in `package.json`:

- `react`, `react-dom`
- `react-router-dom`
- `axios`
- `tailwindcss`, `postcss`, `autoprefixer`
- `vite`, `@vitejs/plugin-react`
- `eslint` + React plugins (dev-only)

No other runtime dependencies are required — charts on the Visualizations page are
hand-rolled inline SVG components (`src/components/visualizations/MiniCharts.jsx`) so
the app has zero charting-library weight until you wire in real data.

## Folder Structure

```
src/
├── assets/                # Static images/icons bundled by Vite
├── components/
│   ├── layout/             # Sidebar, Navbar, MobileSidebar, DashboardLayout
│   ├── ui/                 # Design-system primitives (Button, Card, Table, Modal, ...)
│   ├── dashboard/          # Dashboard-only building blocks
│   ├── datasets/           # DatasetCard
│   ├── analysis/           # FeatureListItem, QualityMetricBar, SuggestedActionCard
│   ├── visualizations/     # ChartCard, FilterBar, MiniCharts (SVG placeholders)
│   ├── chat/                # ChatBubble, TypingIndicator, ChatHistoryList, SuggestionChip
│   ├── reports/            # ReportCard
│   └── settings/           # SettingsSection, ToggleRow
├── pages/                  # One file per route (lazy-loaded)
├── hooks/                  # useAuth (session/localStorage-backed)
├── services/                # Axios calls, one file per backend router
├── routes/                  # AppRoutes + ProtectedRoute
├── utils/                   # formatters.js (dates, numbers, classNames helper)
├── index.css                 # Global base styles, scrollbars, keyframes
├── App.jsx
└── main.jsx
```

## Design System (unified across every page)

The eight Stitch exports each defined their own Tailwind config with slightly
different navbar heights, sidebar widths, search-bar widths, and border radii.
`tailwind.config.js` now holds the single source of truth:

| Token | Value |
|---|---|
| Sidebar width | `280px` (fixed) |
| Navbar height | `64px` (fixed) |
| Search bar | `320px` max width, pill-shaped |
| Page padding | `40px` desktop / `16px` mobile (`margin-desktop` / `margin-mobile`) |
| Card radius | `16px` (`rounded-card`) |
| Button/input radius | `8px` default, `12px` (`xl`) for large buttons |
| Grid gutter | `24px` (`gutter`) |
| Section spacing | `32px` (`stack-lg`) |
| Shadow | `shadow-card` / `shadow-card-hover` |
| Type scale | `label-md` 12px, `body-md` 14px, `body-lg` 16px, `title-lg` 18px, `headline-md` 24px, `headline-lg` 32px, `display-lg` 48px |
| Color palette | Material-derived tokens (`primary #004ac6`, `secondary`, `tertiary`, `surface-*`, `on-*`) shared by every mockup — kept as-is since they already matched |

Every page consumes these tokens through shared components (`Card`, `Button`,
`StatCard`, `Table`, `PageHeader`, `SearchBar`, etc.) instead of redeclaring
spacing/typography inline, so future pages automatically inherit the same look.

## Layout

`components/layout/DashboardLayout.jsx` is used by every authenticated route:

- **Sidebar** — fixed, `280px`, full height, own scroll for nav items.
- **Navbar** — fixed, `64px`, spans from the sidebar edge to the viewport edge.
- **Content** — `<main>` is offset by the sidebar width and top-padded by the
  navbar height; only the content area scrolls, so the chrome never moves.
- On mobile, the sidebar collapses into a slide-over (`MobileSidebar.jsx`)
  triggered by a floating menu button.

## Routing

`src/routes/AppRoutes.jsx` lazy-loads every page with `React.lazy` + `Suspense`.
`/login` is public; every other route is wrapped in `ProtectedRoute`, which checks
`useAuth().isAuthenticated` (backed by a `athena_token` value in `localStorage`)
and redirects to `/login` otherwise, preserving the originally requested path for
a post-login redirect.

## Backend Integration

`src/services/` mirrors the FastAPI router list one-to-one:

| File | Endpoints |
|---|---|
| `authService.js` | `/auth/login`, `/auth/logout`, `/auth/me` |
| `datasetService.js` | `/datasets/*` |
| `analysisService.js` | `/analysis/*` |
| `aiService.js` | `/ai/insights`, `/ai/recommendations`, `/ai/preprocessing` |
| `mlService.js` | `/ml/*` |
| `visualizationService.js` | `/visualizations/*` |
| `chatService.js` | `/chat`, `/chat/history` |
| `reportService.js` | `/reports/*` |
| `settingsService.js` | `/settings` |
| `dashboardService.js` | `/dashboard/stats` |
| `healthService.js` | `/health` |

All requests go through `services/apiClient.js`, a single Axios instance that:

- Reads `VITE_API_BASE_URL` (defaults to `http://localhost:8000`)
- Attaches `Authorization: Bearer <token>` from `localStorage`
- Centralizes error logging

No backend logic is implemented here — pages call these functions and fall back
to local mock data/state when a call fails, so the UI stays fully explorable
before the FastAPI service is running.

## Performance Notes

- Every page is lazy-loaded (`React.lazy`) and code-split by route.
- Lists/tables use stable `key`s and avoid inline object recreation where it
  would cause unnecessary child re-renders.
- Images use `loading` best practices where applicable; the login illustration
  degrades gracefully (`onError` hides it) if the asset is renamed or removed.
- Animations are intentionally subtle: a shared `fade-in-up` keyframe for page
  and modal transitions, and a `typing-dot` bounce for the AI Chat loading state.

## Known Placeholders

- Visualizations use lightweight inline SVGs instead of a charting library —
  swap in Recharts/D3/Plotly and wire `visualizationService.js` once
  `/visualizations/generate` returns real series data.
- `Login.jsx` falls back to a demo session token if `/auth/login` isn't
  reachable, so reviewers can still click through the whole app offline.
