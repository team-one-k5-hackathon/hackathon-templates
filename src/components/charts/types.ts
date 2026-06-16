// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

export interface AxisProps {
  key: string
  label?: string
  formatter?: (value: number | string | Date, idx: number) => string
}

export interface DataPoint {
  [key: string]: number | string | Date
}
