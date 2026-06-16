// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

interface TrendData {
  date: string
  value: number | string
}

interface LineTrendChartProps {
  data: TrendData[]
  title: string
  yAxisLabel?: string
  color?: string
}
const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function LineTrendChart({
  data,
  title,
  yAxisLabel,
  color = "hsl(var(--chart-1))",
}: LineTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[270px] w-full">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-sm fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              label={
                yAxisLabel
                  ? { value: yAxisLabel, angle: -90, position: "left" }
                  : undefined
              }
              className="text-sm fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color }}
              activeDot={{ r: 6, fill: color }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
