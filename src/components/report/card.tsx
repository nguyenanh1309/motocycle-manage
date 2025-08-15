import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function ProductOrderCard() {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        minWidth: 200,
        p: 2,
      }}
    >
      <CardContent>
        {/* Tiêu đề nhỏ */}
        <Typography variant="caption" color="text.secondary" gutterBottom>
          PRODUCT ORDERS
        </Typography>

        {/* Số chính */}
        <Typography variant="h4" fontWeight="bold">
          500
          <Typography
            component="span"
            sx={{
              fontSize: "1rem",
              color: "success.main",
              ml: 1,
              fontWeight: "normal",
            }}
          >
            +25%
          </Typography>
        </Typography>

        {/* Text mô tả */}
        <Typography variant="body2" color="text.secondary" mt={1}>
          The product order increased by <strong>100 pieces</strong> this month
        </Typography>
      </CardContent>
    </Card>
  );
}
