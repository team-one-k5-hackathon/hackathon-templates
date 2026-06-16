// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

export const MONTHLY_DATA = [
  { month: "Jan", visits: 12400, revenue: 48200,  orders: 620,  returns: 48,  conversionRate: 5.0, avgOrderValue: 77.7 },
  { month: "Feb", visits: 13100, revenue: 51800,  orders: 655,  returns: 52,  conversionRate: 5.0, avgOrderValue: 79.1 },
  { month: "Mar", visits: 15200, revenue: 61400,  orders: 780,  returns: 63,  conversionRate: 5.1, avgOrderValue: 78.7 },
  { month: "Apr", visits: 14800, revenue: 58900,  orders: 740,  returns: 59,  conversionRate: 5.0, avgOrderValue: 79.6 },
  { month: "May", visits: 17300, revenue: 72100,  orders: 890,  returns: 71,  conversionRate: 5.1, avgOrderValue: 81.0 },
  { month: "Jun", visits: 19100, revenue: 82400,  orders: 980,  returns: 78,  conversionRate: 5.1, avgOrderValue: 84.1 },
  { month: "Jul", visits: 21500, revenue: 91200,  orders: 1105, returns: 88,  conversionRate: 5.1, avgOrderValue: 82.5 },
  { month: "Aug", visits: 22800, revenue: 96500,  orders: 1170, returns: 94,  conversionRate: 5.1, avgOrderValue: 82.5 },
  { month: "Sep", visits: 20100, revenue: 85300,  orders: 1030, returns: 82,  conversionRate: 5.1, avgOrderValue: 82.8 },
  { month: "Oct", visits: 23400, revenue: 102800, orders: 1210, returns: 97,  conversionRate: 5.2, avgOrderValue: 85.0 },
  { month: "Nov", visits: 31200, revenue: 142600, orders: 1650, returns: 132, conversionRate: 5.3, avgOrderValue: 86.4 },
  { month: "Dec", visits: 28900, revenue: 128400, orders: 1480, returns: 118, conversionRate: 5.1, avgOrderValue: 86.8 },
]

export const CHANNEL_DATA = [
  { category: "Organic",    visits: 89400, orders: 4540, revenue: 381200 },
  { category: "Paid Search", visits: 52100, orders: 2820, revenue: 241600 },
  { category: "Social",     visits: 38700, orders: 1650, revenue: 132500 },
  { category: "Email",      visits: 24800, orders: 1890, revenue: 158400 },
  { category: "Direct",     visits: 30800, orders: 1910, revenue: 168700 },
]

export const CATEGORY_DATA = [
  { category: "Clothing",     revenue: 412800, returns: 329 },
  { category: "Electronics",  revenue: 321600, returns: 86  },
  { category: "Home & Garden", revenue: 198400, returns: 42  },
  { category: "Sports",       revenue: 145200, returns: 31  },
  { category: "Beauty",       revenue: 84200,  returns: 28  },
]

export const KPI_SUMMARY = {
  totalVisits:    { value: 239800, change: 18.4 },
  conversionRate: { value: 5.13,   change: 0.3  },
  totalRevenue:   { value: 1021400, change: 22.1 },
  returnRate:     { value: 7.2,    change: -0.8 },
}
