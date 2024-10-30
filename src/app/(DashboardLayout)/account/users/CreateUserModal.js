import { ROLE_MANAGER, ROLE_MANAGER_TEXT } from "@/app/constants/RoleManager";
import SendRequest from "@/utils/SendRequest";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress
} from "@mui/material";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4
};

const CreateUserModal = (props) => {
  const { open, onClose } = props;
  const [newUserData, setNewUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: ROLE_MANAGER.SALE
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!newUserData.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(newUserData.email)) formErrors.email = "Email is not valid";
    if (!newUserData.firstName) formErrors.firstName = "First name is required";
    if (!newUserData.lastName) formErrors.lastName = "Last name is required";
    if (!newUserData.password) formErrors.password = "Password is required";
    if (!newUserData.role) formErrors.role = "Role is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    setLoading(true);
    const res = await SendRequest("POST", "/api/users", newUserData);

    if (res.payload) {
      onClose();
      setNewUserData({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        role: ROLE_MANAGER.SALE
      });
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tạo người dùng mới
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={newUserData.email}
          onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Họ"
          fullWidth
          margin="normal"
          value={newUserData.firstName}
          onChange={(e) => setNewUserData({ ...newUserData, firstName: e.target.value })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
        <TextField
          label="Tên"
          fullWidth
          margin="normal"
          value={newUserData.lastName}
          onChange={(e) => setNewUserData({ ...newUserData, lastName: e.target.value })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          value={newUserData.password}
          onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <FormControl fullWidth margin="normal" error={Boolean(errors.role)}>
          <InputLabel>Vai Trò</InputLabel>
          <Select
            label="Vai Trò"
            value={newUserData.role}
            onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
          >
            {Object.keys(ROLE_MANAGER).map((key) => (
              <MenuItem key={key} value={ROLE_MANAGER[key]}>
                {ROLE_MANAGER_TEXT[ROLE_MANAGER[key]]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateUser}
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Đang tạo..." : "Tạo"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
