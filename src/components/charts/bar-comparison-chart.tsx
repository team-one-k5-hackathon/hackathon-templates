// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import React from "react"

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"

import type { IWidget } from "@/types/llm"
import { formatNumber } from "@/lib/format"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

interface ComparisonData {
  category: string

  [key: string]: string | number // For dynamic year data
}

interface BarComparisonChartProps {
  data: ComparisonData[]
  title: string
  labels: {
    label: string
    key: string
  }[]
  footer?: React.ReactNode
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const transformArrayToObject = (arr: { key: string; label: string }[]) => {
  return arr.reduce(
    (acc, item) => {
      acc[item.key] = { label: item.label ? item.label : item.key }
      return acc
    },
    {} as Record<string, { label: string }>
  )
}

const BarComparisonChart: IWidget<BarComparisonChartProps> = ({
  title,
  data,
  labels,
  footer,
}) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
  ]

  // Update configs to include labels
  const updatedConfigs = {
    ...chartConfig,
    ...transformArrayToObject(labels),
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={updatedConfigs}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 6, right: 6, left: 12, bottom: 6 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="category"
              className="text-sm fill-muted-foreground"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-sm fill-muted-foreground"
              tickFormatter={(tick) => formatNumber(tick, 0)}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              formatter={(value, payload) => {
                const foundLabel = labels.find((label) => label.key === payload)
                return [
                  formatNumber(value as number),
                  foundLabel ? foundLabel.label : payload,
                ]
              }}
            />
            <Legend
              formatter={(value) => {
                const foundLabel = labels.find((label) => label.key === value)
                return foundLabel ? foundLabel.label : value
              }}
            />
            {labels.map((label, index) => (
              <Bar
                key={label.key}
                dataKey={label.key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

BarComparisonChart.llm = {
  functionCall: {
    name: "bar_chart",
    description:
      "A widget to display a bar chart with one or multiple series of bar charts",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Title to show on the widget",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            description:
              "An array of data points where each key represents a data attribute. The key 'category' is always required and represents the labels to show under each of the bars",
            additionalProperties: {
              oneOf: [
                { type: "number" },
                { type: "string" },
                { type: "string", format: "date-time" },
              ],
            },
          },
        },
        labels: {
          type: "array",
          items: {
            type: "object",
            description:
              "Defines relation between keys in the data and actual label to display. Don't include the 'category' key as it's used already in grouping of the bars",
            properties: {
              key: {
                type: "string",
                description: "The key from data points used for this label.",
              },
              label: {
                type: "string",
                description: "The label to use for the data points.",
                nullable: true,
              },
            },
          },
        },
      },
      required: ["title", "data", "labels"],
    },
  },
  example: {
    title: "Revenue",
    description: "Over last 3 years",
    data: [
      {
        category: "2021",
        value: 1234,
      },
      {
        category: "2022",
        value: 3456,
      },
      {
        category: "2023",
        value: 3456,
      },
    ],
    labels: [
      {
        key: "value",
        label: "Revenue",
      },
    ],
  },
}

export { BarComparisonChart }
