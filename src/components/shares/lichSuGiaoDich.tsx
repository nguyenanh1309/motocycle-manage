"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { Box, Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";

// Data mẫu
export const transactionData = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    date: "2025-08-10",
    type: "Mua",
    percentage: 5, // phần trăm cổ phần
  },
  {
    id: "2",
    name: "Trần Thị B",
    date: "2025-08-12",
    type: "Bán",
    percentage: 3,
  },
  {
    id: "3",
    name: "Nguyễn Văn C",
    date: "2025-08-14",
    type: "Mua",
    percentage: 8,
  },
  {
    id: "4",
    name: "Nguyễn Văn D",
    date: "2025-08-14",
    type: "Mua",
    percentage: 8,
  },

  {
    id: "5",
    name: "Nguyễn Văn C",
    date: "2025-07-14",
    type: "Mua",
    percentage: 8,
  },
];

// Tính ngày có giao dịch để tô màu
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

export default function LichGiaoDich() {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const selectedTransactions = transactionData.filter((t) => t.date === selectedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <DateCalendar
          slots={{
            day: (props) => <CustomDay {...props} onDayClick={handleDayClick} />,
          }}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", bgcolor: "#2BA563", color: "#fff" }}>
          Chi tiết giao dịch
        </DialogTitle>
        <DialogContent>
          {selectedDate && (
            <Box sx={{ mt: 2 }}>
              {selectedTransactions.length > 0 ? (
                selectedTransactions.map((t) => (
                  <Card
                    key={t.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      bgcolor: "#fff",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Người giao dịch: {t.name}
                    </Typography>
                    <Typography>Trạng thái: {t.type}</Typography>
                    <Typography>Phần trăm cổ phần: {t.percentage}%</Typography>
                    <Typography>Ngày giao dịch: {t.date}</Typography>
                  </Card>
                ))
              ) : (
                <Typography color="text.secondary">Không có giao dịch</Typography>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}
