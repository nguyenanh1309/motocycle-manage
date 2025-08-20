"use client";
import { OrderType } from "@/types/orderType";
import React, { useState, useEffect } from "react";
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




const Page = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [rows, setRows] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
      const fetchOrders = async () => {
        try {
          const res = await fetch(
            "https://68a2f4bac5a31eb7bb1e6d6f.mockapi.io/api/v1/orders"
          );
          const data = await res.json();
          setRows(data);
        } catch (error) {
          console.error("Lỗi khi fetch API:", error);
        }
      };
  
      fetchOrders();
    }, []);

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
