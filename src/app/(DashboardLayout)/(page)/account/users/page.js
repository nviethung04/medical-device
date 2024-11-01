"use client";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  CircularProgress,
  Button,
  Box,
  Chip
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import SendRequest from "@/utils/SendRequest";
import { IconEdit } from "@tabler/icons-react";
import { ROLE_MANAGER_TEXT } from "@/app/constants/RoleManager";
import { IconReload } from "@tabler/icons-react";
import CreateUserModal from "./CreateUserModal";
import UpdateUserModal from "./UpdateUserModal";

const SamplePage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/users");
      if (res.payload) {
        setUsers(res.payload);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleEditUser = async (updatedUser) => {
    try {
      const res = await SendRequest("PUT", `/api/users`, {
        ...updatedUser,
        id: updatedUser._id
      });
      if (res.payload) {
        setOpenEditModal(false);
        fetchUsers();
        // close modal
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.profile.firstName} ${user.profile.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer title="Quản lý người dùng" description="Quản lý người dùng">
      <DashboardCard
        title="Quản lý người dùng"
        action={
          <Button variant="contained" color="primary" onClick={() => setOpenCreateModal(true)}>
            Thêm người dùng
          </Button>
        }
      >
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Tìm kiếm người dùng"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            size="small"
            style={{
              margin: 0
            }}
            onChange={handleSearchChange}
          />

          {/* reload */}
          <Box
            sx={{
              marginLeft: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button variant="contained" color="primary" onClick={fetchUsers}>
              <IconReload />
            </Button>
          </Box>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Họ và Tên</TableCell>
                  <TableCell align="center">Vai Trò</TableCell>
                  <TableCell align="center">Trạng Thái</TableCell>
                  <TableCell align="center">Ngày Tạo</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{`${user.profile.firstName} ${user.profile.lastName}`}</TableCell>
                    <TableCell align="center">{ROLE_MANAGER_TEXT[user.role] || "Không xác định"}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={user.active ? "Active" : "Inactive"}
                        color={user.active ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <IconEdit onClick={() => openEditUserModal(user)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </DashboardCard>

      {/* Create User Modal */}
      <CreateUserModal open={openCreateModal} onClose={handleCreateModalClose} />

      {/* Edit User Modal */}
      <UpdateUserModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleEditUser={handleEditUser}
      />
    </PageContainer>
  );
};

export default SamplePage;
