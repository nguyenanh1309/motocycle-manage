"use client";
import React, { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import IconifyIcon from "@/components/bases/Icon";
import Image from "next/image";
import themeConfig from "@/config";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LeftWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100%",
  flex: 1,
  backgroundImage: 'url("/image-wms/background/background-login.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: 80,
  [theme.breakpoints.up("md")]: {
    maxWidth: 600,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "15px",
  textDecoration: "none",
  color: themeConfig.linkColor,
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is wrong format"),
  password: yup
    .string()
    .min(5)
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,99}$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    // )
    .required(),
});

const defaultValues = {
  email: "",
  password: "",
};

interface FormData {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues,
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    console.log("submit form");
  };

  const handleSuccess = (credentialResponsive: any) => {
    console.log(
      "Đăng nhập bằng tài khoản google thành công!",
      credentialResponsive
    );
    toast.success("Successfully login!");
    router.push("/dashboard");
  };

  const handleError = () => {
    console.log("error");
  };
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <LeftWrapper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          height: "100%",
          // backgroundImage: "linear-gradient(to bottom,themeConfig.bgButton #DBEFE4)",
          backgroundImage: "url('/images/banner/bg-login.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></LeftWrapper>
      <BoxWrapper>
        <Box
          sx={{
            position: "relative",
            mb: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src="/images/icons/logo-motocyle.png"
            alt="Motocycle"
            width={298}
            height={227}
          />
        </Box>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 5 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label=""
                  placeholder="Email"
                  value={value}
                  // onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  sx={{
                    borderRadius: "30px",
                    height: "60px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      paddingLeft: "26px",
                      paddingRight: "26px",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ color: "#C2C2C2" }}
                      >
                        <IconifyIcon icon="mdi:email-outline" fontSize={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {errors.email && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  // onBlur={onBlur}
                  label=""
                  placeholder="Password"
                  onChange={onChange}
                  id="auth-login-v2-password"
                  error={Boolean(errors.password)}
                  type={showPassword ? "text" : "password"}
                  sx={{
                    borderRadius: "30px",
                    height: "60px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "10px",
                    },
                    paddingLeft: "26px",
                    paddingRight: "26px",
                  }}
                  startAdornment={
                    <InputAdornment position="start" sx={{ color: "#C2C2C2" }}>
                      <IconifyIcon icon="mdi:lock-outline" fontSize={20} />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment
                      position="end"
                      sx={{
                        borderRadius: "30px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "30px",
                        },
                      }}
                    >
                      <IconButton
                        edge="end"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <IconifyIcon
                          icon={
                            showPassword
                              ? "mdi:eye-outline"
                              : "mdi:eye-off-outline"
                          }
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: "error.main" }} id="">
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBlock: "32px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  sx={{
                    color: themeConfig.mainColor,
                    "&.Mui-checked": {
                      color: themeConfig.mainColor,
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <LinkStyled href="/forgot-password">Forget password</LinkStyled>
          </Box>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              mb: 4,
              borderRadius: "10px",
              height: "55px",
              backgroundColor: themeConfig.mainColor,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Sign in
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderTop: `solid 1px ${themeConfig.borderColor}`,
              paddingBlock: 3,
            }}
          >
            {/* <Button
              fullWidth
              size="large"
              type="button"
              variant="contained"
              sx={{
                mb: 5,
                borderRadius: "10px",
                height: "55px",
                backgroundColor: themeConfig.bgButton2,
                textTransform: "none",
              }}
            >
              <Image
                src="/images/icons/icon-google.png"
                alt="Motocycle"
                width={24}
                height={24}
              />
              <Typography sx={{ marginLeft: 1 }}>
                Or sign in width google
              </Typography>
            </Button> */}
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
              <Typography sx={{ marginRight: 1, fontSize: "13px" }}>
                Don't have an account?
              </Typography>
              <LinkStyled href="/sign-up" sx={{ fontSize: "13px" }}>Sign up now</LinkStyled>
            </Box>
          </Box>
        </form>
      </BoxWrapper>
    </Box>
  );
};

export default Page;
