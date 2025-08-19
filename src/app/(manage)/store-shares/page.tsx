"use client";
import themeConfig from "@/config";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import ShareholderPage from "@/components/shares/danhSachCodong";
import PieCharts from "@/components/shares/peichart";
import TransactionTimeline from "@/components/shares/lichSuGiaoDich";

const Page = () => {
  return (
  <Box padding={2}>
    <form>
      <Grid container spacing={2}>
        {/* Bên trái */}
        <Grid size={{ xs: 12, md: 8 }}>
          <ShareholderPage/>
        </Grid>

        {/* Bên phải */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container direction="column" spacing={2}>
            <Grid>
              <Card>
                <CardContent sx={{ minHeight: "300px" }}>
                  <PieCharts/>
                </CardContent>
              </Card>
            </Grid>
            <Grid >
              <Card sx={{overflowY: "auto"}}>

                <CardContent sx={{ minHeight: "300px" }}>
                  <Typography sx={{ color: "#2BA563", fontWeight: "bold", mb: 2 }}>
                    Lịch sử giao dịch
                  </Typography>
                  <TransactionTimeline />
                </CardContent>
              </Card>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  </Box>
);


}

export default Page
