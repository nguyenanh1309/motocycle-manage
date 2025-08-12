import React from "react";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const SearchBox = ({ placeholder = "Tìm kiếm theo", value = "", onChange } : Props) => {
  return (
    <div className="relative bg-[#107e412d] flex items-center border rounded-md max-w-[400px] w-full h-[36px]">
      <SearchIcon
        className="absolute top-1/2 translate-y-[-50%] left-3"
        sx={{ color: "#959595" }}
      />
      <input
        type="text"
        value={value}
        className="heading-4 w-full text-[#959595] bg-transparent pl-[40px] outline-none"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
