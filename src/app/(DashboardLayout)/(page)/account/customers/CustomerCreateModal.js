import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import SendRequest from "@/utils/SendRequest";
import { CUSTOMER_TYPE } from "@/app/constants/RoleManager";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2
};

const CustomerCreateModal = ({ open, onClose }) => {
  const [newUserData, setNewUserData] = useState({
    name: "",
    address: "",
    contact_info: {
      phone: "",
      email: ""
    },
    contract: null,
    role: CUSTOMER_TYPE[0].value
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!newUserData.name) formErrors.name = "Tên là bắt buộc";
    if (!newUserData.address) formErrors.address = "Địa chỉ là bắt buộc";
    if (!newUserData.contact_info.phone) formErrors.phone = "Số điện thoại là bắt buộc";
    if (!newUserData.contact_info.email) formErrors.email = "Email là bắt buộc";
    else if (!/\S+@\S+\.\S+/.test(newUserData.contact_info.email)) formErrors.email = "Email không hợp lệ";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await SendRequest("POST", "/api/customers", newUserData);
      if (res.payload) {
        // onClose();
        setNewUserData({
          name: "",
          address: "",
          contact_info: { phone: "", email: "" },
          contract: null,
          role: CUSTOMER_TYPE[0].value
        });
      }
    } catch (error) {
      console.error("Failed to create customer", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" fontWeight="bold" align="center">
          Tạo khách hàng mới
        </Typography>
        <Divider sx={{ my: 2 }} />
        <TextField
          label="Tên"
          fullWidth
          variant="outlined"
          margin="dense"
          value={newUserData.name}
          onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          label="Địa chỉ"
          fullWidth
          variant="outlined"
          margin="dense"
          value={newUserData.address}
          onChange={(e) => setNewUserData({ ...newUserData, address: e.target.value })}
          error={Boolean(errors.address)}
          helperText={errors.address}
        />
        <TextField
          label="Số điện thoại"
          fullWidth
          variant="outlined"
          margin="dense"
          value={newUserData.contact_info.phone}
          onChange={(e) =>
            setNewUserData({
              ...newUserData,
              contact_info: { ...newUserData.contact_info, phone: e.target.value }
            })
          }
          error={Boolean(errors.phone)}
          helperText={errors.phone}
        />
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="dense"
          value={newUserData.contact_info.email}
          onChange={(e) =>
            setNewUserData({
              ...newUserData,
              contact_info: { ...newUserData.contact_info, email: e.target.value }
            })
          }
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <FormControl fullWidth margin="dense" variant="outlined" error={Boolean(errors.role)}>
          <InputLabel>Vai Trò</InputLabel>
          <Select
            label="Vai Trò"
            value={newUserData.role}
            onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
          >
            {CUSTOMER_TYPE.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Hợp đồng (nếu có)"
          fullWidth
          variant="outlined"
          margin="dense"
          value={newUserData.contract || ""}
          onChange={(e) => setNewUserData({ ...newUserData, contract: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateUser}
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Đang tạo..." : "Tạo khách hàng"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomerCreateModal;
