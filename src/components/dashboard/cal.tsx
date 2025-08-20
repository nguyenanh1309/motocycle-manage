"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { Box, Typography, Avatar } from "@mui/material";
import { deepPurple, deepOrange, blue, green } from "@mui/material/colors";

// Dữ liệu mẫu doanh thu
export const revenueData = [
  { id: "1", title: "Nhập thêm gương", date: "2025-08-10", amount: 500, initials: "DP", color: blue[500] },
  { id: "2", title: "Mua thức ăn cho buổi trưa", date: "2025-08-12", amount: 300, initials: "TC", color: deepPurple[500] },
  { id: "3", title: "Mua thức ăn cho buổi tối", date: "2025-08-14", amount: 700, initials: "AF", color: green[500] },
  { id: "4", title: "Mua nước cho anh em", date: "2025-08-14", amount: 450, initials: "RP", color: deepOrange[500] },
  { id: "6", title: "Mua nước cho anh em", date: "2025-08-14", amount: 450, initials: "RP", color: deepOrange[500] },
  { id: "7", title: "Mua nước cho anh em", date: "2025-08-14", amount: 450, initials: "RP", color: deepOrange[500] },
];

export default function RevenueTimeline() {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  // Lọc các doanh thu theo ngày chọn
  const selectedRevenues = revenueData.filter((item) => item.date === selectedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ height: 700, px: 2, overflowY: "auto" }}>
        {/* Calendar mặc định */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <DateCalendar
            onChange={(newDate: Dayjs | null) =>
              setSelectedDate(newDate?.format("YYYY-MM-DD") || null)
            }
          />
        </Box>

        {/* Hiển thị hoạt động dạng Box */}
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
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#d7f0e3ff", // nền nhạt như hình
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {/* Avatar với chữ viết tắt */}
                  <Avatar sx={{ bgcolor: item.color, fontSize: 14, width: 40, height: 40 }}>
                    {item.initials}
                  </Avatar>

                  {/* Nội dung */}
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(item.date).format("DD MMMM, YYYY")} 
                    </Typography>
                  </Box>
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
