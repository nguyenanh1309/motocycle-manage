
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const salesData = [
  { month: "January", revenue: 5000, expense: 3000 },
  { month: "February", revenue: 7000, expense: 4000 },
  { month: "March", revenue: 6000, expense: 3500 },
  { month: "April", revenue: 8000, expense: 5000 },
  { month: "May", revenue: 7500, expense: 4200 },
  { month: "June", revenue: 9000, expense: 6000 },
  { month: "July", revenue: 9500, expense: 6200 },
  { month: "August", revenue: 10000, expense: 7000 },
  { month: "September", revenue: 8500, expense: 5800 },
  { month: "October", revenue: 9500, expense: 6400 },
  { month: "November", revenue: 11000, expense: 7200 },
  { month: "December", revenue: 12000, expense: 8000 },
];


const moneyFormatter = (value: number | null) =>
  value !== null ? `$${value.toLocaleString()}` : "";

export default function RevenueExpenseBarChart() {
  return (
    <BarChart
      dataset={salesData}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "month",
          height: 20,
          valueFormatter: (month, context) =>
            context.location === "tick" ? month.slice(0, 3) : month,
        },
      ]}
      series={[
        {
          dataKey: "revenue",
          label: "Revenue",
          valueFormatter: moneyFormatter,
          color: "#2e7d32", // xanh lá
        },
        {
          dataKey: "expense",
          label: "Expense",
          valueFormatter: moneyFormatter,
          color: "#1976d2", // xanh lam
        },
      ]}
      height={350}
      yAxis={[{ label: "Amount ($)" }]}
      grid={{ horizontal: true }}


    />
  );
}
