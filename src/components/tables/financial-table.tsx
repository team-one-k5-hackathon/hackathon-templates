// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import React, { ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export interface FinancialData {
  label: string
  quarterly?: number
  quarterlyChange?: number
  total?: number
  totalChange?: number
  highlight?: boolean
}

interface FinancialTableProps {
  title: string
  data: FinancialData[]
  footer?: ReactNode
}

export function FinancialTable({ title, data, footer }: FinancialTableProps) {
  const showQuarterlyChange = data.some(
    (item) => item.quarterlyChange !== undefined
  )
  const showTotalChange = data.some((item) => item.totalChange !== undefined)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48"></TableHead>
              {showQuarterlyChange ? (
                <>
                  <TableHead className="text-right">Quartal</TableHead>
                  <TableHead className="text-right w-20">%</TableHead>
                </>
              ) : (
                <TableHead className="text-right">Quartal</TableHead>
              )}
              {showTotalChange ? (
                <>
                  <TableHead className="text-right">Gesamt</TableHead>
                  <TableHead className="text-right w-20">%</TableHead>
                </>
              ) : (
                <TableHead className="text-right">Gesamt</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className={
                  item.highlight ? "bg-blue-100 hover:bg-blue-200" : ""
                }
              >
                <TableCell className="font-medium">{item.label}</TableCell>
                {showQuarterlyChange ? (
                  <>
                    <TableCell className="text-right">
                      {item?.quarterly ? formatNumber(item.quarterly) : ""}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right w-20",
                        item.quarterlyChange && item.quarterlyChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      {item?.quarterlyChange
                        ? formatNumber(item.quarterlyChange * 100, 1)
                        : ""}
                    </TableCell>
                  </>
                ) : (
                  <TableCell className="text-right">
                    {item?.quarterly ? item.quarterly : ""}
                  </TableCell>
                )}
                {showTotalChange ? (
                  <>
                    <TableCell className="text-right">
                      {item?.total ? formatNumber(item.total) : ""}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right w-20",
                        item.totalChange && item.totalChange > 0
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      {item?.totalChange
                        ? formatNumber(item.totalChange * 100, 1)
                        : ""}
                    </TableCell>
                  </>
                ) : (
                  <TableCell className="text-right">
                    {item?.total ? item.total : ""}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {footer && <CardFooter>{footer as ReactNode}</CardFooter>}
    </Card>
  )
}
