// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import React, { ReactNode } from "react"

import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
} from "recharts"

import type { IWidget } from "@/types/llm"
import { formatNumber } from "@/lib/format"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import type { AxisProps, DataPoint } from "./types"
import { AreaGradient, defaultXLabelFormatter } from "./utils"

interface AreaChartProps {
  data: DataPoint[]
  xAxis: AxisProps
  yAxis: AxisProps
  lineType?: "natural" | "linear" | "step"
  aspectRatio?: number
}

function AreaChart(props: AreaChartProps) {
  const { data, xAxis, yAxis, lineType = "natural", aspectRatio = 2 } = props
  const { key: xKey, formatter: xFormatter = defaultXLabelFormatter } = xAxis
  const { key: yKey, label: yLabel } = yAxis

  // Settings
  const chartConfig: ChartConfig = {
    [yKey]: {
      label: yLabel,
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <ChartContainer config={chartConfig} style={{ aspectRatio }}>
      <RechartsAreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <defs>
          <AreaGradient id="fillArea" color="hsl(var(--chart-1))" />
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xKey ?? ""}
          domain={["auto", "auto"]}
          interval="preserveStartEnd"
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          tickFormatter={xFormatter}
        />
        <YAxis
          className="text-sm fill-muted-foreground"
          tickFormatter={(tick) => formatNumber(tick, 0)}
          tickLine={false}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          type={lineType}
          dataKey={yKey}
          fill="url(#fillArea)"
          fillOpacity={0.4}
          stroke="hsl(var(--chart-1))"
        />
      </RechartsAreaChart>
    </ChartContainer>
  )
}

interface AreaChartCardProps extends AreaChartProps {
  title: ReactNode
  description?: ReactNode
  footer?: ReactNode
}

const AreaChartCard: IWidget<AreaChartCardProps> = ({
  title,
  description,
  footer,
  ...props
}) => {
  // Props
  const areaChartProps: AreaChartProps = props

  // TODO: Add (i) icon + trending info in top right corner?

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <AreaChart {...areaChartProps} />
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

AreaChartCard.llm = {
  functionCall: {
    name: "area_chart",
    description: "A widget to display an area line chart",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Title to show on the widget",
        },
        description: {
          type: "string",
          description: "Description to show on the widget",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            description:
              "An array of data points where each key represents a data attribute.",
            additionalProperties: {
              oneOf: [
                { type: "number" },
                { type: "string" },
                { type: "string", format: "date-time" },
              ],
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
        lineType: {
          type: "string",
          enum: ["natural", "linear", "step"],
          description: "The type of line rendering used in the area chart.",
        },
        aspectRatio: {
          type: "string",
          description:
            "The aspect ratio to use. For chat applications use normally '4'",
        },
      },
      required: ["title", "data", "xAxis", "yAxis", "aspectRatio"],
    },
  },
  example: {
    title: "Revenue",
    description: "Over last 3 years",
    data: [
      {
        date: "2021",
        value: -255131,
      },
      {
        date: "2022",
        value: -69402,
      },
      {
        date: "2023",
        value: -258996,
      },
    ],
    xAxis: {
      key: "date",
      label: "Year",
    },
    yAxis: {
      key: "value",
      label: "Revenue",
    },
    lineType: "natural",
  },
}

export { AreaChart, AreaChartCard }
