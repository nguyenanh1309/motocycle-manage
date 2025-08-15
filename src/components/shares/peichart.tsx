
"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { pieChartData } from "./danhSachCodong";

// Thêm màu cho từng item trong dữ liệu
const pieChartDataColored = pieChartData.map((item, index) => {
  const colors = [ "#d8f3dc", "#b7e4c7", "#74c69d", "#40916c", "#2d6a4f"]; // mảng màu
  return { ...item, color: colors[index % colors.length] };
});

export const valueFormatter = (item: { value: number }) => `${item.value}%`;

export default function PieCharts() {
  return (
    <PieChart
      series={[
        {
          data: pieChartDataColored,
          innerRadius: 60, // tạo donut
          highlightScope: { fade: "global", highlight: "item" },
          valueFormatter,
        },
      ]}
      height={200}
      width={200}
    />
  );
}
