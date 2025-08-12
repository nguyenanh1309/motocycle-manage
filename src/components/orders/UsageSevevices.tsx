import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ServiceType, SpareType } from "@/types/orderType";
import {
  Box,
  Button,
  FormHelperText,
  FormControl,
  IconButton,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  CardContent,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import themeConfig from "@/config";
import Icon from "../bases/Icon";
import QuantityInput from "../bases/QuantityInput";
import { FieldErrors, useFormContext } from "react-hook-form";
import { Control, Controller } from "react-hook-form";
import { LIST_SPARE_PART } from "@/constants/fake-data";

// interface UsageSevevicesProps {
//   control: Control<{ usage_services: ServiceType[] }>;
//   errors: FieldErrors<{ usage_services: ServiceType[] }>;
// }

const UsageSevevices = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ usage_services: ServiceType[] }>();
  const [usageService, setUsageService] = useState<ServiceType[]>([
    {
      service_name: "Thay dầu castrol",
      quantity: 1,
      price: 120000,
      sub_total: 120000,
      spare_parts: [
        {
          name: "Dầu castrol",
          quantity: 1,
          price: 120000,
        },
        {
          name: "Lọc nhớt",
          quantity: 1,
          price: 50000,
        },
      ],
    },
  ]);

  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null
  );

  const addService = () => {
    const newService: ServiceType = {
      service_name: "",
      quantity: 1,
      price: 0,
      sub_total: 0,
      spare_parts: [],
    };
    setUsageService([...usageService, newService]);
    setSelectedService(newService);
  };

  const deleteService = (index: number) => {
    const updatedServices = usageService.filter((_, i) => i !== index);
    setUsageService(updatedServices);
    if (selectedService === usageService[index]) {
      setSelectedService(null);
    }
  };

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            variant="h3"
            fontSize={16}
            fontWeight={600}
            color={themeConfig.textColor4}
            sx={{
              marginBottom: 2,
            }}
          >
            Thông tin sửa chữa
          </Typography>

          <Box paddingBottom={2}>
            <Autocomplete
              disablePortal
              options={LIST_SPARE_PART}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ "& .MuiInputBase-root": { height: "40px" } }}
                  placeholder="Chọn nhanh dịch vụ sửa chữa ..."
                  label=""
                />
              )}
            />
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: themeConfig.borderColor,
              borderRadius: 2,
              overflow: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="100%">Tên dịch vụ</TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    Số lượng
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    Đơn giá
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                    Thành tiền
                  </TableCell>
                  <TableCell align="center" sx={{ width: 48 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usageService.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        cursor: "pointer",
                      },
                      ...(selectedService === row && {
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        boxShadow: "0 1px 6px 0 rgba(0, 90, 255, 0.6)",
                      }),

                      mb: 1,
                    }}
                    onClick={() => handleServiceSelect(row)}
                  >
                    <TableCell component="th" scope="row">
                      <FormControl fullWidth>
                        <Controller
                          name={`usage_services.${index}.service_name`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              value={value}
                              id="service_name"
                              placeholder="Nhập vào tên dịch vụ"
                              onChange={onChange}
                              error={Boolean(
                                errors.usage_services?.[index]?.service_name
                              )}
                              sx={{
                                "& .MuiInputBase-root": {
                                  height: "40px",
                                  fontSize: "14px",
                                },
                              }}
                            />
                          )}
                        />
                        {errors.usage_services?.[index]?.service_name ? (
                          <FormHelperText
                            sx={{ color: "error.main", marginInline: 0 }}
                          >
                            {
                              errors.usage_services?.[index]?.service_name
                                ?.message
                            }
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      <FormControl fullWidth>
                        <Controller
                          name={`usage_services.${index}.quantity`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              id="standard-basic"
                              label=""
                              value={value}
                              onChange={onChange}
                              variant="standard"
                              size="small"
                              sx={{
                                "& .MuiInputBase-root": {
                                  input: {
                                    textAlign: "center",
                                    fontSize: "0.875rem",
                                  },
                                },
                              }}
                            />
                          )}
                        />
                        {errors.usage_services?.[index]?.quantity ? (
                          <FormHelperText
                            sx={{ color: "error.main", marginInline: 0 }}
                          >
                            {errors.usage_services?.[index]?.quantity?.message}
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      <FormControl fullWidth>
                        <Controller
                          name={`usage_services.${index}.price`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <TextField
                              id="standard-basic"
                              label=""
                              value={value}
                              onChange={onChange}
                              variant="standard"
                              size="small"
                              sx={{
                                "& .MuiInputBase-root": {
                                  input: {
                                    textAlign: "center",
                                    fontSize: "0.875rem",
                                  },
                                },
                              }}
                            />
                          )}
                        />
                        {errors.usage_services?.[index]?.price ? (
                          <FormHelperText
                            sx={{ color: "error.main", marginInline: 0 }}
                          >
                            {errors.usage_services?.[index]?.price?.message}
                          </FormHelperText>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      <TextField
                        id="standard-basic"
                        label=""
                        value={row.sub_total}
                        variant="standard"
                        size="small"
                        sx={{
                          "& .MuiInputBase-root": {
                            input: {
                              textAlign: "right",
                              fontSize: "0.875rem",
                            },
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ width: 48 }}>
                      <IconButton onClick={() => deleteService(index)}>
                        <Icon icon="mingcute:close-fill" fontSize={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                display: "flex",
                padding: 2,
                borderTop: 1,
                borderColor: themeConfig.borderColor,
              }}
            >
              <Button
                variant="text"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
                onClick={addService}
              >
                <Icon icon="gridicons:add-outline" fontSize={16} />
                <Typography variant="body2">Thêm dịch vụ khác</Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            paddingBlock: 3,
            height: "100%",
          }}
        >
          <Box
            sx={{
              border: 1,
              borderColor: themeConfig.borderColor,
              borderRadius: 2,
              marginTop: "10px",
            }}
          >
            <Typography
              variant="body2"
              fontSize={16}
              padding={2}
              color={themeConfig.textColor4}
              sx={{ borderBottom: 1, borderColor: themeConfig.borderColor }}
            >
              Phụ tùng đã sử dụng
            </Typography>
            <CardContent>
              <Autocomplete
                disablePortal
                options={LIST_SPARE_PART}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ "& .MuiInputBase-root": { height: "40px" } }}
                    placeholder="Chọn phụ tùng được sử dụng..."
                    label=""
                  />
                )}
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                padding={2}
                minHeight={200}
              >
                {selectedService && selectedService.spare_parts.length > 0 ? (
                  selectedService.spare_parts.map(
                    (spare: SpareType, index: number) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          key={index}
                          variant="body2"
                          color={themeConfig.textColor3}
                          fontWeight={500}
                        >
                          {spare.name} - SL: {spare.quantity}
                        </Typography>
                        <QuantityInput value={spare.quantity} />
                      </Box>
                    )
                  )
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Icon
                      icon="fa:gears"
                      fontSize={60}
                      color={themeConfig.bgColor1}
                    />
                    <Typography
                      fontSize={14}
                      color={themeConfig.textColor3}
                      marginTop={1}
                    >
                      Không có phụ tùng nào được sử dụng
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UsageSevevices;
