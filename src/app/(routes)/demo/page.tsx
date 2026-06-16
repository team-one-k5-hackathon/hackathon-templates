// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import React from "react"

import {
  ArrowDown,
  ArrowUp,
  Eye,
  RotateCcw,
  ShoppingCart,
  TrendingUp,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chat } from "@/components/blocks/chat"
import { AreaChartCard } from "@/components/charts/area-chart"
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart"

import { chatCompletion } from "./chat"
import { CATEGORY_DATA, CHANNEL_DATA, KPI_SUMMARY, MONTHLY_DATA } from "./demo"

// Next.js time-out setting
export const maxDuration = 60

const CHAT_DATA = JSON.stringify({
  monthly: MONTHLY_DATA,
  channels: CHANNEL_DATA,
  categories: CATEGORY_DATA,
})

interface KpiCardProps {
  label: string
  value: string
  change: number
  icon: React.ReactNode
  changeLabel?: string
}

function KpiCard({
  label,
  value,
  change,
  icon,
  changeLabel = "vs last year",
}: KpiCardProps) {
  const positive = change >= 0
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <span className="text-muted-foreground">{icon}</span>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <div
          className={`mt-1 inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 ${positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {positive ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          {Math.abs(change)}% {changeLabel}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Page() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-screen items-stretch"
    >
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className="h-full overflow-auto">
          <div className="space-y-6 p-6">
            <h1 className="text-3xl font-bold tracking-tight">Demo</h1>

            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiCard
                label="Total Visits"
                value={KPI_SUMMARY.totalVisits.value.toLocaleString()}
                change={KPI_SUMMARY.totalVisits.change}
                icon={<Eye className="h-4 w-4" />}
              />
              <KpiCard
                label="Conversion Rate"
                value={`${KPI_SUMMARY.conversionRate.value}%`}
                change={KPI_SUMMARY.conversionRate.change}
                icon={<TrendingUp className="h-4 w-4" />}
              />
              <KpiCard
                label="Revenue"
                value={`€${(KPI_SUMMARY.totalRevenue.value / 1000).toFixed(0)}k`}
                change={KPI_SUMMARY.totalRevenue.change}
                icon={<ShoppingCart className="h-4 w-4" />}
              />
              <KpiCard
                label="Return Rate"
                value={`${KPI_SUMMARY.returnRate.value}%`}
                change={KPI_SUMMARY.returnRate.change}
                icon={<RotateCcw className="h-4 w-4" />}
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="visits">Visits</TabsTrigger>
                <TabsTrigger value="conversion">Conversion</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <AreaChartCard
                    title="Monthly Visits"
                    description="Website sessions over the year"
                    data={MONTHLY_DATA}
                    xAxis={{ key: "month" }}
                    yAxis={{ key: "visits", label: "Visits" }}
                    aspectRatio={2}
                  />
                  <AreaChartCard
                    title="Monthly Revenue"
                    description="Revenue in € over the year"
                    data={MONTHLY_DATA}
                    xAxis={{ key: "month" }}
                    yAxis={{ key: "revenue", label: "Revenue (€)" }}
                    aspectRatio={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <AreaChartCard
                    title="Orders"
                    description="Number of orders placed per month"
                    data={MONTHLY_DATA}
                    xAxis={{ key: "month" }}
                    yAxis={{ key: "orders", label: "Orders" }}
                    aspectRatio={2}
                  />
                  <AreaChartCard
                    title="Returns"
                    description="Number of items returned per month"
                    data={MONTHLY_DATA}
                    xAxis={{ key: "month" }}
                    yAxis={{ key: "returns", label: "Returns" }}
                    aspectRatio={2}
                  />
                </div>
              </TabsContent>

              <TabsContent value="visits" className="mt-4 space-y-4">
                <AreaChartCard
                  title="Monthly Visits"
                  description="Total website sessions per month"
                  data={MONTHLY_DATA}
                  xAxis={{ key: "month" }}
                  yAxis={{ key: "visits", label: "Visits" }}
                  aspectRatio={3.5}
                />
                <BarComparisonChart
                  title="Visits by Channel"
                  data={CHANNEL_DATA}
                  labels={[{ key: "visits", label: "Visits" }]}
                />
              </TabsContent>

              <TabsContent value="conversion" className="mt-4 space-y-4">
                <AreaChartCard
                  title="Conversion Rate"
                  description="% of visitors who placed an order"
                  data={MONTHLY_DATA}
                  xAxis={{ key: "month" }}
                  yAxis={{ key: "conversionRate", label: "Conversion (%)" }}
                  aspectRatio={3.5}
                />
                <BarComparisonChart
                  title="Orders vs Visits by Channel"
                  data={CHANNEL_DATA}
                  labels={[
                    { key: "orders", label: "Orders" },
                    { key: "visits", label: "Visits" },
                  ]}
                />
              </TabsContent>

              <TabsContent value="revenue" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <AreaChartCard
                    title="Monthly Revenue"
                    description="Revenue in €"
                    data={MONTHLY_DATA}
                    xAxis={{ key: "month" }}
                    yAxis={{ key: "revenue", label: "Revenue (€)" }}
                    aspectRatio={2}
                  />
                  <AreaChartCard
                    title="Average Order Value"
                    description="Avg € per order"
                    data={MONTHLY_DATA}
                    xAxis={{ key: "month" }}
                    yAxis={{ key: "avgOrderValue", label: "AOV (€)" }}
                    aspectRatio={2}
                  />
                </div>
                <BarComparisonChart
                  title="Revenue by Category"
                  data={CATEGORY_DATA}
                  labels={[{ key: "revenue", label: "Revenue (€)" }]}
                />
              </TabsContent>

              <TabsContent value="returns" className="mt-4 space-y-4">
                <AreaChartCard
                  title="Monthly Returns"
                  description="Number of items returned per month"
                  data={MONTHLY_DATA}
                  xAxis={{ key: "month" }}
                  yAxis={{ key: "returns", label: "Returns" }}
                  aspectRatio={3.5}
                />
                <BarComparisonChart
                  title="Returns by Category"
                  data={CATEGORY_DATA}
                  labels={[{ key: "returns", label: "Returns" }]}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="h-full p-4">
          <Chat<string>
            data={CHAT_DATA}
            widgets={[AreaChartCard, BarComparisonChart]}
            processMessages={chatCompletion}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
