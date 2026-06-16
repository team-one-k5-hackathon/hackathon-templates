// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import React, { memo } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import Image from "next/image"

import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { getLangDir } from "rtl-detect"

import "./globals.css"

import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/blocks/sidebar"

import { SIDEBAR_HELP, SIDEBAR_NAVIGATION } from "./layout-data"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Translations
  const locale = await getLocale()
  const direction = getLangDir(locale)
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClerkProvider afterSignOutUrl="/">
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <Sidebar
                  logo={
                    <Image
                      src="/logo.png"
                      alt="K5 Hackathon"
                      width={250}
                      height={35}
                      loading="eager"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  }
                  navigation={SIDEBAR_NAVIGATION}
                  help={SIDEBAR_HELP}
                />
                <main className="flex-1 w-full">{children}</main>
              </div>
            </SidebarProvider>
            <Analytics />
          </ClerkProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default memo(RootLayout)
