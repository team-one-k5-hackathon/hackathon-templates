// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { ROUTES } from "./routes"

export const SIDEBAR_NAVIGATION = [
  {
    group: "application",
    items: [
      {
        name: "home",
        href: ROUTES.home,
        icon: "Home",
      },
      {
        name: "demo",
        href: ROUTES.dashboard.quarterly_reports,
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    group: "components_demo",
    items: [
      {
        name: "charts",
        href: ROUTES.demo.charts,
        icon: "AreaChart",
      },
      {
        name: "tables",
        href: ROUTES.demo.tables,
        icon: "Table",
      },
      {
        name: "utilities",
        href: ROUTES.demo.utilities,
        icon: "Wrench",
      },
      {
        name: "chat",
        href: ROUTES.demo.chat,
        icon: "MessageSquare",
      },
    ],
  },
]

export const SIDEBAR_HELP = [
  {
    group: "help",
    items: [
      {
        name: "settings",
        href: ROUTES.help.settings,
        icon: "Settings",
      },
      {
        name: "docs",
        href: ROUTES.help.docs,
        icon: "LibraryBig",
      },
      {
        name: "support",
        href: ROUTES.help.support,
        icon: "LifeBuoy",
      },
      {
        name: "feedback",
        href: ROUTES.help.feedback,
        icon: "MessageSquarePlus",
      },
    ],
  },
]
