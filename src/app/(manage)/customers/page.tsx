"use client";
import React, { useState, useEffect } from "react";
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
  const [limit, setLimit] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState<any[]>([]); // lưu dữ liệu API
  const router = useRouter();

 
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(
          "https://68a2f4bac5a31eb7bb1e6d6f.mockapi.io/api/v1/customers"
        );
        const data = await res.json();
        setRows(data);
      } catch (error) {
        console.error("Lỗi khi fetch API:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = () => {
    router.push("customers/add");
  };

  const handleDeleteCustomer = async (id: number) => {
  try {
    const res = await fetch(
      `https://68a2f4bac5a31eb7bb1e6d6f.mockapi.io/api/v1/customers/${id}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } else {
      console.error("Xóa thất bại");
    }
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
  }
};


  const columns: readonly Column[] = [
    {
      field: "id",
      headerName: "",
      minWidth: 20,
      type: "checkbox",
      renderCell: (row: any) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
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

    { field: "address", 
      headerName: "Địa chỉ", 
      align: "left", 
      minWidth: 300 },
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
      align: "center",
      format: (value: number) => value?.toLocaleString("en-US"),
    },
    {
      field: "edit",
      headerName: "",
      minWidth: 40,
      align: "center",
      renderCell: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Icon
            icon="mdi:pencil"
            fontSize="20px"
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/customers/edit/${row.id}`)}
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
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Icon
            icon="mdi:delete"
            fontSize="20px"
            style={{ cursor: "pointer" }}
                      onClick={() => {
            if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
              handleDeleteCustomer(row.id);
            }
          }}

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
