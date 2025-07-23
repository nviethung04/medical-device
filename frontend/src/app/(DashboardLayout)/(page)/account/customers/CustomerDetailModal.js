import { CATEGORY_LIST, TRANSACTION_STATUS } from "@/app/constants/ProductConstants";
import { calculateMaintenanceDate, convertDate } from "@/utils/Main";
import {
  Modal,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const CustomerDetailModal = ({ open, user, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [expandedTransaction, setExpandedTransaction] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`/api/customers/${user._id}`);
      const data = await response.json();
      if (data.data) {
        setTransactions(data.data || []);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user._id]);

  useEffect(() => {
    if (open) {
      fetchTransactions();
    }
  }, [fetchTransactions, open]);

  const calculateTotalAmount = (products) => {
    return products.reduce(
      (total, product) => total + parseInt(product.price) * product.quantity,
      0
    );
  };

  const handleToggleDetails = (transactionId) => {
    setExpandedTransaction((prev) => (prev === transactionId ? null : transactionId));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          maxWidth: "95%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
          overflow: "auto",
          maxHeight: "90vh",
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom sx={{ mb: 2 }}>
          Chi tiết khách hàng
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Basic Information Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">
            <strong>Tên:</strong> {user.name}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Địa chỉ:</strong> {user.address}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Số điện thoại:</strong> {user.contact_info.phone}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Email:</strong> {user.contact_info.email}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Ngày tạo:</strong> {convertDate(user.created_at)}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Transaction History Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Lịch sử giao dịch
        </Typography>
        {transactions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Không có giao dịch nào
          </Typography>
        ) : (
          transactions.map((transaction) => (
            <Box key={transaction._id} sx={{ mb: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Ngày tạo:</strong> {convertDate(transaction.created_at)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Địa chỉ:</strong> {transaction.address}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Loại:</strong> {transaction.type === "import" ? "Nhập hàng" : "Xuất hàng"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Trạng thái:</strong>{" "}
                {TRANSACTION_STATUS[transaction.status] || "Không xác định"}
              </Typography>

              {/* Total Amount */}
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Tổng tiền:</strong>{" "}
                {calculateTotalAmount(transaction.products).toLocaleString()} VND
              </Typography>

              {/* Toggle Details Button */}
              <Button
                onClick={() => handleToggleDetails(transaction._id)}
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
              >
                {expandedTransaction === transaction._id ? "Ẩn sản phẩm" : "Xem sản phẩm"}
              </Button>

              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2, ml: 2 }}
              >
                <Link href={`/orders/${transaction._id}`}>
                  Xem chi tiết
                </Link>
              </Button>

              {/* Transaction Products Table */}
              <Collapse in={expandedTransaction === transaction._id} timeout="auto" unmountOnExit>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Tên sản phẩm</strong></TableCell>
                        <TableCell><strong>Danh mục</strong></TableCell>
                        <TableCell><strong>Hạn sử dụng</strong></TableCell>
                        <TableCell><strong>Ngày bảo trì (dự kiến)</strong></TableCell>
                        <TableCell><strong>Số lượng</strong></TableCell>
                        <TableCell><strong>Giá</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transaction.products.map((product) => (
                        <TableRow key={product.product_id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                        {CATEGORY_LIST.find((category) => category.value === product.category)?.name}
                          </TableCell>
                          <TableCell>{product.expiry_date} ngày</TableCell>
                          <TableCell>{calculateMaintenanceDate(transaction.created_at, product.expiry_date)}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>{parseInt(product.price).toLocaleString()} VND</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </Box>
          ))
        )}

        <Divider sx={{ mt: 3, mb: 3 }} />

        {/* Close Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={onClose} variant="contained" color="primary" sx={{ minWidth: 120 }}>
            Đóng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomerDetailModal;
