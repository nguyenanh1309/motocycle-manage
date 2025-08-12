"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { layoutSize } from "@/config/resize-layout";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Box className="class-layout" sx={{ display: "flex" }}>
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Header />
          <Box
            sx={{
              backgroundColor: "#F3F3F3",
              flex: 1,
              transition: "max-width 0.3s ease-in-out",
              maxWidth: isExpanded ? `calc(100vw - ${layoutSize.widthSidebarLarge})` : `calc(100vw - ${layoutSize.widthSidebarSmall})`,
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
  );
}
