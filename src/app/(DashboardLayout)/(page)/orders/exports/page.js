"use client";
import { useState } from "react";
import {
  Typography,
  TextField,
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  Paper,
  Divider
} from "@mui/material";
import { Add, Remove, Delete, Visibility } from "@mui/icons-material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const POSPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentAddress, setPaymentAddress] = useState("");

  const products = [
    { id: 1, code: "P001", name: "Thanh long", category: "Trái cây", price: 20000 }
    // Add more product data here
  ];

  const customers = [
    { id: 1, label: "Bùi Thế Hiển" },
    { id: 2, label: "Nguyễn Văn A" }
    // Add more customer data here
  ];

  const handleProductSelect = (event, product) => {
    if (product && !selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setQuantity({ ...quantity, [product.id]: 1 });
    }
  };

  const handleCustomerSelect = (event, customer) => {
    setSelectedCustomer(customer);
  };

  const handleQuantityChange = (productId, change) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: Math.max(1, (prevQuantity[productId] || 1) + change)
    }));
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
    setQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      delete newQuantity[productId];
      return newQuantity;
    });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => {
      return sum + (quantity[product.id] || 1) * product.price;
    }, 0);
  };

  const totalAmount = calculateTotal();

  return (
    <PageContainer title="POS" description="Point of Sale Interface">
      <Grid container spacing={2}>
        {/* Left Side: Product Selection */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 2, minHeight: "100%" }}>
            <Autocomplete
              options={products}
              getOptionLabel={(option) => option.name}
              onChange={handleProductSelect}
              renderInput={(params) => <TextField {...params} label="Tìm kiếm sản phẩm" variant="outlined" fullWidth />}
            />
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã SP</TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell>Thể loại</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Tổng tiền</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Typography align="center">Chưa chọn sản phẩm nào</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.code}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price} VND</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <IconButton onClick={() => handleQuantityChange(product.id, -1)}>
                            <Remove />
                          </IconButton>
                          <Typography>{quantity[product.id]}</Typography>
                          <IconButton onClick={() => handleQuantityChange(product.id, 1)}>
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>{quantity[product.id] * product.price} VND</TableCell>
                      <TableCell>
                        <IconButton onClick={() => console.log("Viewing product", product)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveProduct(product.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Right Side: Customer and Payment Details */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, minHeight: "100%" }}>
            <Autocomplete
              options={customers}
              getOptionLabel={(option) => option.label}
              onChange={handleCustomerSelect}
              renderInput={(params) => (
                <TextField {...params} label="Tìm kiếm khách hàng" variant="outlined" fullWidth />
              )}
            />
            {selectedCustomer && (
              <Box mt={2}>
                <Box display="flex" gap={1} my={1}>
                  <Typography sx={{ fontWeight: 500 }}>Tên khách hàng:</Typography>
                  <Typography>{selectedCustomer.label}</Typography>
                </Box>

                <Box display="flex" gap={1} my={1}>
                  <Typography sx={{ fontWeight: 500 }}>Số điện thoại:</Typography>
                  <Typography>0123456789</Typography>
                </Box>

                <Box display="flex" gap={1} my={1}>
                  <Typography sx={{ fontWeight: 500 }}>Địa chỉ: </Typography>
                  <Typography>Hà Nội</Typography>
                </Box>

                <Button variant="outlined" color="primary" size="small" onClick={() => setPaymentAddress("Hà nội")}>
                  Đặt địa chỉ thanh toán
                </Button>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Thanh toán</Typography>
            <Box mt={2}>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500 }}>Tổng số lượng hàng hóa</Typography>
                <Typography>{selectedProducts.length}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500 }}>Tổng tiền hàng</Typography>
                <Typography>{totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500 }}>Thuế VAT (10%)</Typography>
                <Typography>
                  {(totalAmount * 0.1).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500 }}>Khách cần trả</Typography>
                <Typography sx={{ fontWeight: 500, color: "primary.main" }}>
                  {(totalAmount * 1.1).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </Typography>
              </Box>

              <TextField
                label="Địa chỉ nhận hàng"
                type="text"
                variant="outlined"
                fullWidth
                value={paymentAddress}
                onChange={(e) => setPaymentAddress(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField label="Ghi chú" multiline rows={3} variant="outlined" fullWidth sx={{ mt: 2 }} />
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={!selectedCustomer}>
                Thanh toán
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default POSPage;
