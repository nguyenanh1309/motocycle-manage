"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import AvatarCanvas from "../bases/AvatarCanvas";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdInsertChart } from "react-icons/md";

const Header = () => {
  const [brand, setBrand] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value);
  };
  return (
    <div className="w-full h-[120px]">
      <div className="flex items-center justify-between h-[60px] px-5 border-b">
        <div className="relative bg-[#107e412d] flex items-center border rounded-md max-w-[420px] w-full h-[40px]">
          <SearchIcon
            className="absolute top-1/2 translate-y-[-50%] left-3"
            sx={{ color: "#959595" }}
          />
          <input
            type="text"
            className="heading-4 w-full text-[#959595] bg-transparent pl-[40px] outline-none"
            placeholder="Tìm kiếm theo"
          />
        </div>
        <div>
          <ul className="flex gap-5 items-center">
            <li>
              <Image
                src="/Notification.png"
                alt="Notification"
                width={24}
                height={24}
              />
            </li>
            <li>
              <button className="w-[40px] h-[40px] hover:cursor-pointer">
                <AvatarCanvas name="Đặng Thịnh" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between h-[60px] px-5">
        <div>
          <h2 className="heading-3 font-semibold text-[#0B8945]">Dashboard</h2>
          <span className="heading-4 text-[#8C8C8C]">
            Hi, welcome to motocycle management of Thành Thắng Moto
          </span>
        </div>
        <div className="flex items-center">
          <FormControl
            sx={{
              m: 1,
              minWidth: 180,
              bgcolor: "#F2F2F2",
              borderRadius: "4px",
            }}
            size="small"
          >
            {/* <InputLabel id="demo-select-small-label">Cơ sở sữa chữa</InputLabel> */}
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={brand}
              label="Cơ sở sửa chữa"
              onChange={handleChange}
              sx={{
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
              bgcolor: "#F2F2F2",
              color: "#009343",
              height: "40px",
              minWidth: "40px",
            }}
          >
            <MdInsertChart style={{ fontSize: "24px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
