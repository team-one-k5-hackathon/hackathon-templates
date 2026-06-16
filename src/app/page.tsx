// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import Link from "next/link"

import {
  AreaChart,
  BarChart3,
  BotMessageSquare,
  CheckCircle2,
  FileSpreadsheet,
  FileUp,
  LineChart,
  MessageSquare,
  SlidersHorizontal,
  Table2,
  TerminalSquare,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ROUTES } from "@/app/routes"

const STEPS = [
  {
    n: 1,
    title: "Clone the repository",
    body: "Fork or clone this template repo to your own GitHub account to start building.",
    code: "git clone <repo-url> && cd <repo>",
  },
  {
    n: 2,
    title: "Install dependencies",
    body: "Make sure you have Node.js 20+ installed, then run:",
    code: "npm install",
  },
  {
    n: 3,
    title: "Configure environment variables",
    body: "Copy the template and fill in your keys (Clerk auth + any APIs you use).",
    code: "cp .env.template .env",
  },
  {
    n: 4,
    title: "Start the dev server",
    body: "The app runs on port 3000 with Turbopack for fast refresh.",
    code: "npm run dev",
  },
  {
    n: 5,
    title: "Build your feature",
    body: "Add new pages under src/app/(routes)/, wire them up in routes.ts and layout-data.ts, and ship.",
  },
]

const COMPONENT_GROUPS = [
  {
    label: "Charts",
    href: ROUTES.demo.charts,
    items: [
      {
        icon: AreaChart,
        name: "AreaChartCard",
        desc: "Filled area chart with configurable axes",
      },
      {
        icon: BarChart3,
        name: "BarComparisonChart",
        desc: "Side-by-side bar chart for comparing series",
      },
      {
        icon: LineChart,
        name: "LineTrendChart",
        desc: "Line chart for trend data over time",
      },
    ],
  },
  {
    label: "Tables",
    href: ROUTES.demo.tables,
    items: [
      {
        icon: Table2,
        name: "DataTable",
        desc: "Sortable, paginated generic data table",
      },
      {
        icon: FileSpreadsheet,
        name: "FinancialTable",
        desc: "Financial table with delta indicators",
      },
    ],
  },
  {
    label: "Chat / AI",
    href: ROUTES.demo.chat,
    items: [
      {
        icon: MessageSquare,
        name: "Chat",
        desc: "Streaming AI chat panel (OpenAI-compatible)",
      },
      {
        icon: BotMessageSquare,
        name: "SideChat",
        desc: "Resizable side-by-side chat layout",
      },
    ],
  },
  {
    label: "Utils",
    href: ROUTES.demo.utilities,
    items: [
      {
        icon: SlidersHorizontal,
        name: "Alert",
        desc: "Success / info / warning / error alert banners",
      },
      {
        icon: FileUp,
        name: "FileUpload",
        desc: "Drag-and-drop file upload with preview",
      },
      {
        icon: TerminalSquare,
        name: "Sidebar",
        desc: "Collapsible navigation sidebar with groups",
      },
    ],
  },
]

const UI_PRIMITIVES = [
  "Button",
  "Card",
  "Input",
  "Label",
  "Select",
  "Switch",
  "Table",
  "Textarea",
  "Toast",
  "Tooltip",
  "Alert",
  "Sidebar",
  "Sheet",
  "Skeleton",
  "Resizable",
  "ScrollArea",
  "Separator",
  "Tabs",
  "Dialog",
  "Popover",
  "Avatar",
  "Calendar",
]

export default function Home() {
  return (
    <div className="p-8 space-y-12">
      {/* Hero */}
      <section className="space-y-3">
        <span className="inline-block text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">
          K5 Hackathon 2026
        </span>
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to the App Template
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          This is your starting point. It includes authentication, routing, AI
          chat, data visualisation components, and i18n — so you can focus on
          building your idea, not the scaffolding.
        </p>
      </section>

      <Separator />

      {/* Getting started */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold">Getting started</h2>
        <ol className="space-y-5">
          {STEPS.map((step) => (
            <li key={step.n} className="flex gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-1.5">
                <p className="font-medium">
                  <span className="text-muted-foreground mr-1">{step.n}.</span>
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">{step.body}</p>
                {step.code && (
                  <code className="block text-xs bg-muted text-muted-foreground px-3 py-2 rounded-md font-mono">
                    {step.code}
                  </code>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Separator />

      {/* Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Available components</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Click a section to open the live demo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPONENT_GROUPS.map((group) => (
            <Link key={group.label} href={group.href} className="block group">
              <Card className="h-full transition-colors group-hover:border-foreground/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.name} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* shadcn primitives */}
        <div className="space-y-2">
          <p className="text-sm font-medium">shadcn/ui primitives</p>
          <div className="flex flex-wrap gap-2">
            {UI_PRIMITIVES.map((name) => (
              <span
                key={name}
                className="font-mono text-xs border rounded-md px-2 py-0.5 text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
