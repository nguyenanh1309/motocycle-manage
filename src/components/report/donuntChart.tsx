"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { Typography, Box, Divider, Grid } from "@mui/material";

const data = [
  { value: 20, label: "A", color: "#1976d2" },
  { value: 15, label: "B", color: "#42a5f5" },
  { value: 10, label: "C", color: "#90caf9" },
  { value: 30, label: "D", color: "#cfd8dc" },
  { value: 25, label: "E", color: "#eceff1" },
];

const months = [
  { month: "May", value: 10988, change: +11.02 },
  { month: "April", value: 9899, change: -44.01 },
  { month: "March", value: 17678, change: -41.91 },
  { month: "February", value: 30437, change: +50.01 },
  { month: "January", value: 20285, change: +2.32 },
];

// text giữa donut
const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 18,
  fontWeight: 600,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function SalesReport() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box>
      <Typography variant="h6">Sales</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Sales data for the period. 
      </Typography>

      <Grid container spacing={2}>
        {/* Donut chart */}
        <Grid item xs={6}>
          <PieChart
            series={[
              {
                data,
                innerRadius: 70,
                outerRadius: 100,
                highlightScope: { fade: "none", highlight: "none" },
              },
            ]}
            width={200}
            height={200}
          >
            
          </PieChart>
        </Grid>

        {/* Revenue info */}
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Revenue
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            $56,734.36
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#2e7d32", fontWeight: 500 }}
          >
            ▲ 12.76%
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Legend + data theo tháng */}
      {months.map((item, idx) => (
        <Box
          key={idx}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={0.5}
        >
          <Typography variant="body2">{item.month}</Typography>
          <Typography variant="body2">{item.value.toLocaleString()}</Typography>
          <Typography
            variant="body2"
            sx={{
              color: item.change >= 0 ? "#2e7d32" : "#c62828",
              fontWeight: 500,
            }}
          >
            {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
