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
  service_code: "",
  service_name: "",
  status: "",
  price: "",
};

const STATUS_LIST = [
  { value: "active", label: "Đã thanh toán" },
  { value: "inactive", label: "Chưa thanh toán" },
];



const Page = () => {
  const router = useRouter();



  const schema = yup.object().shape({
  service_code: yup.string().required("Mã dịch vụ là bắt buộc"),
  service_name: yup.string().required("Tên dịch vụ là bắt buộc"),
  status: yup.string().required("Trạng thái là bắt buộc"),
  price: yup
    .number()
    .typeError("Đơn giá phải là số")
    .positive("Đơn giá phải lớn hơn 0")
    .required("Đơn giá là bắt buộc"),
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
    console.log( data);
  };

  const handleCancel = () => {
    router.push("/services");
  };

  return (
    <Box padding={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Card>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid container spacing={3}>

                  {/* Mã dịch vụ */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Mã dịch vụ
                      </Typography>
                      <Controller
                        name="service_code"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập mã dịch vụ"
                            error={!!errors.service_code}
                            helperText={errors.service_code?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Tên dịch vụ */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Tên dịch vụ
                      </Typography>
                      <Controller
                        name="service_name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập tên dịch vụ"
                            error={!!errors.service_name}
                            helperText={errors.service_name?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Trạng thái */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Trạng thái
                      </Typography>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            displayEmpty
                            error={!!errors.status}
                          >
                            <MenuItem value="">Chọn trạng thái</MenuItem>
                            {STATUS_LIST.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.status && (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {errors.status.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Đơn giá */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Đơn giá
                      </Typography>
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            placeholder="Nhập đơn giá"
                            error={!!errors.price}
                            helperText={errors.price?.message}
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
