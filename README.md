# k5 Hackathon Template

A Next.js starter for building AI-powered dashboards — includes a sidebar shell, data visualization components, and an AI side-chat panel backed by Azure OpenAI.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **shadcn/ui** + Radix UI + Tailwind CSS
- **Recharts** for charts
- **Azure OpenAI** (`gpt-4o`) for the side-chat
- **Clerk** for authentication
- **Zustand** for state management
- **next-intl** for i18n (EN / DE)

## Getting started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template and fill in your credentials:
   ```bash
   cp .env.template .env
   ```

   | Variable | Description |
   |---|---|
   | `AZURE_OPENAI_ENDPOINT` | Azure OpenAI resource endpoint |
   | `AZURE_OPENAI_API_KEY` | Azure OpenAI API key |
   | `AZURE_OPENAI_API_VERSION` | API version (e.g. `2024-02-01`) |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
   | `CLERK_SECRET_KEY` | Clerk secret key |

3. Start the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    (routes)/       # user-facing pages
    (admin)/        # admin-only pages
    layout.tsx      # root layout with sidebar
    layout-data.ts  # sidebar navigation config
    routes.ts       # central ROUTES constant
  components/
    blocks/         # Sidebar, Chat panel
    charts/         # AreaChartCard, BarComparisonChart, LineTrendChart
    tables/         # FinancialTable, generic Table
    ui/             # shadcn primitives
    utils/          # Alert, FileUpload
    widgets/        # LLM-renderable widgets
  stores/           # Zustand stores
  lib/              # Formatting utilities (currency, date, numbers)
  tools/            # Server-side tools (Excel reader)
```

## Adding a new page

1. Create `src/app/(routes)/<your-route>/page.tsx`
2. Register the path in `src/app/routes.ts`
3. Add a sidebar entry in `src/app/layout-data.ts`
4. Add a translation key in `i18n/en.json` and `i18n/de.json`

## Scripts

```bash
npm run dev            # development server
npm run build          # production build
npm run start          # start production server
npm run lint           # ESLint
npm run format:write   # Prettier
```

## Demo

The `/demo` route shows a full example — KPI cards, tabbed charts, and an AI side-chat that can answer questions and render charts inline based on the page data.
