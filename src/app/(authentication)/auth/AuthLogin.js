import React, { useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, Checkbox } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import SendRequest from "@/utils/SendRequest";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [account, setAccount] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate email and password
    // call api to login
    const res = await SendRequest("POST", "/api/users/login", account);

    if (res.payload) {
      console.log(res.payload);
    }
    console.log(res);
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
            href="/"
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
        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleSubmit}>
          Đăng nhập
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
