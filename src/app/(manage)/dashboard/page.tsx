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
import RevenueTimeline from "@/components/dashboard/cal";


const Page = () => {
  return (
  <Box padding={2}>
    <form>
      <Grid container spacing={2}>
        {/* Bên trái */}
        <Grid container size={{ xs: 12, md: 8 }} direction="column">
          <Grid>
            <Card>
                <CardContent sx={{ minHeight: "200px" }}>
                  
                </CardContent>
              </Card>
          </Grid>
          <Grid container sx={{ minHeight: "200px", minWidth: "200px" }}>
              <Card>
                <CardContent >
                  
                </CardContent>
              </Card>
              <Card>
                <CardContent >
                  
                </CardContent>
              </Card>
              <Card>
                <CardContent >
                  
                </CardContent>
              </Card>
          </Grid>
          <Grid>
              <Card>
                <CardContent sx={{ minHeight: "200px" }}>
                  
                </CardContent>
              </Card>
          </Grid>
        </Grid>

        {/* Bên phải */}
        <Grid size={{ xs: 12, md: 4 }}>
            <Grid>
              <Card>
                <CardContent>
                  <RevenueTimeline/>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
    </form>
  </Box>
);


}

export default Page
