// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ExampleProps {
  example: boolean
}

interface ExampleActions {
  setExample: (example: boolean) => any
}

export type ExampleStore = ExampleProps & ExampleActions

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      example: false,
      setExample: (example: boolean) =>
        set((state) => ({ ...state, example: example })),
    }),
    {
      name: "store:example",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
