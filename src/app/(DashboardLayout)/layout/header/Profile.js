import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText } from "@mui/material";

import { IconKey, IconListCheck, IconMail, IconUser, IconUserEdit } from "@tabler/icons-react";
import { useApp } from "@/app/contexts/AppContext";
import { ROLE_MANAGER_TEXT } from "@/app/constants/RoleManager";

const Profile = () => {
  const { currentUser } = useApp();

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* hi account */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.primary",
          fontWeight: "medium",
          fontSize: "14px",
          mr: 1
        }}
      >
        Hi, {currentUser?.profile?.firstName || ""}
      </Box>

      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main"
          })
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px"
          }
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconKey width={20} />
          </ListItemIcon>
          <ListItemText>{ROLE_MANAGER_TEXT[currentUser?.role] || 1} </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>
            {currentUser?.profile?.firstName || ""} {currentUser?.profile?.lastName || ""}
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconUserEdit width={20} />
          </ListItemIcon>
          <ListItemText>Tài khoản của tôi</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
