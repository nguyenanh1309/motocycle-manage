import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

const Page = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{  width: "100%", height: "100%" }}>
        <Image
          src="/images/banner/dashboard.png"
          alt="Dashboard banner"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>
    </div>
  );
};

export default Page;
