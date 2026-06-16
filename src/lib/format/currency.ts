// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

export const formatCurrency = (amount: number, currency: string) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  })
  return formatter.format(amount)
}
