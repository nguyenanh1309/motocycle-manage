"use client";
import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AreaPlot, LinePlot } from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];

export default function CustomerCard() {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        minWidth: 100,
      }}
    >
      <CardContent>
        {/* Tiêu đề */}
        <Typography variant="subtitle2" color="text.secondary">
          Khách hàng
        </Typography>

        {/* Số liệu */}
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 1, mb: 2 }}>
          +256
        </Typography>

        {/* Biểu đồ */}
        <ChartContainer
          width={350}
          height={50} // thu nhỏ chiều cao
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }} // bỏ margin
          series={[
            {
              data: uData,
              type: "line",
              area: true,
              color: "#4caf50", // màu xanh lá
            },
          ]}
          xAxis={[
            { scaleType: "linear", data: uData.map((_, i) => i) }, // dùng index thay vì label chữ
          ]}
        >
          <AreaPlot curve="monotoneX" style={{ fill: "rgba(76,175,80,0.25)" }} />
          <LinePlot curve="monotoneX" />
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
