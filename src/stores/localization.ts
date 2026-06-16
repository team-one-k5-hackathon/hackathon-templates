// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface LocalizationProps {
  locale: string
  weekStart: string
}

interface LocalizationActions {
  setLocale: (locale: string) => any
  setWeekStart: (weekStart: string) => any
}

export type LocalizationStore = LocalizationProps & LocalizationActions

export const useLocalizationStore = create<LocalizationStore>()(
  persist(
    (set) => ({
      locale: "en",
      weekStart: "monday",
      setLocale: (locale: string) =>
        set((state) => ({ ...state, locale: locale })),
      setWeekStart: (weekStart: string) =>
        set((state) => ({ ...state, weekStart: weekStart })),
    }),
    {
      name: "store:locale",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
