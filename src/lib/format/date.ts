// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

export const formatDate = (date: string | Date) => {
  const dateIn = date instanceof Date ? date : new Date(date)
  const formatter = new Intl.DateTimeFormat("en-UK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
  return formatter.format(dateIn)
}
