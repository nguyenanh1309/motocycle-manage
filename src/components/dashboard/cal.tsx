"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { Box, Typography } from "@mui/material";

// Dữ liệu mẫu doanh thu
export const revenueData = [
  { id: "1", title: "Đơn hàng #001", date: "2025-08-10", amount: 500 },
  { id: "2", title: "Đơn hàng #002", date: "2025-08-12", amount: 300 },
  { id: "3", title: "Đơn hàng #003", date: "2025-08-14", amount: 700 },
  { id: "4", title: "Đơn hàng #004", date: "2025-08-14", amount: 450 },
  { id: "5", title: "Đơn hàng #005", date: "2025-07-14", amount: 600 },
];

export default function RevenueTimeline() {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  // Lọc các doanh thu theo ngày chọn
  const selectedRevenues = revenueData.filter((item) => item.date === selectedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ height: 700, px: 2 }}>
        {/* Calendar mặc định */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <DateCalendar
            onChange={(newDate: Dayjs | null) =>
              setSelectedDate(newDate?.format("YYYY-MM-DD") || null)
            }
          />
        </Box>

        {/* Hiển thị doanh thu dưới dạng Box nhỏ */}
        {selectedDate && (
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Hoạt động
            </Typography>

            {selectedRevenues.length > 0 ? (
              selectedRevenues.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: "background.paper",
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Số tiền: ${item.amount}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">Không có dữ liệu</Typography>
            )}
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
}
