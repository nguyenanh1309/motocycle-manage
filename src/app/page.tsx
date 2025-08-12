import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"

const page = () => {
  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/bg-login.png')` }}
    >
      <div className="flex flex-col items-center justify-center w-[520px] h-[682px] p-5 bg-[rgba(0,0,0,0.56)]">
        <h2 className="text-[#ffffff] text-[30px] py-10">Login</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "100%" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& input": {
                color: "white",
              },
              "&.Mui-focused input": {
                color: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-required" label="Tài khoản" />
          <TextField
            id="outlined-password-input"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
          />
          <div className="flex justify-center">
              <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: "#2BA563",
                ":hover": { backgroundColor: "#258a53" },
              }}
            >
              Đăng nhập
            </Button>
          </div>
          
        </Box>
      </div>
    </div>
  );
};

export default page;
