import React, { useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, Checkbox, CircularProgress } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import SendRequest from "@/utils/SendRequest";
import toast from "react-hot-toast";

const AuthLogin = ({ title, subtitle, subtext }) => {
  // Khai báo state 'account' để lưu trữ thông tin email và mật khẩu người dùng nhập vào
  const [account, setAccount] = useState({
    email: "",
    password: ""
  });

  // Khai báo state 'loading' để quản lý trạng thái đang tải (loading) khi gửi yêu cầu đăng nhập
  const [loading, setLoading] = useState(false);

  // Hàm validate để kiểm tra tính hợp lệ của dữ liệu người dùng nhập vào
  const validate = () => {
    // Kiểm tra xem email có được nhập hay không
    if (!account.email) {
      toast.error("Vui lòng nhập email.");
      return false;
    }
    // Biểu thức chính quy để kiểm tra tính hợp lệ của email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Kiểm tra xem email có hợp lệ hay không
    if (!emailRegex.test(account.email)) {
      toast.error("Vui lòng nhập email hợp lệ.");
      return false;
    }
    // Kiểm tra xem mật khẩu có được nhập hay không
    if (!account.password) {
      toast.error("Vui lòng nhập mật khẩu.");
      return false;
    }
    // Nếu tất cả các kiểm tra đều hợp lệ, trả về true
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await SendRequest("POST", "/api/users/login", account);
      if (res.payload) {
        toast.success("Đăng nhập thành công");
        localStorage.setItem("token", res.payload.token);
        window.location.href = "/waitpage";
      } else {
        toast.error("Đăng nhập thất bại, vui lòng kiểm tra thông tin của bạn.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="Email" mb="5px">
            Email
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
        </Box>
        <Box mt="25px">
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
            Mật khẩu
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            value={account.password}
            onChange={(e) => setAccount({ ...account, password: e.target.value })}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Nhớ thiết bị" />
          </FormGroup>
          <Typography
            component={Link}
            href="/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main"
            }}
          >
            Quên mật khẩu ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
