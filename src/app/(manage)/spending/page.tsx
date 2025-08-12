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

const columns: readonly Column[] = [
  
];

const rows = [
  {
    id: "1",
    spending_date: "2024-10-11",
    spending_name: "Mua đồ ăn chưa",
    total_amount: 200000,
  },
  {
    id: "2",
    spending_date: "2024-10-11",
    spending_name: "Mua nước cho kỹ thuật viên",
    total_amount: 100000,
  },
  {
    id: "3", 
    spending_date: "2024-10-12",
    spending_name: "Mua văn phòng phẩm",
    total_amount: 150000,
  },
  {
    id: "4",
    spending_date: "2024-10-13", 
    spending_name: "Chi phí điện nước",
    total_amount: 500000,
  },
  {
    id: "5",
    spending_date: "2024-10-14",
    spending_name: "Sửa chữa thiết bị",
    total_amount: 300000,
  }
];

const Page = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleAddCustomer = () => {
    router.push("spending/add");
  };
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
        Table đặt ở đây
      </Card>
    </Box>
  );
};

export default Page;
