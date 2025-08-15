"use client";
import themeConfig from "@/config";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import ShareholderPage from "@/components/shares/danhSachCodong";
import PieCharts from "@/components/shares/peichart";
import TransactionTimeline from "@/components/shares/lichSuGiaoDich";
import LineChartRevenue from "@/components/report/lineChart";
import DonutChart from "@/components/report/donuntChart";
import ProductOrderCard from "@/components/report/card";
import ReportSummaryTable from "@/components/report/table";
import FormatterDemo from "@/components/report/barChart";


const Page = () => {
  return (
    <Box padding={2}>
      <form>
        <Grid container spacing={3}>
          {/* Bên trái */}
          <Grid size={{ xs: 12, md: 3 }}>
             <ProductOrderCard/>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ProductOrderCard/>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ProductOrderCard/>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ProductOrderCard/>
          </Grid>

        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Bên trái */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                backgroundColor: "#fff", 
                borderRadius: 2,        
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)", 
                p: 2,                     
                height: "100%",           
              }}
            >
              
            </Box>
          </Grid>

          {/* Bên phải */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                p: 2,
                height: "100%",
              }}
            >
              <Typography variant="h6">
                  <DonutChart/>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Bên trái */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                backgroundColor: "#fff", 
                borderRadius: 2,        
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)", 
                p: 2,                     
                height: "100%",           
              }}
            >
              <FormatterDemo/>
            </Box>
          </Grid>

          {/* Bên phải */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                p: 2,
                height: "100%",
              }}
            >
              <Typography variant="h6">
                  <ReportSummaryTable/>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Page;
