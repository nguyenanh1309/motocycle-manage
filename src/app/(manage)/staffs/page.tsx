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


const rows = [
  {
    id: "1",
    employee_name: "Nguyễn Văn A",
    dob: "1995-04-12",
    phone: "0901234567",
    address: "Hà Nội",
    email: "vana@gmail.com",
    position: "Nhân viên bán hàng",
  },
  {
    id: "2",
    employee_name: "Nguyễn Văn A",
    dob: "1995-04-12",
    phone: "0901234567",
    address: "Hà Nội",
    email: "vana@gmail.com",
    position: "Nhân viên bán hàng",
  },
  {
    id: "3",
    employee_name: "Nguyễn Văn A",
    dob: "1995-04-12",
    phone: "0901234567",
    address: "Hà Nội",
    email: "vana@gmail.com",
    position: "Nhân viên bán hàng",
  },
];

const EmployeePage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleAddEmployee = () => {
    router.push("staffs/add");
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
    field: "employee_name",
    headerName: "Tên nhân viên",
    minWidth: 200,
    align: "left",
 
  },
  {
    field: "dob",
    headerName: "Ngày sinh",
    minWidth: 150,
    align: "center",
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    minWidth: 150,
    align: "left",
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    minWidth: 250,
    align: "left",
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 200,
    align: "left",
  },
  {
    field: "position",
    headerName: "Chức vụ",
    minWidth: 200,
    align: "left",
  },

  {
    field: "edit",
    headerName: "",
    minWidth: 80,
    align: "center",
    renderCell: (row) => (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Icon
          icon="mdi:pencil"
          fontSize="20px"
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/orders/edit`)}
        />
      </Box>
    ),
  },
];


  return (
    <Box sx={{ padding: 3 }}>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Box sx={{ maxWidth: "300px", width: "100%" }}>
            <SearchBox value={searchValue} onChange={() => setSearchValue} />
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
            <ButtonStyled onClick={handleAddEmployee}>
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
        <TableCustom
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          rows={rows}
          columns={columns as Column[]}
          isPagination={true}
        />
      </Card>
    </Box>
  );
};

export default EmployeePage;

