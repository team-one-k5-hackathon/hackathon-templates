---
name: repo-components
description: Reference for using the k5 hackathon template's built-in UI components — charts (AreaChartCard, BarComparisonChart, LineTrendChart), tables (FinancialTable), and utility components (Alert, FileUpload). Use this skill whenever working on a page in this repo and needing to know which component to pick, what props it accepts, or how to wire data into it.
---

# Repository Component Reference

## Charts (`src/components/charts/`)

All chart components that should be renderable by the AI side-chat implement `IWidget` — attach a `.llm` property (see the sidechat skill). Those that don't need AI rendering are plain React components.

---

### AreaChartCard

Displays a filled area chart inside a Card.

```tsx
import { AreaChartCard } from "@/components/charts/area-chart"

<AreaChartCard
  title="Monthly Revenue"
  description="Revenue in €"           // optional
  footer={<p>Source: ERP</p>}          // optional
  data={[{ month: "Jan", revenue: 12000 }, ...]}
  xAxis={{ key: "month", label: "Month" }}   // label optional
  yAxis={{ key: "revenue", label: "Revenue (€)" }}
  lineType="natural"                    // "natural" | "linear" | "step", default "natural"
  aspectRatio={2}                       // default 2; use ~4 inside the chat panel
/>
```

**LLM widget name**: `area_chart`

---

### BarComparisonChart

Grouped bar chart, one or multiple series. The `category` key is reserved for x-axis labels.

```tsx
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart"

<BarComparisonChart
  title="Orders vs Visits by Channel"
  data={[
    { category: "Direct", orders: 120, visits: 900 },
    { category: "Email",  orders: 80,  visits: 400 },
  ]}
  labels={[
    { key: "orders", label: "Orders" },
    { key: "visits", label: "Visits" },
  ]}
  footer={<p>Q1 2026</p>}              // optional
/>
```

**LLM widget name**: `bar_chart`

---

### LineTrendChart

Simple line chart. Data shape is fixed: `{ date: string, value: number }[]`.

```tsx
import { LineTrendChart } from "@/components/charts/line-trend-chart"

<LineTrendChart
  title="Conversion Rate"
  data={[{ date: "Jan", value: 3.2 }, { date: "Feb", value: 4.1 }]}
  yAxisLabel="Rate (%)"               // optional
  color="hsl(var(--chart-2))"         // optional, defaults to --chart-1
/>
```

No LLM widget — use `AreaChartCard` if AI rendering is needed.

---

## Tables (`src/components/tables/`)

### FinancialTable

Card-wrapped table with optional quarterly/total columns and colour-coded change percentages.

```tsx
import { FinancialTable } from "@/components/tables/financial-table"
import type { FinancialData } from "@/components/tables/financial-table"

const rows: FinancialData[] = [
  { label: "Revenue",    quarterly: 50000, quarterlyChange: 0.12, total: 200000, totalChange: 0.08 },
  { label: "Net Profit", quarterly: 8000,  highlight: true },   // highlight = blue row
]

<FinancialTable title="P&L Summary" data={rows} footer={<p>YTD</p>} />
```

Change columns (`quarterlyChange`, `totalChange`) are shown only when at least one row has them. Values are fractions (0.12 = 12%).

### Table (generic)

Re-export of the shadcn Table primitives for custom layouts:

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/tables/table"
```

---

## Utilities (`src/components/utils/`)

### Alert

```tsx
import { Alert } from "@/components/utils/alert"

<Alert variant="info" title="Note" description="Something to know." />
// variant: "info" | "warning" | "error"
```

### FileUpload

Drag-and-drop file input.

```tsx
import { FileUpload } from "@/components/utils/file-upload"

<FileUpload onUpload={(file) => handleFile(file)} accept=".xlsx,.csv" />
```

---

## UI Primitives (`src/components/ui/`)

Standard shadcn/ui components — import directly:

```
Button, Card, Input, Textarea, Select, Dialog, Tabs,
Sheet, Resizable, ScrollArea, Skeleton, Toast, Tooltip,
Avatar, Badge, Calendar, Label, Popover, Separator, Switch
```

Icons come from `lucide-react`.

---

## Choosing the right component

| Need | Use |
|---|---|
| Time-series trend | `AreaChartCard` |
| Compare categories / multiple series | `BarComparisonChart` |
| Simple line, no AI rendering needed | `LineTrendChart` |
| Financial P&L rows with % change | `FinancialTable` |
| Custom table layout | `Table` primitives |
| Inline user alert | `Alert` |
| File ingest | `FileUpload` |
