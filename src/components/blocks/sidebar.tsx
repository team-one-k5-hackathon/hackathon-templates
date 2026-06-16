// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import React, { ReactNode } from "react"
import Link from "next/link"

import { UserButton, useUser } from "@clerk/nextjs"
import * as LucideIcons from "lucide-react"
import { LucideProps, MessageCircleQuestion } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"

interface SidebarItem {
  name: string
  href: string
  icon: string
}

export interface SidebarGroup {
  group: string
  items: SidebarItem[]
}

export interface SidebarProps {
  logo: ReactNode
  navigation: SidebarGroup[]
  help: SidebarGroup[]
}

export const getLucideIcon = (name: string): React.FC<LucideProps> | null => {
  return (LucideIcons as any)[name] || MessageCircleQuestion
}

export function NavigationItems({ items }: { items: SidebarItem[] }) {
  // Translations
  const t = useTranslations("Sidebar")

  return (
    <ul className="space-y-2">
      {items?.map((item, idx) => {
        const IconComponent = getLucideIcon(item.icon)
        return (
          <li key={idx}>
            <Link
              href={item.href}
              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              {IconComponent ? <IconComponent className="w-4 h-4" /> : ""}
              {t(item.name as any)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function Sidebar({ logo, navigation, help }: SidebarProps) {
  // User management
  const { user } = useUser()

  // Translations
  const t = useTranslations("Sidebar")

  return (
    <ShadcnSidebar>
      <SidebarHeader>{logo}</SidebarHeader>
      <SidebarContent>
        {navigation &&
          (navigation?.map((nav, idx) => (
            <SidebarGroup key={idx}>
              <SidebarGroupLabel>{t(nav.group as any)}</SidebarGroupLabel>
              <SidebarGroupContent>
                <nav>
                  <NavigationItems items={nav.items} />
                </nav>
              </SidebarGroupContent>
            </SidebarGroup>
          )) as React.ReactNode)}
        <div className="flex-1"></div>
        {help &&
          (help?.map((nav, idx) => (
            <SidebarGroup key={idx + 100}>
              <SidebarGroupLabel>{t(nav.group as any)}</SidebarGroupLabel>
              <SidebarGroupContent>
                <nav>
                  <NavigationItems items={nav.items} />
                </nav>
              </SidebarGroupContent>
            </SidebarGroup>
          )) as React.ReactNode)}
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-4 mt-auto border-t">
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.firstName}</span>
              <span className="text-xs text-muted-foreground">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  )
}
