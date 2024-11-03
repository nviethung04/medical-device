import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import SendRequest from "@/utils/SendRequest";
import { CUSTOMER_TYPE } from "@/app/constants/RoleManager";
import toast from "react-hot-toast";

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

const UpdateCustomerModal = ({ open, onClose, customer, refreshCustomers }) => {
  const [updatedData, setUpdatedData] = useState(customer);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!updatedData.name) formErrors.name = "Tên là bắt buộc";
    if (!updatedData.address) formErrors.address = "Địa chỉ là bắt buộc";
    if (!updatedData.contact_info.phone) formErrors.phone = "Số điện thoại là bắt buộc";
    if (!updatedData.contact_info.email) formErrors.email = "Email là bắt buộc";
    else if (!/\S+@\S+\.\S+/.test(updatedData.contact_info.email)) formErrors.email = "Email không hợp lệ";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleUpdateCustomer = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await SendRequest("PUT", `/api/customers`, {
        ...updatedData,
        contact_info: {
          phone: updatedData.contact_info.phone,
          email: updatedData.contact_info.email
        },
        id: updatedData._id
      });
      if (res.payload) {
        onClose();
        toast.success("Cập nhật khách hàng thành công");
        refreshCustomers();
      }
    } catch (error) {
      console.error("Failed to update customer", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" fontWeight="bold" align="center">
          Cập nhật thông tin khách hàng
        </Typography>
        <Divider sx={{ my: 2 }} />
        <TextField
          label="Tên"
          fullWidth
          variant="outlined"
          margin="dense"
          value={updatedData.name}
          onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          label="Địa chỉ"
          fullWidth
          variant="outlined"
          margin="dense"
          value={updatedData.address}
          onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
          error={Boolean(errors.address)}
          helperText={errors.address}
        />
        <TextField
          label="Số điện thoại"
          fullWidth
          variant="outlined"
          margin="dense"
          value={updatedData.contact_info.phone}
          onChange={(e) =>
            setUpdatedData({
              ...updatedData,
              contact_info: { ...updatedData.contact_info, phone: e.target.value }
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
          value={updatedData.contact_info.email}
          onChange={(e) =>
            setUpdatedData({
              ...updatedData,
              contact_info: { ...updatedData.contact_info, email: e.target.value }
            })
          }
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <FormControl fullWidth margin="dense" variant="outlined" error={Boolean(errors.role)}>
          <InputLabel>Vai Trò</InputLabel>
          <Select
            label="Vai Trò"
            value={updatedData.role}
            onChange={(e) => setUpdatedData({ ...updatedData, role: e.target.value })}
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
          value={updatedData.contract || ""}
          onChange={(e) => setUpdatedData({ ...updatedData, contract: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateCustomer}
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật khách hàng"}
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateCustomerModal;
