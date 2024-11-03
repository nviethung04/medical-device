import { ROLE_MANAGER, ROLE_MANAGER_TEXT } from "@/app/constants/RoleManager";
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
  Divider
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2
};

const UpdateUserModal = (props) => {
  const { openEditModal, setOpenEditModal, selectedUser, setSelectedUser, handleEditUser } = props;

  return (
    <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
      <Box sx={modalStyle}>
        <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 2 }}>
          Chỉnh sửa người dùng
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          label="Email"
          fullWidth
          margin="dense"
          defaultValue={selectedUser?.email}
          variant="outlined"
          disabled
          sx={{ mb: 1 }}
        />
        <TextField
          label="Họ"
          fullWidth
          margin="dense"
          variant="outlined"
          value={selectedUser?.profile.firstName}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, profile: { ...selectedUser.profile, firstName: e.target.value } })
          }
          sx={{ mb: 1 }}
        />
        <TextField
          label="Tên"
          fullWidth
          margin="dense"
          variant="outlined"
          value={selectedUser?.profile.lastName}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, profile: { ...selectedUser.profile, lastName: e.target.value } })
          }
          sx={{ mb: 1 }}
        />
        <FormControl fullWidth margin="dense" variant="outlined" sx={{ mb: 1 }}>
          <InputLabel>Vai Trò</InputLabel>
          <Select
            label="Vai Trò"
            value={selectedUser?.role}
            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
          >
            {Object.keys(ROLE_MANAGER).map((key) => (
              <MenuItem key={key} value={ROLE_MANAGER[key]}>
                {ROLE_MANAGER_TEXT[ROLE_MANAGER[key]]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" variant="outlined" sx={{ mb: 1 }}>
          <InputLabel>Kích hoạt</InputLabel>
          <Select
            label="Kích hoạt"
            value={selectedUser?.active}
            onChange={(e) => setSelectedUser({ ...selectedUser, active: e.target.value })}
          >
            <MenuItem value={true}>Kích hoạt</MenuItem>
            <MenuItem value={false}>Không kích hoạt</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditUser({ ...selectedUser })}
          fullWidth
          sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
        >
          Cập nhật
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
