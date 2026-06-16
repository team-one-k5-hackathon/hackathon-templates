// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface DemoProps {
  demo: boolean
}

interface DemoActions {
  setDemo: (demo: boolean) => any
}

export type DemoStore = DemoProps & DemoActions

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      demo: false,
      setDemo: (demo: boolean) => set((state) => ({ ...state, demo: demo })),
    }),
    {
      name: "store:demo",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
