// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { AreaChartCard } from "@/components/charts/area-chart"
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart"
import { LineTrendChart } from "@/components/charts/line-trend-chart"

const AREA_DATA = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 55000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 74000 },
  { month: "Jun", revenue: 69000 },
  { month: "Jul", revenue: 83000 },
]

const BAR_DATA = [
  { category: "Q1", actual: 120000, budget: 110000 },
  { category: "Q2", actual: 145000, budget: 130000 },
  { category: "Q3", actual: 132000, budget: 150000 },
  { category: "Q4", actual: 168000, budget: 160000 },
]

const LINE_DATA = [
  { date: "Jan", value: 12 },
  { date: "Feb", value: 19 },
  { date: "Mar", value: 15 },
  { date: "Apr", value: 27 },
  { date: "May", value: 24 },
  { date: "Jun", value: 31 },
]

export default function ChartsDemoPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Charts</h1>
        <p className="text-muted-foreground mt-1">
          Available chart components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AreaChartCard
          title="Monthly Revenue"
          description="Jan – Jul 2026"
          data={AREA_DATA}
          xAxis={{ key: "month" }}
          yAxis={{ key: "revenue", label: "Revenue (€)" }}
          aspectRatio={2}
        />
        <LineTrendChart
          title="Growth Index"
          data={LINE_DATA}
          xAxis={{ key: "date" }}
          yAxis={{ key: "value", label: "%" }}
        />
      </div>

      <BarComparisonChart
        title="Actual vs Budget by Quarter"
        data={BAR_DATA}
        labels={[
          { key: "actual", label: "Actual" },
          { key: "budget", label: "Budget" },
        ]}
      />
    </div>
  )
}
