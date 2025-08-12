"use client";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Fade,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Icon from "../bases/Icon";
import themeConfig from "@/config";
import { NAVIGATION_ITEMS } from "@/config/navigation-list";
import { layoutSize } from "@/config/resize-layout";

type Props = {
  className?: string
  isExpanded?: boolean
  setIsExpanded?: (status: boolean) => void;
};

const Sidebar = ({ className, isExpanded, setIsExpanded }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsExpanded && setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        position: "relative",
        borderRight: "solid 1px #cccccc",
        maxWidth: isExpanded ? layoutSize.widthSidebarLarge : layoutSize.widthSidebarSmall,
        width: "100%",
        height: "100vh",
        transition: "max-width 0.3s ease-in-out",
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          padding: 0,
          borderRadius: "50%",
          top: "20px",
          right: "-10px",
          bgcolor: themeConfig.bgColor,
          border: "solid 1px #cccccc",
          "&:hover": {
            bgcolor: themeConfig.bgColorHover,
          },
          zIndex: 1,
        }}
      >
        <Icon
          icon={isExpanded ? "ion:chevron-back" : "ion:chevron-forward"}
          fontSize={16}
        />
      </IconButton>
      <Box
        sx={{
          height: "62px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={isExpanded} timeout={300}>
          <Box sx={{ display: isExpanded ? "block" : "none" }}>
            <Image
              src="/images/icons/logo-motocyle.png"
              alt="Motocyle"
              width={180}
              height={40}
              priority
            />
          </Box>
        </Fade>
        <Fade in={!isExpanded} timeout={300}>
          <Box
            sx={{
              display: !isExpanded ? "block" : "none",
              paddingRight: "10px",
            }}
          >
            <Image
              src="/images/icons/logo-small.png"
              alt="Motocyle"
              width={40}
              height={40}
              priority
            />
          </Box>
        </Fade>
      </Box>
      <Box>
        <List
          sx={{ width: "90%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {NAVIGATION_ITEMS.map((item) => (
            <ListItemButton
              key={item.key}
              component={Link}
              href={item.link}
              sx={{
                paddingInline: isExpanded ? 4 : 3,
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
                backgroundColor:
                  pathName.includes(item.link)
                    ? themeConfig.mainColor
                    : themeConfig.bgColor,
                color:
                  pathName.includes(item.link)
                    ? themeConfig.textColor1
                    : themeConfig.textColor2,
                "&:hover": {
                  backgroundColor:
                    pathName === item.link
                      ? themeConfig.mainColor
                      : themeConfig.bgColorHover,
                },
                height: "48px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <Icon
                  color={
                    pathName.includes(item.link)
                      ? themeConfig.textColor1
                      : themeConfig.textColor2
                  }
                  icon={item.icon}
                  fontSize={20}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    pathName.includes(item.link)
                      ? themeConfig.textColor1
                      : themeConfig.textColor2,
                  opacity: isExpanded ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: isExpanded ? "100%" : "0",
                  width: isExpanded ? "auto" : "0px",
                }}
                primary={item.title}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          borderTop: "solid 1px #cccccc",
          paddingInline: isExpanded ? 5 : 1,
          paddingBlock: 1,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Button
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isExpanded ? 2 : 0,
            height: "60px",
            width: isExpanded ? "100%" : "auto",
            textTransform: "none",
            transition: "all 0.3s ease-in-out",
            padding: isExpanded ? "0 8px" : 0,
          }}
        >
          <Box
            className="flex items-center justify-center bg-[#2BA563] text-[#ffffff] rounded-full"
            sx={{
              width: "40px",
              height: "40px",
              flexShrink: 0,
            }}
          >
            <Icon color={themeConfig.textColor1} icon="majesticons:logout" />
          </Box>
          {isExpanded && (
            <Typography
              color="#5B5B5B"
              fontWeight={600}
              fontSize="14px"
              sx={{
                transition: "opacity 0.3s ease-in-out",
                whiteSpace: "nowrap",
                overflow: "hidden",
                flexGrow: 1,
                textAlign: "left",
              }}
            >
              Đăng xuất
            </Typography>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
