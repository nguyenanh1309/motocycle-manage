"use client";
import themeConfig from "@/config";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ButtonStyled } from "@/mui-theme/base";
import * as yup from "yup";

const defaultValues = {
  code: "",
  created_at: "",
  customer_name: "",
  total: "",
};



const Page = () => {
  const router = useRouter();
  
  const schema = yup.object().shape({
  code: yup.string().required("Mã hóa đơn là bắt buộc"),
  created_at: yup.string().required("Ngày tạo là bắt buộc"),
  customer_name: yup.string().required("Tên khách hàng là bắt buộc"),
  total: yup
    .number()
    .typeError("Tổng tiền phải là số")
    .positive("Tổng tiền phải lớn hơn 0")
    .required("Tổng tiền là bắt buộc"),
});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: typeof defaultValues) => {
    console.log(data);

  };

  const handleCancel = () => {
    router.push("/orders");
  };

  return (
    <Box padding={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Card>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid container spacing={3}>
                  {/* Mã hóa đơn */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Mã hóa đơn
                      </Typography>
                      <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập mã hóa đơn"
                            error={!!errors.code}
                            helperText={errors.code?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Ngày tạo */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Ngày tạo
                      </Typography>
                      <Controller
                        name="created_at"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            error={!!errors.created_at}
                            helperText={errors.created_at?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Tên khách hàng */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Tên khách hàng
                      </Typography>
                      <Controller
                        name="customer_name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập tên khách hàng"
                            error={!!errors.customer_name}
                            helperText={errors.customer_name?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Tổng tiền */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Tổng tiền
                      </Typography>
                      <Controller
                        name="total"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            placeholder="Nhập tổng tiền"
                            error={!!errors.total}
                            helperText={errors.total?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Nút bấm */}
          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Button onClick={handleCancel}>Hủy</Button>
              <ButtonStyled type="submit">Lưu</ButtonStyled>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Page;
