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
  name: "",
  phone: "",
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
          <Grid size={{ xs: 12, md: 12 }}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minHeight: "300px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: themeConfig.textColor4,
                          mb: 1,
                        }}
                      >
                        Tên khách hàng
                      </Typography>
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            id="name"
                            placeholder="Type here"
                            onChange={onChange}
                            error={Boolean(errors.name)}
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "40px",
                                fontSize: "14px",
                              },
                            }}
                          />
                        )}
                      />
                      {errors.name ? (
                        <FormHelperText
                          sx={{ color: "error.main", marginInline: 0 }}
                        >
                          {errors.name.message}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: themeConfig.textColor4,
                          mb: 1,
                        }}
                      >
                        Số điện thoại
                      </Typography>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            id="phone"
                            placeholder="Type here"
                            onChange={onChange}
                            error={Boolean(errors.phone)}
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "40px",
                                fontSize: "14px",
                              },
                            }}
                          />
                        )}
                      />
                      {errors.phone ? (
                        <FormHelperText
                          sx={{ color: "error.main", marginInline: 0 }}
                        >
                          {errors.phone.message}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: themeConfig.textColor4,
                          mb: 1,
                        }}
                      >
                        Biển số xe
                      </Typography>
                      <Controller
                        name="licensePlate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            id="licensePlate"
                            placeholder="Type here"
                            onChange={onChange}
                            error={Boolean(errors.licensePlate)}
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "40px",
                                fontSize: "14px",
                              },
                            }}
                          />
                        )}
                      />
                      {errors.licensePlate ? (
                        <FormHelperText
                          sx={{ color: "error.main", marginInline: 0 }}
                        >
                          {errors.licensePlate.message}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: themeConfig.textColor4,
                          mb: 1,
                        }}
                      >
                        Địa chỉ cụ thể
                      </Typography>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            value={value}
                            id="address"
                            placeholder="Type here"
                            onChange={onChange}
                            error={Boolean(errors.licensePlate)}
                            sx={{
                              "& .MuiInputBase-root": {
                                height: "40px",
                                fontSize: "14px",
                              },
                            }}
                          />
                        )}
                      />
                      {errors.address && (
                        <FormHelperText
                          sx={{ color: "error.main", marginInline: 0 }}
                        >
                          {errors.address.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: themeConfig.textColor4,
                          mb: 1,
                        }}
                      >
                        Khu vực
                      </Typography>
                      <Controller
                        name="district"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            labelId="district"
                            value={value}
                            displayEmpty
                            onChange={onChange}
                            error={Boolean(errors.district)}
                            placeholder="Chọn khu vực"
                            sx={{
                              height: "40px",
                              padding: 0,
                              ".MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                height: "100%",
                                padding: "0 14px",
                                fontSize: "14px",
                              },
                            }}
                          >
                            {DISTRICT_LIST.map((item, index) => (
                              <MenuItem key={index} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.district && (
                        <FormHelperText
                          sx={{ color: "error.main", marginInline: 0 }}
                        >
                          {errors.district.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: themeConfig.textColor4,
                          mb: 1,
                        }}
                      >
                        Phường xã
                      </Typography>
                      <Controller
                        name="sub_district"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            labelId="sub_district"
                            value={value}
                            displayEmpty
                            onChange={onChange}
                            error={Boolean(errors.sub_district)}
                            placeholder="Chọn phường xã"
                            sx={{
                              height: "40px",
                              padding: 0,
                              ".MuiSelect-select": {
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                height: "100%",
                                padding: "0 14px",
                                fontSize: "14px",
                              },
                            }}
                          >
                            {SUB_DISTRICT_LIST.map((item, index) => (
                              <MenuItem key={index} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.sub_district && (
                        <FormHelperText
                          sx={{ color: "error.main", marginInline: 0 }}
                        >
                          {errors.sub_district.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
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
