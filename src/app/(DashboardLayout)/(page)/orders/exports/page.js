"use client";
import { useEffect, useState } from "react";
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { Add, Remove, Delete, Visibility } from "@mui/icons-material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SendRequest from "@/utils/SendRequest";
import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { formatCurrency } from "@/utils/Main";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingFullScreen from "@/app/(DashboardLayout)/components/Loading/LoadingFullScreen";
import CreateUserModal from "../../account/users/CreateUserModal";
import CustomerCreateModal from "../../account/customers/CustomerCreateModal";

const POSPage = () => {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentAddress, setPaymentAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [freeTax, setFreeTax] = useState(false);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [openDoneModal, setOpenDoneModal] = useState(false);

  const [created, setCreated] = useState({});
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [note, setNote] = useState("");

  const [openCreateUser, setOpenCreateUser] = useState(false)

  const fetchProducts = async () => {
    try {
      const res = await SendRequest("GET", "/api/products");
      if (res.payload) {
        setProducts(res.payload);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await SendRequest("GET", "/api/customers");
      if (res.payload) {
        setCustomers(res.payload);
      }
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu khách hàng");
    }
  };

  const onCloseModalCreateUser = () => {
    setOpenCreateUser(false);
    fetchCustomers()
  }

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
  }, []);

  const handleProductSelect = (event, product) => {
    if (product && !selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, product]);
      setQuantity({ ...quantity, [product._id]: 1 });
      setTimeout(() => setInputValue(""), 100);
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
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
    setQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      delete newQuantity[productId];
      return newQuantity;
    });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => {
      return sum + (quantity[product._id] || 1) * product.price;
    }, 0);
  };

  const totalAmount = calculateTotal();

  const handleViewProduct = (productId) => {
    // Navigate to product detail page

    window.open(`/products/${productId}`, "_blank");
  };

  const handlePayment = () => {
    setOpenConfirmModal(true); // Open the confirmation modal
  };

  const confirmPayment = async () => {
    const products = selectedProducts.map((product) => ({
      product: product._id,
      quantity: quantity[product._id],
      price: product.price
    }));

    const payload = {
      supplier: selectedCustomer._id,
      products,
      freeTax,
      address: paymentAddress,
      note: note
    };
    setLoading(true);
    setOpenConfirmModal(false); // Close the modal after confirming payment

    let res = await SendRequest("POST", "/api/transactions/exports", payload);

    if (res.payload) {
      setCreated(res.payload);
    } else {
      toast.error("Lên đơn hàng thất bại");
    }

    setLoading(false);

    setSelectedProducts([]);
    setQuantity({});
    setSelectedCustomer(null);
    setPaymentAddress("");
    setFreeTax(false);

    setOpenDoneModal(true); // Open the success modal
  };

  const resetPayment = () => {
    setOpenDoneModal(false);
  };

  const viewProduct = () => {
    if (created.insertedId) {
      router.push(`/orders/${created.insertedId}`);
    }
  };

  return (
    <PageContainer title="POS" description="Point of Sale Interface">
      {loading && <LoadingFullScreen />}
      <Grid container spacing={2} mb={2}>
        {/* name page */}
        <Grid item xs={12}>
          <Typography variant="h4">Xuất hàng</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {/* Left Side: Product Selection */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 2, minHeight: "100%" }}>
            <Autocomplete
              options={products}
              getOptionLabel={(option) => option.name}
              onChange={handleProductSelect}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => <TextField {...params} label="Tìm kiếm sản phẩm" variant="outlined" fullWidth />}
              renderOption={(props, option) => (
                <Box {...props} borderBottom={"1px solid #ccc"}>
                  <Box display={"flex"} flexDirection="column">
                    <Box display={"flex"} gap={1} justifyContent={"start"}>
                      <Typography variant="caption">
                        {CATEGORY_LIST.find((category) => category.value === option.category)?.name}
                      </Typography>
                    </Box>
                    <Box display={"flex"} gap={1} justifyContent={"start"}>
                      <Typography sx={{ fontWeight: 500 }}>Tên sản phẩm:</Typography>
                      <Typography>{option.name}</Typography>
                    </Box>
                    <Box display={"flex"} gap={1} justifyContent={"start"}>
                      <Typography sx={{ fontWeight: 500 }}>Giá:</Typography>
                      <Typography>{formatCurrency(option?.price)} VND</Typography>
                    </Box>
                    <Box display={"flex"} gap={1} justifyContent={"start"}>
                      <Typography sx={{ fontWeight: 500 }}>Số lượng còn lại:</Typography>
                      <Typography>{option?.stock?.total}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            />
            <TableContainer sx={{ mt: 2 }}>
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
                    <TableRow key={product._id}>
                      <TableCell>{product.hardware?.serial_number || "N/A"}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {CATEGORY_LIST.find((category) => category.value === product.category)?.name}
                      </TableCell>
                      <TableCell>{formatCurrency(product.price)} VND</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <IconButton onClick={() => handleQuantityChange(product._id, -1)}>
                            <Remove />
                          </IconButton>
                          <Typography>{quantity[product._id]}</Typography>
                          <IconButton onClick={() => handleQuantityChange(product._id, 1)}>
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>{formatCurrency(quantity[product._id] * product.price)} VND</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewProduct(product._id)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveProduct(product._id)}>
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
              getOptionLabel={(option) => option.name}
              onChange={handleCustomerSelect}
              renderInput={(params) => (
                <TextField {...params} label="Tìm kiếm khách hàng" variant="outlined" fullWidth />
              )}
              renderOption={(props, option) => (
                <Box {...props} borderBottom={"1px solid #ccc"}>
                  <Box display={"flex"} flexDirection="column">
                    <Box display={"flex"} gap={1} justifyContent={"start"}>
                      <Typography sx={{ fontWeight: 500 }}>Tên:</Typography>
                      <Typography>{option.name}</Typography>
                    </Box>
                    <Box display={"flex"} gap={1} justifyContent={"start"}>
                      <Typography sx={{ fontWeight: 500 }}>SDT:</Typography>
                      <Typography>{option.contact_info?.phone}</Typography>
                    </Box>
                    <Box display={"flex"} gap={1} justifyContent={"start"}>
                      <Typography sx={{ fontWeight: 500 }}>Địa chỉ:</Typography>
                      <Typography>{option.address}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            />
          <Button variant="contained" color="primary" onClick={()=>setOpenCreateUser(true)}>
            Thêm khách hàng
          </Button>
            {selectedCustomer && (
              <Box mt={2}>
                <Typography variant="h6">Thông tin khách hàng</Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Typography sx={{ fontWeight: 500 }}>Tên:</Typography>
                  <Typography>{selectedCustomer.name}</Typography>
                </Box>
                <Box display="flex" gap={1} mt={1}>
                  <Typography sx={{ fontWeight: 500 }}>SDT:</Typography>
                  <Typography>{selectedCustomer.contact_info?.phone}</Typography>
                </Box>
                <Box display="flex" gap={1} mt={1} mb={1}>
                  <Typography sx={{ fontWeight: 500 }}>Địa chỉ:</Typography>
                  <Typography>{selectedCustomer.address}</Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => setPaymentAddress(selectedCustomer.address)}
                >
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
                <Typography sx={{ fontWeight: 500 }}>Miễn thuế</Typography>
                {/* switch */}
                <input
                  type="checkbox"
                  checked={freeTax}
                  onChange={(e) => setFreeTax(e.target.checked)}
                  style={{ width: "16px", height: "16px" }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500, textDecoration: freeTax ? "line-through" : "none" }}>
                  Thuế VAT (10%)
                </Typography>
                <Typography sx={{ textDecoration: freeTax ? "line-through" : "none" }}>
                  {(totalAmount * 0.1).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500 }}>Khách cần trả</Typography>
                <Typography sx={{ fontWeight: 500, color: "primary.main" }}>
                  {(totalAmount * (freeTax ? 1 : 1.1)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
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
              <TextField
                label="Ghi chú"
                multiline
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!selectedCustomer || selectedProducts.length === 0 || paymentAddress === ""}
                onClick={() => handlePayment()}
              >
                Thanh toán
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Confirmation Modal */}
      <Dialog open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <DialogTitle>Xác nhận thanh toán</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn thực hiện thanh toán với tổng số tiền là{" "}
            {totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmModal(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={confirmPayment} color="primary" loading={loading}>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={openDoneModal} onClose={() => resetPayment()}>
        <DialogTitle>Thanh toán thành công</DialogTitle>
        <DialogContent>
          <DialogContentText>Thanh toán đã được thực hiện thành công!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => resetPayment()} color="secondary">
            Đóng
          </Button>

          <Button onClick={() => viewProduct()} color="primary">
            Xem đơn hàng
          </Button>
        </DialogActions>
      </Dialog>

      <CustomerCreateModal 
      open = {openCreateUser}
      onClose = {()=>onCloseModalCreateUser()}
      />
    </PageContainer>
  );
};

export default POSPage;
