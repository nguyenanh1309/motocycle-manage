"use client";



import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";

import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

// Dữ liệu mẫu
export const transactionData = [
  { id: "1", name: "Nguyễn Văn A", date: "2025-08-10", type: "Mua", percentage: 5 },
  { id: "2", name: "Trần Thị B", date: "2025-08-12", type: "Bán", percentage: 3 },
  { id: "3", name: "Nguyễn Văn C", date: "2025-08-14", type: "Mua", percentage: 8 },
  { id: "4", name: "Nguyễn Văn D", date: "2025-08-14", type: "Mua", percentage: 8 },
  { id: "5", name: "Nguyễn Văn C", date: "2025-07-14", type: "Mua", percentage: 8 },
  { id: "6", name: "Trần Văn E", date: "2025-08-14", type: "Bán", percentage: 2 },
  { id: "7", name: "Lê Thị F", date: "2025-08-14", type: "Mua", percentage: 6 },
];

// Hàm xác định giao dịch theo ngày

const getTransactionTypeForDate = (date: string) => {
  const tx = transactionData.find((t) => t.date === date);
  return tx ? tx.type : null;
};



function CustomDay(
  props: PickersDayProps<Dayjs> & { onDayClick: (date: string) => void }
) {
  const { day, onDayClick, ...other } = props;
  const dateStr = day.format("YYYY-MM-DD");

  const type = getTransactionTypeForDate(dateStr);
  let bgColor = "";
  if (type === "Mua") bgColor = "#2BA563";
  else if (type === "Bán") bgColor = "#f44336";

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        backgroundColor: bgColor,
        color: bgColor ? "#fff" : "inherit",
        "&:hover": {
          backgroundColor: bgColor || "lightgray",
          opacity: 0.8,
        },
      }}
      onClick={() => onDayClick(dateStr)}
    />
  );
}


export default function TransactionTimeline() {


  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);

  };

  const selectedTransactions = transactionData.filter(
    (t) => t.date === selectedDate
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Khung cố định 300px + scroll */}
      <Box
        sx={{
          height: 340,       
          overflowY: "auto", 
          px: 2,
        }}
      >
        {/* Calendar */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <DateCalendar
            slots={{
              day: (props) => <CustomDay {...props} onDayClick={handleDayClick} />,
            }}
          />
        </Box>

        {/* List lịch sử giao dịch */}
        {selectedDate && (
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Giao dịch ngày: {selectedDate}
            </Typography>
            {selectedTransactions.length > 0 ? (
              <List disablePadding>
                {selectedTransactions.map((t) => (
                  <ListItem key={t.id} divider>
                    <ListItemText
                      primary={`${t.name} - ${t.type}`}
                      secondary={`Phần trăm cổ phần: ${t.percentage}%`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">Không có giao dịch</Typography>
            )}
          </Box>
        )}
      </Box>

    </LocalizationProvider>
  );
}
