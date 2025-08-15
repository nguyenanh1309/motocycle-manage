// File: components/report/ReportSummaryTable.tsx
"use client";
import React from "react";
import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface ReportRow {
  category: string;
  value: number | string;
}

interface ReportSummaryTableProps {
  data?: ReportRow[]; // có thể truyền dữ liệu từ ngoài
}

const ReportSummaryTable: React.FC<ReportSummaryTableProps> = ({ 
  data = [
    { category: "Tổng đơn hàng", value: 250 },
    { category: "Đã giao", value: 150 },
    { category: "Chưa giao", value: 80 },
    { category: "Đã hủy", value: 20 },
    { category: "Doanh thu (VNĐ)", value: 12000000000 },
  ] 
}) => {
  return (
    
      <div>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Tình hình kinh doanh</Typography>
        </Box>
        <TableContainer >
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
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="right">
                    {typeof row.value === "number" ? row.value.toLocaleString() : row.value}
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
