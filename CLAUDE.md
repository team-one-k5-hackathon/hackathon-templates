# CLAUDE.md

Hackathon template: Next.js 16 (App Router), shadcn/ui, Tailwind CSS, Azure OpenAI, Clerk auth, Zustand, next-intl.

## Commands

```bash
npm run dev          # dev server (Turbopack)
npm run build        # production build
npm run lint         # ESLint
npm run format:write # Prettier
```

## Project structure

```
src/
  app/
    (routes)/     # user-facing pages
    (admin)/      # admin-only pages
    layout.tsx    # root layout (sidebar shell)
    layout-data.ts  # sidebar nav config
    routes.ts     # central ROUTES constant
  components/
    blocks/       # Sidebar, Chat
    charts/       # AreaChartCard, BarComparisonChart, LineTrendChart
    tables/       # FinancialTable, Table
    ui/           # shadcn primitives
    utils/        # Alert, FileUpload
    widgets/      # LLM-renderable widgets (TextWidget)
  stores/         # Zustand stores
  types/          # shared types (llm.ts, schema.ts)
  lib/            # formatting utilities
  tools/          # server-side tools (Excel reader)
```

## Adding a new route

1. Create `src/app/(routes)/<your-route>/page.tsx`
2. Add the path to `src/app/routes.ts` under `ROUTES`
3. Add a nav item to `SIDEBAR_NAVIGATION` in `src/app/layout-data.ts` (name, href, Lucide icon)
4. Add a translation key under `Sidebar` in `i18n/en.json` and `i18n/de.json`

## Components & side-chat

Use the skills `/repo-components` and `/repo-sidechat` for detailed usage, props, and examples.

Whenever a new component, chart, table, or widget is added or modified, update the relevant skill file immediately:
- New/changed UI components → `.claude/skills/repo-components/SKILL.md`
- New/changed widget (implements `IWidget`) or changes to the `Chat` wiring → `.claude/skills/repo-sidechat/SKILL.md`

Keep the skill files in sync with the code: props, types, LLM widget names, and usage examples should always reflect the current implementation.

## Environment variables

Copy `.env.template` to `.env`:

```
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_API_VERSION=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
