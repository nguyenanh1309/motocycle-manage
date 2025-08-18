"use client";
import React, { useState } from "react";
import { ButtonStyled } from "@/mui-theme/base";
import { Box, Button, Card, Checkbox, Typography } from "@mui/material";
import Icon from "@/components/bases/Icon";
import TableCustom from "@/components/table/TableCustom";
import { Column } from "@/types/tableType";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/common/SearchBox";
import themeConfig from "@/config";

export const shareholderData = [
  {
    id: "1",
    name: "Trần Văn B",
    shares: 15,
    percentage: "15%",
    phone: "0912345678",
    email: "tranvanb@example.com",
  },
  {
    id: "2",
    name: "Nguyễn Thị C",
    shares: 10,
    percentage: "10%",
    phone: "0987654321",
    email: "nguyenthic@example.com",
  },
  {
    id: "3",
    name: "Phạm Văn D",
    shares: 45,
    percentage: "45%",
    phone: "0977123456",
    email: "phamvand@example.com",
  },

  {
    id: "4",
    name: "Phạm Văn E",
    shares: 60,
    percentage: "60%",
    phone: "0977123456",
    email: "phamvand@example.com",
  },
  {
    id: "5",
    name: "Còn lại",
    shares: 30,
    percentage: "30%",
    phone: "0977123456",
    email: "phamvand@example.com",
  },
];

export const pieChartData = shareholderData.map(item => ({
  label: item.name,        
  value: item.shares      
}));

const ShareholderPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleAddShareholder = () => {
    router.push("shareholders/add");
  };

  const columns: readonly Column[] = [
    {
      field: "id",
      headerName: "",
      minWidth: 20,
      type: "checkbox",
      renderCell: () => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Tên cổ đông",
      minWidth: 150,
      align: "left",
    },
    {
      field: "shares",
      headerName: "Số cổ phần",
      minWidth: 100,
      align: "center",
    },
    {
      field: "percentage",
      headerName: "Tỷ lệ (%)",
      minWidth: 80,
      align: "center",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      minWidth: 150,
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      align: "left",
    },
    {
    field: "edit",
    headerName: "",
    minWidth: 40,
    align: "center",
    renderCell: (row) => (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "right", width: "100%" }}>
        <Icon
          icon="mdi:pencil"
          fontSize="20px"
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/customers/edit`)}
        />
      </Box>
    ),
  },

   {
    field: "delete",
    headerName: "",
    minWidth: 40,
    align: "center",
    renderCell: (row) => (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Icon
          icon="mdi:delete"
          fontSize="20px"
          style={{ cursor: "pointer" }}

        />
      </Box>
    ),
  },


  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Card>
        {/* Thanh công cụ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Box sx={{ maxWidth: "300px", width: "100%" }}>
            <SearchBox
              value={searchValue}
              onChange={() => setSearchValue}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              color="inherit"
              sx={{
                display: "flex",
                backgroundColor: themeConfig.bgColor1,
                alignItems: "center",
                gap: "2px",
                textTransform: "none",
                color: themeConfig.textColor4,
              }}
            >
              <Icon icon="flowbite:file-export-solid" fontSize="16px" />
              <Typography>Export</Typography>
            </Button>
            <ButtonStyled onClick={handleAddShareholder}>
              <Icon
                icon="fluent:add-12-filled"
                fontSize="14px"
                fontWeight={600}
                color="#ffffff"
              />
              <Typography>Add</Typography>
            </ButtonStyled>
          </Box>
        </Box>

        {/* Bảng danh sách cổ đông */}
        <TableCustom
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          rows={shareholderData}
          columns={columns as Column[]}
          isPagination={true}
        />
      </Card>
    </Box>
  );
};

export default ShareholderPage;
