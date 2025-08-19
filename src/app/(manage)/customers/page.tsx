"use client";
import React, { useState } from "react";
import { ButtonStyled, LinkStyled } from "@/mui-theme/base";
import { Box, Button, Card, Checkbox, Typography } from "@mui/material";
import Icon from "@/components/bases/Icon";
import TableCustom from "@/components/table/TableCustom";
import { Column } from "@/types/tableType";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/common/SearchBox";
import themeConfig from "@/config";




const Page = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleAddCustomer = () => {
    router.push("customers/add");
  };
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
    field: "customer_name",
    headerName: "Tên khách hàng",
    minWidth: 200,
    renderCell: (row) => (
      <LinkStyled href={`customers/edit`}>
        {row.customer_name}
      </LinkStyled>
    ),
  },
  {
    field: "phone",
    headerName: "SĐT",
    minWidth: 200,
    align: "center",
    renderCell: (params) => {
      const phone = params.phone;
      if (typeof phone === "string" && phone.length >= 4) {
        const start = phone.slice(0, -7);
        const middle = "****";
        const end = phone.slice(-3);
        return `${start} ${middle} ${end}`;
      }
      return <Typography>{phone}</Typography>;
    },
  },
  { field: "address", headerName: "Địa chỉ", align: "left", minWidth: 300 },
  {
    field: "usage_count",
    headerName: "Số lượt",
    minWidth: 100,
    align: "center",
  },
  {
    field: "total",
    headerName: "Tổng chi tiêu",
    minWidth: 250,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
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
        onClick={() => router.push(`/customers/edit`)}
      />
    </Box>
  ),
},

];

const rows = [
  {
    id: "1",
    customer_name: "Đặng Thịnh",
    phone: "0905123456",
    address: "Quan Hoa, Cầu Giấy, Hà Nội",
    usage_count: 10,
    total: 1324174,
  },
  {
    id: "2",
    customer_name: "Nguyễn Văn An",
    phone: "0912345678",
    address: "Hoàn Kiếm, Hà Nội",
    usage_count: 5,
    total: 875000,
  },
  {
    id: "3",
    customer_name: "Trần Thị Bình",
    phone: "0987654321",
    address: "Hai Bà Trưng, Hà Nội",
    usage_count: 8,
    total: 2150000,
  },
  {
    id: "4",
    customer_name: "Lê Hoàng Cường",
    phone: "0976543210",
    address: "Đống Đa, Hà Nội",
    usage_count: 3,
    total: 450000,
  },
  {
    id: "5",
    customer_name: "Phạm Minh Dương",
    phone: "0932109876",
    address: "Ba Đình, Hà Nội",
    usage_count: 12,
    total: 3500000,
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
              variant="text"
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
              <Icon icon="mdi:import" fontSize="16px" />
              <Typography>Import</Typography>
            </Button>
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
            <ButtonStyled onClick={handleAddCustomer}>
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

export default Page;
