"use client";
import {
  Box,
  Button,
  IconButton,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../common/SearchBox";
import AvatarCanvas from "../common/AvatarCanvas";
import Icon from "../bases/Icon";
import themeConfig from "@/config";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Breadcumb from "../common/Breadcumb";
import { usePathname } from "next/navigation";

const Header = () => {
  const [brand, setBrand] = useState("1");
  const [searchValue, setSearchValue] = useState("");
  const pathName = usePathname();
  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value);
  };
  return (
    <Box sx={{ 
      width: "100%", 
      height: "120px",
      zIndex: 10,
      boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
    }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
          paddingInline: 3,
          borderBottom: `solid 1px ${themeConfig.borderColor1}`,
        }}
      >
        <Box></Box>
        {/* <SearchBox value={searchValue} onChange={() => setSearchValue} /> */}
        <Box>
          <ul className="flex gap-5 items-center">
            <li>
              <IconButton aria-label="delete" size="small">
                <Icon
                  icon="mingcute:notification-fill"
                  color={themeConfig.mainColor}
                  fontSize={20}
                />
              </IconButton>
            </li>
            <li>
              <button className="w-[40px] h-[40px] hover:cursor-pointer">
                <AvatarCanvas name="Đặng Thịnh" />
              </button>
            </li>
          </ul>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 3,
          height: "60px",
        }}
      >
        <Box>
          {
            pathName === "/dashboard" || pathName === "/" ? (
              <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              fontSize="16px"
              fontWeight={600}
              sx={{ color: themeConfig.mainColor }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="body2"
              fontSize="13px"
              color={themeConfig.textColor3}
            >
              Hi, welcome to motocycle management of Thành Thắng Moto
              </Typography>
            </Box>
          ) : (
            <Breadcumb />
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl
            sx={{
              m: 1,
              minWidth: 180,
              bgcolor: "#F2F2F2",
              borderRadius: "4px",
            }}
            size="small"
          >
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={brand}
              label="Cơ sở sửa chữa"
              onChange={handleChange}
              sx={{
                bgcolor: themeConfig.bgColor1,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Thành Thắng Moto</MenuItem>
              <MenuItem value={2}>Thành Công Moto</MenuItem>
              <MenuItem value={3}>Phạm Đông Moto</MenuItem>
            </Select>
          </FormControl>
          <Button
            sx={{
              bgcolor: themeConfig.bgColor1,
              color: themeConfig.mainColor,
              height: "40px",
              minWidth: "40px",
            }}
          >
            <Icon icon="uis:chart" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
