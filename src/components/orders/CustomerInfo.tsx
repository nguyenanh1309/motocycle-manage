import themeConfig from "@/config";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import Icon from "../bases/Icon";
import { CustomerType } from "@/types/orderType";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const defaultValues: Omit<CustomerType, 'id'> = {
  name: "",
  phone: "",
  licensePlate: "",
  address: "",
};

const listCustomer = [
  {
    id: "1",
    name: "Nguyễn Văn Thanh",
    phone: "0987654321",
    licensePlate: "29B5-05623",
    address: "22 Vũ Trọng Phụng, Thanh Xuân",
  },
  {
    id: "2",
    name: "Đặng Hữu Thịnh",
    phone: "0979359018",
    licensePlate: "35B2-67077",
    address: "225 Quan Hoa, Cầu Giấy, Hà Nội",
  },
  {
    id: "3",
    name: "Đào Duy Từ",
    phone: "0879947738",
    licensePlate: "29C3-33633",
    address: "30 Trần Xuân Soạn, Đống Đa, Hà Nội",
  },
];

const CustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerType | null>(null);
  const [newCustomer, setNewCustomer] = useState<Omit<CustomerType, 'id'>>({
    name: "",
    phone: "",
    licensePlate: "",
    address: "",
  });

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
    address: yup.string(),
  });

  const handleChangeCustomerInfo = (event: any, value: any) => {
    if (value && !value.isAddOption && !value.isRetailOption) {
      setCustomerInfo(value);
    } else if (value && value.isRetailOption) {
      setCustomerInfo({
        id: "retail",
        name: "Khách lẻ",
        phone: "",
        licensePlate: "",
        address: "",
      });
    } else {
      setCustomerInfo(null);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setNewCustomer((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddCustomer = (data: Omit<CustomerType, 'id'>) => {
    const newCustomerId = (listCustomer.length + 1).toString();
    const customerToAdd = { ...data, id: newCustomerId };
    listCustomer.push(customerToAdd);
    setCustomerInfo(customerToAdd);
    setNewCustomer({
      name: "",
      phone: "",
      licensePlate: "",
      address: "",
    });
    handleClose();
  };

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

  const onSubmit = async (data: Omit<CustomerType, 'id'>) => {
    console.log(data);
    handleAddCustomer(data);
    try {
      // Add any additional logic here
    } catch (error) {
      // toast.error("Error creating user. Please try again.");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h3"
          fontSize={16}
          fontWeight={600}
          color={themeConfig.textColor4}
        >
          Thông tin khách hàng
        </Typography>
      </Box>
      <Box>
        <Autocomplete
          disablePortal
          options={[
            { name: "Thêm khách hàng mới", isAddOption: true },
            { name: "Khách lẻ", isRetailOption: true },
            ...listCustomer,
          ]}
          getOptionLabel={(option) => option.name || ""}
          sx={{ width: "100%" }}
          onChange={handleChangeCustomerInfo}
          value={customerInfo}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              sx={{ "& .MuiInputBase-root": { height: "40px" } }}
              placeholder="Tìm kiếm theo tên, SĐT, Biển KS, ..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:magnify" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            if ("isAddOption" in option && option.isAddOption) {
              return (
                <Box
                  component="li"
                  {...props}
                  onClick={handleClickOpen}
                  sx={{
                    borderBottom: `solid 1px ${themeConfig.borderColor}`,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      paddingBlock: 1,
                      gap: 1,
                      fontWeight: "bold",
                    }}
                  >
                    <Box
                      sx={{
                        width: 35,
                        height: 35,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon icon="gg:add" />
                    </Box>
                    <Typography>{option.name}</Typography>
                  </Box>
                </Box>
              );
            }
            if ("isRetailOption" in option && option.isRetailOption) {
              return (
                <Box
                  component="li"
                  {...props}
                  sx={{
                    borderBottom: `solid 1px ${themeConfig.borderColor}`,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: themeConfig.textColor4,
                      paddingBlock: 1,
                      gap: 1,
                      fontWeight: "bold",
                    }}
                  >
                    <Icon icon="mdi:user-circle-outline" fontSize={35} />
                    <Typography>{option.name}</Typography>
                  </Box>
                </Box>
              );
            }
            return (
              <Box
                component="li"
                sx={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                {...props}
              >
                <Icon
                  icon="mdi:user-circle"
                  fontSize={35}
                  color={themeConfig.textColor2}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1">{option.name}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" color={themeConfig.textColor4}>
                      {"phone" in option ? option.phone : ""}
                    </Typography>
                    <Typography>-</Typography>
                    <Typography variant="body2" color={themeConfig.textColor4}>
                      {"licensePlate" in option ? option.licensePlate : ""}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          }}
        />
        {customerInfo ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              marginTop: 1,
              paddingBlock: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: "12  0px" }}>
                  Tên khách hàng:
                </Typography>
                <Typography variant="body2">{customerInfo?.name}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: "12  0px" }}>
                  Số điện thoại:
                </Typography>
                <Typography variant="body2">{customerInfo?.phone}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: "12  0px" }}>
                  Biển số xe:
                </Typography>
                <Typography variant="body2">
                  {customerInfo?.licensePlate}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ minWidth: "12  0px" }}>
                  Địa chỉ:
                </Typography>
                <Typography variant="body2">{customerInfo?.address}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `dashed 1px ${themeConfig.borderColor}`,
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  padding: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">Tổng chi tiêu:</Typography>
                  <Typography variant="body2">3.655.000đ</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">Số lần sửa chữa:</Typography>
                  <Typography variant="body2">3</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">Điểm tiêu dùng:</Typography>
                  <Typography variant="body2">100</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
            }}
          >
            <Icon
              icon="solar:user-id-linear"
              fontSize={80}
              color={themeConfig.bgColor1}
            />
            <Typography fontSize={14} color={themeConfig.textColor3}>
              Chưa có thông tin khách hàng
            </Typography>
          </Box>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Thêm khách hàng mới</DialogTitle>
          <DialogContent sx={{ minWidth: "600px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Grid size={6}>
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
                <Grid size={6}>
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
                      Địa chỉ
                    </Typography>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          id="address"
                          placeholder="Nhập địa chỉ"
                          onChange={onChange}
                          error={Boolean(errors.address)}
                          multiline
                          rows={3}
                          fullWidth
                          sx={{
                            "& .MuiInputBase-root": {
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
                <Grid size={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "8px",
                    }}
                  >
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button type="submit">Thêm</Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default CustomerInfo;
