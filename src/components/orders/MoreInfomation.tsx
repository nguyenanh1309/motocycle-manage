import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import themeConfig from "@/config";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Control,
  Controller,
  FieldErrors,
  useFormContext,
} from "react-hook-form";
import type { MoreInfomationType } from "@/types/orderType";
import Grid from "@mui/material/Grid2";
import { LIST_BRANCH, LIST_STAFF } from "@/constants/fake-data";

// interface MoreInfomationProps {
//   control: Control<{ more_infomation: MoreInfomation }>;
//   errors: FieldErrors<{ more_infomation: MoreInfomation }>;
// }

const MoreInfomation = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ more_infomation: MoreInfomationType }>();
  return (
    <>
      <Box>
        <Typography
          variant="h3"
          fontSize={16}
          fontWeight={600}
          color={themeConfig.textColor4}
        >
          Thông tin bổ sung
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography fontSize={14}>Sửa chữa tại:</Typography>
          <FormControl
            fullWidth
            error={Boolean(errors?.more_infomation?.branch_id)}
          >
            <Controller
              name="more_infomation.branch_id"
              control={control}
              rules={{ required: "Vui lòng chọn chi nhánh" }}
              render={({ field }) => (
                <Select
                  {...field}
                  displayEmpty
                  sx={{
                    height: "40px",
                    ".MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      padding: "0 14px",
                    },
                  }}
                >
                  {LIST_BRANCH.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {errors?.more_infomation?.branch_id?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography fontSize={14}>Người tiếp nhận:</Typography>
          <FormControl fullWidth>
            <Controller
              name="more_infomation.staff_id"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  labelId="roaming"
                  value={value}
                  displayEmpty
                  onChange={onChange}
                  error={Boolean(errors.more_infomation?.staff_id)}
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
                  {LIST_STAFF.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.more_infomation?.staff_id && (
              <FormHelperText sx={{ color: "error.main", marginInline: 0 }}>
                {errors.more_infomation?.staff_id.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography fontSize={14}>Thời gian tiếp nhận:</Typography>
          <FormControl fullWidth>
            <Controller
              name="more_infomation.start_date"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label=""
                      value={value}
                      onChange={onChange}
                      slotProps={{
                        textField: {
                          size: "small",
                          sx: { width: "100%", height: "40px" },
                          error: Boolean(errors.more_infomation?.start_date),
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
            {errors.more_infomation?.start_date && (
              <FormHelperText sx={{ color: "error.main", marginInline: 0 }}>
                {errors.more_infomation?.start_date.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography fontSize={14}>Dự kiến hoàn thành:</Typography>
          <FormControl fullWidth>
            <Controller
              name="more_infomation.end_date"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label=""
                      value={value}
                      onChange={onChange}
                      slotProps={{
                        textField: {
                          size: "small",
                          sx: { width: "100%", height: "40px" },
                          error: Boolean(errors.more_infomation?.end_date),
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              )}
            />
            {errors.more_infomation?.end_date && (
              <FormHelperText sx={{ color: "error.main", marginInline: 0 }}>
                {errors.more_infomation?.end_date.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default MoreInfomation;
