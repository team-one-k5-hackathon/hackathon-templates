// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FinancialTable } from "@/components/tables/financial-table"
import { FileUpload } from "@/components/utils/file-upload"

const TABLE_DATA = [
  {
    label: "Revenue",
    quarterly: 168000,
    quarterlyChange: 0.12,
    total: 524000,
    totalChange: 0.08,
    highlight: false,
  },
  {
    label: "Cost of Goods",
    quarterly: 72000,
    quarterlyChange: 0.05,
    total: 224000,
    totalChange: 0.03,
    highlight: false,
  },
  {
    label: "Gross Profit",
    quarterly: 96000,
    quarterlyChange: 0.18,
    total: 300000,
    totalChange: 0.13,
    highlight: true,
  },
  {
    label: "Operating Expenses",
    quarterly: 41000,
    quarterlyChange: -0.02,
    total: 130000,
    totalChange: 0.01,
    highlight: false,
  },
  {
    label: "Net Income",
    quarterly: 55000,
    quarterlyChange: 0.31,
    total: 170000,
    totalChange: 0.22,
    highlight: true,
  },
]

export default function TablesDemoPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Tables</h1>
        <p className="text-muted-foreground mt-1">
          Available table and data input components.
        </p>
      </div>

      <FinancialTable title="P&L Overview" data={TABLE_DATA} />

      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload
            onFileUpload={(file) => console.log("Uploaded:", file.name)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
