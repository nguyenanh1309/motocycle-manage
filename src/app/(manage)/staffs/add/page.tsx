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
  name: "",
  address: "",
  dob: "",
  phone: "",
  email: "",
  position: "",
};

const POSITION_LIST = [
  { value: "1", label: "Nhân viên" },
  { value: "2", label: "Quản lý" },
  { value: "3", label: "Giám đốc" },
];

const Page = () => {
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required("Tên nhân viên là bắt buộc"),
    address: yup.string().required("Địa chỉ là bắt buộc"),
    dob: yup.string().required("Ngày sinh là bắt buộc"),
    phone: yup
      .string()
      .min(10, "Số điện thoại phải ít nhất 10 số")
      .required("Số điện thoại là bắt buộc"),
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    position: yup.string().required("Chức vụ là bắt buộc"),
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
    router.push("/staffs");
  };

  return (
    <Box padding={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid container spacing={3}>
                  {/* Tên nhân viên */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Tên nhân viên
                      </Typography>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập tên nhân viên"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Địa chỉ */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Địa chỉ
                      </Typography>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập địa chỉ"
                            error={!!errors.address}
                            helperText={errors.address?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Ngày sinh & Số điện thoại */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Ngày sinh
                      </Typography>
                      <Controller
                        name="dob"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="date"
                            error={!!errors.dob}
                            helperText={errors.dob?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Số điện thoại
                      </Typography>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập số điện thoại"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  {/* Email & Chức vụ */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Email
                      </Typography>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Chức vụ
                      </Typography>
                      <Controller
                        name="position"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            error={!!errors.position}
                            displayEmpty
                          >
                            <MenuItem value="">Chọn chức vụ</MenuItem>
                            {POSITION_LIST.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.position && (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {errors.position.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Buttons */}
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
