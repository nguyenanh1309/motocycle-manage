import themeConfig from "@/config";
import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export const ContainerBox = styled(Box)(({ theme }) => ({
  maxWidth: "1024px"
}));

export const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: themeConfig.linkColor,
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: themeConfig.mainColor,
  color: themeConfig.textColor1,
  textTransform: "none",
  display: "flex",
  gap: 5,
}));

