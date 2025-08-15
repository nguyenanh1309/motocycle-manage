"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const doanhThuData = [
  { month: "Jan", value: 200 },
  { month: "Feb", value: 400 },
  { month: "Mar", value: 350 },
  { month: "Apr", value: 500 },
  { month: "May", value: 420 },
  { month: "Jun", value: 600 },
  { month: "A", value: 50 },
  { month: "b", value: 300 },
  { month: "c", value: 300 },
  { month: "d", value: 400 },
];

export default function LineChartRevenue() {
  return (
    <div style={{ position: "relative" }}>
      {/* Gradient fill xanh lá */}
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4caf50" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#4caf50" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      <LineChart
        dataset={doanhThuData}
        xAxis={[
          {
            dataKey: "month",
            scaleType: "point",
          },
        ]}
        yAxis={[{}]}
        series={[
          {
            dataKey: "value",
            label: "Doanh thu",
            color: "#4caf50",
            area: true,
            showMark: false,
          },
        ]}
        grid={{ horizontal: true, vertical: false }}
        height={200}
        margin={{ top: 20, bottom: 20, left: 40, right: 20 }}
        sx={{
          "& .MuiAreaElement-root": {
            fill: "url(#gradientGreen)",
          },
          "& .MuiChartsGrid-line": {
            stroke: "#e0e0e0",
            strokeWidth: 1,
          },
          "& .MuiChartsAxisHighlight-root": {
            stroke: "#4caf50", // ẩn đường chấm chấm khi hover
          },
        }}
      />
    </div>
  );
}
