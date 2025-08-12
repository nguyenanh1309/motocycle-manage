"use client";
import themeConfig from "@/config";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { CustomerType } from "@/types/orderType";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useRouter } from "next/navigation";
import { ButtonStyled } from "@/mui-theme/base";

const defaultValues: Omit<CustomerType, "id"> | any = {
  spending_name: "",
  note: "",
  licensePlate: "",
  address: "",
  district: "",
  sub_district: "",
};

const DISTRICT_LIST = [
  {
    value: "1",
    label: "Hà Nội",
  },
  {
    value: "2",
    label: "Hồ Chí Minh",
  },
  {
    value: "3",
    label: "Đà Nẵng",
  },
];

const SUB_DISTRICT_LIST = [
  {
    value: "1",
    label: "Hà Nội",
  },
  {
    value: "2",
    label: "Hồ Chí Minh",
  },
];

const Page = () => {
  const router = useRouter();
  const showErrors = (field: string, valueLen: number, min: number) => {
    if (valueLen === 0) {
      return `${field} field is required`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`;
    } else {
      return "";
    }
  };
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, (obj) => showErrors("Tên khách hàng", obj.value.length, obj.min))
      .required(),
    phone: yup
      .string()
      .min(10, (obj) => showErrors("Số điện thoại", obj.value.length, obj.min))
      .required(),
    licensePlate: yup
      .string()
      .min(6, (obj) => showErrors("Biển số xe", obj.value.length, obj.min))
      .required(),
    address: yup.string().required(),
    district: yup.string().required(),
    sub_district: yup.string().required(),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Omit<CustomerType, "id">) => {
    try {
    } catch (error) {}
  };

  const handleCancel = () => {
    router.push("/spending");
  };
  return (
    <Box padding={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minHeight: "300px",
                }}
              ></CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent
                sx={{
                  minHeight: "300px",
                }}
              ></CardContent>
            </Card>
          </Grid>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <Button onClick={handleCancel}>Hủy</Button>
              <ButtonStyled type="submit">Lưu </ButtonStyled>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Page;
