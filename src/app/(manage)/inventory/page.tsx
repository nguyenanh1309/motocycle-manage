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
    product_code: "SP001",
    product_name: "Nhớt xe máy",
    quantity: 50,
    import_price: 80000,
    sell_price: 100000,
    total_value: 50 * 80000,
  },
  {
    id: "2",
    product_code: "SP002",
    product_name: "Lốp xe",
    quantity: 20,
    import_price: 300000,
    sell_price: 350000,
    total_value: 20 * 300000,
  },
  {
    id: "3",
    product_code: "SP003",
    product_name: "Ắc quy",
    quantity: 15,
    import_price: 500000,
    sell_price: 580000,
    total_value: 15 * 500000,
  },
];

const InventoryPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleAddProduct = () => {
    router.push("inventory/add");
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
    field: "product_code",
    headerName: "Mã sản phẩm",
    minWidth: 120,
    align: "left",
  },
  {
    field: "product_name",
    headerName: "Tên sản phẩm",
    minWidth: 200,
    align: "left",
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    minWidth: 100,
    align: "right",
  },
  {
    field: "import_price",
    headerName: "Giá nhập",
    minWidth: 150,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    field: "sell_price",
    headerName: "Giá bán",
    minWidth: 150,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    field: "total_value",
    headerName: "Tổng giá trị (nhập)",
    minWidth: 180,
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
            <ButtonStyled onClick={handleAddProduct}>
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

export default InventoryPage;
