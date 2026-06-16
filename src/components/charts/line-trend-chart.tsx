// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import React from "react"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { useLocale } from "next-intl"

import type { IWidget } from "@/types/llm"
import { formatNumber } from "@/lib/format"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import type { AxisProps, DataPoint } from "./types"
import { defaultXLabelFormatter } from "./utils"

interface LineTrendChartProps {
  data: DataPoint[]
  title: string
  xAxis: AxisProps
  yAxis: AxisProps
  color?: string
}


const LineTrendChart: IWidget<LineTrendChartProps> = ({
  data = [],
  title,
  xAxis = { key: "" },
  yAxis = { key: "" },
  color = "hsl(var(--chart-1))",
}) => {
  const { key: xKey, formatter: xFormatter = defaultXLabelFormatter } = xAxis
  const { key: yKey, label: yLabel } = yAxis
  const locale = useLocale()

  // Normalize LLM-generated { x, y } format to { [xKey]: x, [yKey]: y }
  const normalizedData = React.useMemo(() => {
    if (!data.length || !("x" in data[0])) return data
    return data.map((d: any) => ({ [xKey]: d.x, [yKey]: d.y }))
  }, [data, xKey, yKey])

  const config: ChartConfig = {
    [yKey]: { label: yLabel, color },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[270px] w-full">
          <LineChart
            data={normalizedData}
            margin={{ top: 5, right: 10, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey={xKey}
              className="text-sm fill-muted-foreground"
              tickLine={false}
              axisLine={false}
              tickFormatter={xFormatter}
            />
            <YAxis
              label={
                yLabel
                  ? { value: yLabel, angle: -90, position: "left" }
                  : undefined
              }
              className="text-sm fill-muted-foreground"
              tickFormatter={(tick) => formatNumber(tick, 0, locale)}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={yKey}
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

LineTrendChart.llm = {
  functionCall: {
    name: "line_trend_chart",
    description: "A widget to display a single-series line trend chart over time",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Title to show on the widget",
        },
        data: {
          type: "array",
          minItems: 1,
          description: "Must contain at least one data point.",
          items: {
            type: "object",
            required: ["x", "y"],
            description:
              "'x' is the x-axis label (e.g. month name, year, date string). 'y' is the numeric y-axis value.",
            properties: {
              x: {
                type: "string",
                description: "The x-axis label (e.g. 'Jan', '2023', 'Q1')",
              },
              y: {
                type: "number",
                description: "The numeric y-axis value",
              },
            },
          },
        },
        xAxis: {
          type: "object",
          description: "Defines the properties of the x-axis.",
          properties: {
            key: {
              type: "string",
              description: "The key from data points used for the x-axis.",
            },
            label: {
              type: "string",
              description: "The label for the x-axis.",
              nullable: true,
            },
          },
          required: ["key"],
        },
        yAxis: {
          type: "object",
          description: "Defines the properties of the y-axis.",
          properties: {
            key: {
              type: "string",
              description: "The key from data points used for the y-axis.",
            },
            label: {
              type: "string",
              description: "The label for the y-axis.",
              nullable: true,
            },
          },
          required: ["key"],
        },
      },
      required: ["title", "data", "xAxis", "yAxis"],
    },
  },
  example: {
    title: "Monthly Growth Index",
    data: [
      { x: "Jan", y: 12 },
      { x: "Feb", y: 19 },
      { x: "Mar", y: 15 },
    ],
    xAxis: { key: "date", label: "Month" },
    yAxis: { key: "value", label: "%" },
  },
}

export { LineTrendChart }
