"use client";
import { OrderType } from "@/types/orderType";
import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { ButtonStyled, LinkStyled } from "@/mui-theme/base";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Icon from "@/components/bases/Icon";
import TableCustom from "@/components/table/TableCustom";
import { Column } from "@/types/tableType";
import { useRouter } from "next/navigation";


const rows = [
  {
    id: "1",
    code: "XM001",
    created_at: "2024-10-11",
    customer_name: "Đăng Thịnh",
    total: 1324174,
  },
  {
    id: "2",
    code: "XM002",
    created_at: "2024-10-11",
    customer_name: "Đăng Trường",
    total: 14035005,
  },
  {
    id: "3",
    code: "XM003",
    created_at: "2024-10-11",
    customer_name: "Đăng Chung",
    total: 603973,
  },
  {
    id: "4",
    code: "XM004",
    created_at: "2024-10-11",
    customer_name: "Đăng Quân",
    total: 3271434,
  },
  {
    id: "5",
    code: "XM005",
    created_at: "2024-10-11",
    customer_name: "Phạm Đông",
    total: 3760210,
  },
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const handleAddOrder = () => {
    router.push('orders/add')
  }

  const columns: readonly Column[] = [

  {
    field: "id",
    headerName: "",
    minWidth: 20,
    type: "checkbox",
    renderCell: (row: any) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Checkbox />
        </Box>
      </Box>
    ),
  },
  {
    field: "code",
    headerName: "Mã HĐ",
    minWidth: 100,
    renderCell: (row: any) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <LinkStyled href={`orders/edit/${row.code}`}>{row.code}</LinkStyled>
        </Box>
      </Box>
    ),
  },
  {
    field: "created_at",
    headerName: "Thời gian tạo",
    minWidth: 100,
    align: "left",
  },
  { field: "customer_name", headerName: "Tên khách hàng", minWidth: 200, align: "right" },
  {
    field: "total",
    headerName: "Tổng tiền",
    minWidth: 100,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
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
    <Box sx={{ padding: 3 }}>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            padding: 2,
          }}
        >
          <ButtonStyled onClick={handleAddOrder}>
            <Icon
              icon="fluent:add-12-filled"
              fontSize="14px"
              fontWeight={600}
              color="#ffffff"
            />
            <Typography>Add</Typography>
          </ButtonStyled>
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

export default Page;
