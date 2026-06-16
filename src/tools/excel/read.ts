// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import * as XLSX from "xlsx"

export async function readExcelSheet(
  file: File,
  sheet?: string
): Promise<unknown[][]> {
  // Read workbook
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" })
  if (!workbook.SheetNames.length) {
    throw new Error("Excel file contains no worksheets")
  }

  // Read worksheet
  const worksheetName = sheet ?? workbook.SheetNames[0]
  const worksheet = workbook.Sheets[worksheetName]
  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    raw: false,
    dateNF: "yyyy-mm-dd",
  }) as unknown[][]

  return jsonData
    .filter(
      (row): row is unknown[] =>
        Array.isArray(row) &&
        row.some((cell) => cell !== null && cell !== undefined && cell !== "")
    )
    .map((row) =>
      row.filter((cell) => cell !== null && cell !== undefined && cell !== "")
    )
}

export async function readExcelToCSV(
  file: File,
  sheetName?: string
): Promise<string> {
  try {
    // Read the Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" })

    // Get the specified sheet or the first sheet
    const sheet = sheetName
      ? workbook.Sheets[sheetName]
      : workbook.Sheets[workbook.SheetNames[0]]

    if (!sheet) {
      throw new Error(
        sheetName
          ? `Sheet "${sheetName}" not found`
          : "No sheets found in the workbook"
      )
    }

    // Convert sheet to CSV
    const csvOptions = {
      FS: ",", // Field separator
      RS: "\n", // Record separator
      blankrows: false, // Skip blank rows
      forceQuotes: false, // Only quote fields that need it
    }

    return XLSX.utils.sheet_to_csv(sheet, csvOptions)
  } catch (error) {
    console.error("Error converting Excel to CSV:", error)
    throw error
  }
}

export async function readExcelToCSV2(
  file: File,
  sheetName?: string,
  newlineReplacement: string = " | "
): Promise<string> {
  try {
    // Read the Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" })

    // Get the specified sheet or the first sheet
    const sheet = sheetName
      ? workbook.Sheets[sheetName]
      : workbook.Sheets[workbook.SheetNames[0]]

    if (!sheet) {
      throw new Error(
        sheetName
          ? `Sheet "${sheetName}" not found`
          : "No sheets found in the workbook"
      )
    }

    // Convert sheet to JSON to be able to process cell contents
    const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
      header: "A",
    })

    // Get all column headers (handles the case where rows might have different columns)
    const allKeys = new Set<string>()
    jsonData.forEach((row) => {
      Object.keys(row).forEach((key) => allKeys.add(key))
    })
    const headers = Array.from(allKeys)

    // Convert the data to CSV format with newline handling
    let csvString = headers.join(",") + "\n"

    jsonData.forEach((row) => {
      const csvRow = headers
        .map((header) => {
          const cellValue = row[header] === undefined ? "" : String(row[header])

          // Replace newlines in the cell with the specified replacement
          const cleanedValue = cellValue.replace(/\r?\n/g, newlineReplacement)

          // Quote the cell if it contains commas, quotes, or the newline replacement
          const needsQuotes =
            cleanedValue.includes(",") ||
            cleanedValue.includes('"') ||
            cleanedValue.includes(newlineReplacement)

          if (needsQuotes) {
            // Escape quotes by doubling them
            return `"${cleanedValue.replace(/"/g, '""')}"`
          }

          return cleanedValue
        })
        .join(",")

      csvString += csvRow + "\n"
    })

    return csvString
  } catch (error) {
    console.error("Error converting Excel to CSV:", error)
    throw error
  }
}
