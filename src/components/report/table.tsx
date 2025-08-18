// File: components/report/ReportSummaryTable.tsx
"use client";
import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface ReportRow {
  category: string;
  value: number | string;
  href?: string; // thêm đường dẫn nếu có
}

interface ReportSummaryTableProps {
  data?: ReportRow[];
}

const ReportSummaryTable: React.FC<ReportSummaryTableProps> = ({
  data = [
    { category: "Tổng đơn hàng", value: 250, href: "/orders" },
    { category: "Đã giao", value: 150, href: "/orders" },
    { category: "Chưa giao", value: 80, href: "/orders" },
    { category: "Đã hủy", value: 20, href: "/orders" },
    { category: "Doanh thu", value: 12000000000, href: "/orders" },
  ],
}) => {
  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Tình hình kinh doanh</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Chỉ số</TableCell>
              <TableCell align="right">Giá trị</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={row.href || "#"} style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": {
                          color: "gray",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {row.category}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {typeof row.value === "number"
                    ? row.value.toLocaleString()
                    : row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReportSummaryTable;
