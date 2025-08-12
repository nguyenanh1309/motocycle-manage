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
import { InventoryType } from "@/types/inventoryType";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useRouter } from "next/navigation";
import { ButtonStyled } from "@/mui-theme/base";

const defaultValues: Omit<InventoryType, "id"> | any = {
  name: "",
  code: "",
  quantity: "",
  importPrice: "",
  sellPrice: "",
  category: "",
  supplier: "",
};

const CATEGORY_LIST = [
  { value: "1", label: "danh mục 1" },
  { value: "2", label: "danh mục 2" },
  { value: "3", label: "danh mục 3" },
];

const SUPPLIER_LIST = [
  { value: "1", label: "Công ty A" },
  { value: "2", label: "Công ty B" },
  { value: "3", label: "Công ty C" },
];

const Page = () => {
  const router = useRouter();
  const showErrors = (field: string, valueLen: number, min: number) => {
    if (valueLen === 0) {
      return `${field} là bắt buộc`;
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} phải có ít nhất ${min} ký tự`;
    } else {
      return "";
    }
  };

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(2, (obj) => showErrors("Tên sản phẩm", obj.value.length, obj.min))
      .required(),
    code: yup
      .string()
      .min(3, (obj) => showErrors("Mã sản phẩm", obj.value.length, obj.min))
      .required(),
    quantity: yup
      .number()
      .typeError("Số lượng phải là số")
      .positive("Số lượng phải lớn hơn 0")
      .required(),
    importPrice: yup
      .number()
      .typeError("Giá nhập phải là số")
      .positive("Giá nhập phải lớn hơn 0")
      .required(),
    sellPrice: yup
      .number()
      .typeError("Giá bán phải là số")
      .positive("Giá bán phải lớn hơn 0")
      .required(),
    category: yup.string().required(),
    supplier: yup.string().required(),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Omit<InventoryType, "id">) => {
    try {
      console.log("Dữ liệu sản phẩm:", data);
    } catch (error) {}
  };

  const handleCancel = () => {
    router.push("/inventory");
  };

  return (
    <Box padding={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, minHeight: "300px" }}>
                <Grid container spacing={3}>
                  {/* Tên sản phẩm */}
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Tên sản phẩm
                      </Typography>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập tên sản phẩm"
                            error={Boolean(errors.name)}
                          />
                        )}
                      />
                      {errors.name && <FormHelperText sx={{ color: "error.main" }}>{errors.name.message}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Mã sản phẩm */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Mã sản phẩm
                      </Typography>
                      <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Nhập mã sản phẩm"
                            error={Boolean(errors.code)}
                          />
                        )}
                      />
                      {errors.code && <FormHelperText sx={{ color: "error.main" }}>{errors.code.message}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Số lượng */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Số lượng
                      </Typography>
                      <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            placeholder="Nhập số lượng"
                            error={Boolean(errors.quantity)}
                          />
                        )}
                      />
                      {errors.quantity && <FormHelperText sx={{ color: "error.main" }}>{errors.quantity.message}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Giá nhập */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Giá nhập
                      </Typography>
                      <Controller
                        name="importPrice"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            placeholder="Nhập giá nhập"
                            error={Boolean(errors.importPrice)}
                          />
                        )}
                      />
                      {errors.importPrice && <FormHelperText sx={{ color: "error.main" }}>{errors.importPrice.message}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Giá bán */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.textColor4, mb: 1 }}>
                        Giá bán
                      </Typography>
                      <Controller
                        name="sellPrice"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            placeholder="Nhập giá bán"
                            error={Boolean(errors.sellPrice)}
                          />
                        )}
                      />
                      {errors.sellPrice && <FormHelperText sx={{ color: "error.main" }}>{errors.sellPrice.message}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Danh mục */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: "bold", color: themeConfig.textColor4, mb: 1 }}>
                        Danh mục
                      </Typography>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} displayEmpty error={Boolean(errors.category)}>
                            {CATEGORY_LIST.map((item) => (
                              <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.category && <FormHelperText sx={{ color: "error.main" }}>{errors.category.message}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  {/* Nhà cung cấp */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <Typography variant="body2" sx={{ fontWeight: "bold", color: themeConfig.textColor4, mb: 1 }}>
                        Nhà cung cấp
                      </Typography>
                      <Controller
                        name="supplier"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} displayEmpty error={Boolean(errors.supplier)}>
                            {SUPPLIER_LIST.map((item) => (
                              <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.supplier && <FormHelperText sx={{ color: "error.main" }}>{errors.supplier.message}</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Nút hành động */}
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
