"use client";
import {
  Box,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputLabel,
  Select,
  DialogActions
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import SendRequest from "@/utils/SendRequest";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/Main";
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@/app/constants/ProductConstants";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { FormControl } from "@mui/base";
import { MenuItem } from "react-mui-sidebar";
import toast from "react-hot-toast";

const ViewTransaction = ({ params }) => {
  const { orderId } = params;
  const router = useRouter();
  const [transaction, setTransaction] = useState(null);

  const [editData, setEditData] = useState({
    address: "",
    note: "",
    status: 0
  });
  const [modalUpdate, setModalUpdate] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await SendRequest("GET", `/api/transactions/${orderId}`);
        if (res.payload) {
          setTransaction(res.payload);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransaction();
  }, [orderId]);

  if (!transaction) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const { supplier, products, user, address, note, created_at, updated_at } = transaction;

  // Tính tổng tiền cho toàn bộ đơn hàng
  const calculateTotalAmount = () => {
    return products.reduce((total, product) => {
      return total + (product.price ? product.quantity * parseFloat(product.price) : 0);
    }, 0);
  };

  // Hàm lấy trạng thái dựa trên loại đơn hàng
  const getStatusTimeline = (type, status) => {
    const statuses = type === "import" ? [1, 2, 3, 4, 0] : [1, 2, 3, 5, 0];
    return statuses.map((code) => ({
      code,
      label: TRANSACTION_STATUS[code],
      isActive: code === status || (status > code && status !== 0),
      isCompleted: status > code
    }));
  };

  const handleUpdate = () => {
    setModalUpdate(true);
    setEditData(transaction);
  };

  // Hàm để xử lý khi thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData({ ...editData, [name]: value });
  };

  // Hàm để lưu thay đổi
  const handleSave = async () => {
    try {
      const res = await SendRequest("PUT", `/api/transactions`, { ...editData, id: orderId });
      if (res.payload) {
        setTransaction({ ...transaction, ...editData });
        setModalUpdate(false);
        toast.success("Cập nhật đơn hàng thành công");
      } else {
        toast.error("Cập nhật đơn hàng thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const totalAmount = calculateTotalAmount();
  const timelineData = getStatusTimeline(transaction.type, transaction.status);
  let statuses = transaction.type === "import" ? [1, 2, 3, 4, 0] : [1, 2, 3, 5, 0];

  return (
    <PageContainer title="Biên lai đơn hàng" description="Quản lý đơn hàng">
      <DashboardCard
        title="Chi tiết đơn hàng"
        action={
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Cập nhập đơn hàng
          </Button>
        }
      >
        {/* Supplier and User Information */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Thông tin nhà cung cấp
            </Typography>
            <Typography>Tên: {supplier.name}</Typography>
            <Typography>Địa chỉ: {supplier.address}</Typography>
            <Typography>
              Liên hệ: {supplier.contact_info.phone} | {supplier.contact_info.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Thông tin người dùng
            </Typography>
            <Typography>Họ Tên: {`${user.profile.firstName} ${user.profile.lastName}`}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Ngày tạo: {new Date(created_at).toLocaleDateString()}</Typography>
            <Typography>Ngày cập nhật: {new Date(updated_at).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Order Information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Thông tin đơn hàng
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Loại đơn hàng
            </Typography>
            <Typography>{TRANSACTION_TYPE[transaction.type]}</Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Địa chỉ nhận hàng
            </Typography>
            <Typography>{address}</Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Ghi chú
            </Typography>
            <Typography>{note || "Không có ghi chú"}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="center" variant="h6" gutterBottom>
              Trạng thái đơn hàng
            </Typography>
            <Timeline sx={{ mt: 2 }}>
              {timelineData.map((item, index) => (
                <TimelineItem key={item.code}>
                  <TimelineSeparator>
                    <TimelineDot color={item.isActive ? "primary" : item.isCompleted ? "success" : "grey"} />
                    {index < timelineData.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography
                      variant="body2"
                      color={item.isActive ? "textPrimary" : "textSecondary"}
                      sx={{ fontWeight: item.isActive ? "bold" : "normal" }}
                    >
                      {item.label}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Product List Table */}
        <Typography variant="h6" gutterBottom>
          Danh sách sản phẩm
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Tên sản phẩm</TableCell>
                <TableCell align="center">Hạn sử dụng</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Giá (VNĐ)</TableCell>
                <TableCell align="center">Tổng (VNĐ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => {
                const productTotal = product.price ? product.quantity * parseFloat(product.price) : 0;
                return (
                  <TableRow key={product.product_id}>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.expiry_date} ngày</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                    <TableCell align="center">{formatCurrency(product.price)}VNĐ</TableCell>
                    <TableCell align="center">{formatCurrency(productTotal)}VNĐ</TableCell>
                  </TableRow>
                );
              })}
              {/* Tổng cộng */}
              <TableRow>
                <TableCell colSpan={1} align="center" sx={{ fontWeight: "bold" }}>
                  Tổng cộng:
                </TableCell>
                <TableCell colSpan={3} align="center"></TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  {formatCurrency(totalAmount)}VNĐ
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={modalUpdate} onClose={() => setModalUpdate(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Địa chỉ"
              name="address"
              value={editData.address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Ghi chú"
              name="note"
              value={editData.note}
              onChange={handleChange}
            />
            <Box mt={2}>
              <InputLabel>Trạng thái</InputLabel>
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant="contained"
                  // Thay đổi cách thiết lập màu sắc cho nút
                  disabled={editData.status > status && status !== 0}
                  color={editData.status === status ? "primary" : "inherit"}
                  onClick={() => setEditData({ ...editData, status })}
                  sx={{ m: 1 }} // Thêm khoảng cách giữa các nút
                >
                  {TRANSACTION_STATUS[status]}
                </Button>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalUpdate(false)} color="secondary">
              Hủy
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </DashboardCard>
    </PageContainer>
  );
};

export default ViewTransaction;
