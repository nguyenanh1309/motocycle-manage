import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "@mui/material/Typography";
import themeConfig from "@/config";

const Breadcumb = () => {
  const pathName = usePathname();
  const listBreadcrumb = pathName.split("/").filter(Boolean);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link href="/" passHref>
        <Typography
          color="inherit"
          sx={{
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Home
        </Typography>
      </Link>
      {listBreadcrumb.map((crumb, index) => {
        const href = `/${listBreadcrumb.slice(0, index + 1).join("/")}`;
        const isLast = index === listBreadcrumb.length - 1;

        return isLast ? (
          <Typography
            key={crumb}
            color={themeConfig.mainColor}
          >
            {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
          </Typography>
        ) : (
          <Link key={crumb} href={href} passHref>
            <Typography
              color="inherit"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcumb;
