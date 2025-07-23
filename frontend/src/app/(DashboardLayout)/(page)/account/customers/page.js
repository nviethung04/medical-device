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
  IconButton
} from "@mui/material";
import { useEffect, useState } from "react";
import { IconReload, IconEdit, IconInfoCircle } from "@tabler/icons-react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import SendRequest from "@/utils/SendRequest";
import CustomerDetailModal from "./CustomerDetailModal";
import CustomerCreateModal from "./CustomerCreateModal";
import UpdateCustomerModal from "./UpdateCustomerModal";
import { CUSTOMER_TYPE } from "@/app/constants/RoleManager";
import { convertDate } from "@/utils/Main";

const CustomerPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/customers");
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

  const handleOpenDetailModal = (user) => {
    setSelectedUser(user);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedUser(null);
    setOpenDetailModal(false);
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
    setOpenUpdateModal(false);
  };

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <PageContainer title="Quản lý khách hàng" description="Quản lý khách hàng">
      <DashboardCard
        title="Quản lý khách hàng"
        action={
          <Button variant="contained" color="primary" onClick={() => setOpenCreateModal(true)}>
            Thêm khách hàng
          </Button>
        }
      >
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Tìm kiếm khách hàng"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            size="small"
            onChange={handleSearchChange}
          />
          <Box sx={{ marginLeft: 2 }}>
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
                  <TableCell align="center">Loại khách hàng</TableCell>
                  <TableCell align="center">Tên khách hàng</TableCell>
                  <TableCell align="center">Địa chỉ</TableCell>
                  <TableCell align="center">Số điện thoại</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Ngày tạo</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="center">
                      {CUSTOMER_TYPE.find((role) => role.value === user.role)?.label}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleOpenDetailModal(user)}>{user.name}</Button>
                    </TableCell>
                    <TableCell align="center">{user.address}</TableCell>
                    <TableCell align="center">{user.contact_info.phone}</TableCell>
                    <TableCell align="center">{user.contact_info.email}</TableCell>
                    <TableCell align="center">{convertDate(user.created_at)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleOpenDetailModal(user)}>
                        <IconInfoCircle />
                      </IconButton>
                      <IconButton color="primary" onClick={() => handleOpenUpdateModal(user)}>
                        <IconEdit />
                      </IconButton>
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
      {selectedUser && (
        <CustomerDetailModal open={openDetailModal} user={selectedUser} onClose={handleCloseDetailModal} />
      )}
      <CustomerCreateModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
      {selectedUser && (
        <UpdateCustomerModal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          customer={selectedUser}
          refreshCustomers={fetchUsers}
        />
      )}
    </PageContainer>
  );
};

export default CustomerPage;
