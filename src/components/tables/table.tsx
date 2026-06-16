// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import React, { ReactNode, useMemo } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataPoint {
  [key: string | number]: any
  highlight?: boolean
}

export interface ColumnProps {
  label: string
  key: Exclude<string, "highlight">
  align?: "left" | "center" | "right"
  type?: "number" | "date" | "currency"
  formatter?: (...args: any[]) => ReactNode
}

interface TableProps {
  columns: ColumnProps[]
  data: DataPoint[]
  styles?: {
    highlight?: string
  }
}

interface TableCardProps extends TableProps {
  title: string
  footer?: ReactNode
}

export function Table({ columns, data, styles }: TableProps) {
  return (
    <ShadcnTable className="w-full">
      <TableHeader>
        <TableRow>
          {
            columns.map((column, idx) => (
              <TableHead key={idx} className={`text-${column.align ?? "left"}`}>
                {column.label}
              </TableHead>
            )) as ReactNode
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow
            key={idx}
            className={
              item.highlight
                ? (styles?.highlight ?? "bg-gray-200 hover:bg-grey-300")
                : ""
            }
          >
            {
              columns.map((column, jdx) => {
                const valueType = column?.type
                const valueFormatter = column?.formatter
                const value = item?.[column.key] ?? null
                const valueFormatted = valueFormatter
                  ? valueFormatter(value)
                  : value

                return (
                  <TableCell
                    key={jdx}
                    className={`text-${column.align ?? "left"}`}
                  >
                    {valueFormatted}
                  </TableCell>
                )
              }) as ReactNode
            }
          </TableRow>
        ))}
      </TableBody>
    </ShadcnTable>
  )
}

export function TableCard({
  title,
  columns,
  data,
  styles,
  footer,
}: TableCardProps) {
  const tableData = useMemo(() => {
    return {
      columns,
      data,
      styles,
    }
  }, [columns, data, styles])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table {...tableData} />
      </CardContent>
      {footer && <CardFooter>{footer as ReactNode}</CardFooter>}
    </Card>
  )
}
