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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useRouter } from "next/navigation";
import { ButtonStyled } from "@/mui-theme/base";
import * as yup from "yup";

type ServiceType = {
  serviceCode: string;
  serviceName: string;
  status: string;
  price: number | string;
};

const defaultValues: ServiceType = {
  serviceCode: "",
  serviceName: "",
  status: "",
  price: "",
};

const STATUS_LIST = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Ngừng hoạt động" },
];

const Page = () => {
  const router = useRouter();

  const showErrors = (field: string, valueLen: number, min: number) => {
    if (valueLen === 0) {
      return `${field} là bắt buộc`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} phải ít nhất ${min} ký tự`;
    }
    return "";
  };

  const schema = yup.object().shape({
    serviceCode: yup
      .string()
      .min(2, (obj) => showErrors("Mã dịch vụ", obj.value.length, obj.min))
      .required(),
    serviceName: yup
      .string()
      .min(2, (obj) => showErrors("Tên dịch vụ", obj.value.length, obj.min))
      .required(),
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
  } = useForm<ServiceType>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ServiceType) => {
    console.log("Service Data:", data);
    // call API update service
  };

  const handleCancel = () => {
    router.push("/services");
  };

  return (
    <Box padding={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid container spacing={3}>
                  {/* Mã dịch vụ */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" fontWeight={600} color={themeConfig.textColor4} mb={1}>
                        Mã dịch vụ
                      </Typography>
                      <Controller
                        name="serviceCode"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập mã dịch vụ"
                            error={Boolean(errors.serviceCode)}
                          />
                        )}
                      />
                      {errors.serviceCode && (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {errors.serviceCode.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Tên dịch vụ */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" fontWeight={600} color={themeConfig.textColor4} mb={1}>
                        Tên dịch vụ
                      </Typography>
                      <Controller
                        name="serviceName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập tên dịch vụ"
                            error={Boolean(errors.serviceName)}
                          />
                        )}
                      />
                      {errors.serviceName && (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {errors.serviceName.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Trạng thái */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" fontWeight={600} color={themeConfig.textColor4} mb={1}>
                        Trạng thái
                      </Typography>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            displayEmpty
                            error={Boolean(errors.status)}
                          >
                            <MenuItem value="" disabled>
                              Chọn trạng thái
                            </MenuItem>
                            {STATUS_LIST.map((item, index) => (
                              <MenuItem key={index} value={item.value}>
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
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" fontWeight={600} color={themeConfig.textColor4} mb={1}>
                        Đơn giá
                      </Typography>
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập đơn giá"
                            type="number"
                            error={Boolean(errors.price)}
                          />
                        )}
                      />
                      {errors.price && (
                        <FormHelperText sx={{ color: "error.main" }}>
                          {errors.price.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Nút hành động */}
          <Grid size={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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
