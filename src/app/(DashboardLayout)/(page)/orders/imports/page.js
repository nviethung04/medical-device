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
import { Add, Remove, Delete } from "@mui/icons-material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SendRequest from "@/utils/SendRequest";
import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { formatCurrency } from "@/utils/Main";

const StockInPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [price, setPrice] = useState({});
  const [importAddress, setImportAddress] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openDoneModal, setOpenDoneModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const fetchSuppliers = async () => {
    try {
      const res = await SendRequest("GET", "/api/customers");
      if (res.payload) {
        setSuppliers(res.payload);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const handleProductSelect = (event, product) => {
    if (product && !selectedProducts.some((p) => p._id === product._id)) {
      setSelectedProducts([...selectedProducts, product]);
      setQuantity({ ...quantity, [product._id]: 1 });
      setPrice({ ...price, [product._id]: product.price });
      setTimeout(() => setInputValue(""), 100);
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: Math.max(1, (prevQuantity[productId] || 1) + change)
    }));
  };

  const handlePriceChange = (productId, newPrice) => {
    setPrice((prevPrice) => ({
      ...prevPrice,
      [productId]: newPrice
    }));
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
    setQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      delete newQuantity[productId];
      return newQuantity;
    });
    setPrice((prevPrice) => {
      const newPrice = { ...prevPrice };
      delete newPrice[productId];
      return newPrice;
    });
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => {
      return sum + (quantity[product._id] || 1) * (price[product._id] || product.price);
    }, 0);
  };

  const totalAmount = calculateTotal();

  const handleStockIn = () => {
    setOpenConfirmModal(true); // Open the confirmation modal
  };

  const confirmStockIn = async () => {
    const products = selectedProducts.map((product) => ({
      product: product._id,
      quantity: quantity[product._id],
      price: price[product._id]
    }));

    const payload = {
      supplier: selectedSupplier._id,
      products,
      address: importAddress
    };

    console.log("Stock-In Payload:", payload);

    setOpenConfirmModal(false); // Close the modal after confirming stock-in
    setSelectedProducts([]);
    setQuantity({});
    setPrice({});
    setOpenDoneModal(true); // Open the success modal
  };

  const resetStockIn = () => {
    setOpenDoneModal(false);
  };

  return (
    <PageContainer title="Nhập Hàng" description="Giao diện nhập hàng vào kho">
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
                    <TableCell>Giá nhập</TableCell>
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
                      <TableCell>
                        <TextField
                          variant="outlined"
                          type="number"
                          size="small"
                          value={price[product._id]}
                          onChange={(e) => handlePriceChange(product._id, parseFloat(e.target.value) || 0)}
                          fullWidth
                        />
                      </TableCell>
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
                      <TableCell>{formatCurrency(quantity[product._id] * price[product._id])} VND</TableCell>
                      <TableCell>
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

        {/* Right Side: Supplier and Stock-In Details */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, minHeight: "100%" }}>
            <Autocomplete
              options={suppliers}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setSelectedSupplier(newValue);
                setImportAddress(newValue?.address);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn đơn vị cung cấp" variant="outlined" fullWidth />
              )}
            />
            {/* Đơn vị cung cấp */}
            {selectedSupplier && (
              <Box mt={2}>
                <Typography variant="h6">Thông tin khách hàng</Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Typography sx={{ fontWeight: 500 }}>Tên:</Typography>
                  <Typography>{selectedSupplier.name}</Typography>
                </Box>
                <Box display="flex" gap={1} mt={1}>
                  <Typography sx={{ fontWeight: 500 }}>SDT:</Typography>
                  <Typography>{selectedSupplier.contact_info?.phone}</Typography>
                </Box>
                <Box display="flex" gap={1} mt={1} mb={1}>
                  <Typography sx={{ fontWeight: 500 }}>Địa chỉ:</Typography>
                  <Typography>{selectedSupplier.address}</Typography>
                </Box>
              </Box>
            )}

            <Box mt={2}>
              <Typography variant="h6">Thông tin nhập hàng</Typography>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500 }}>Tổng số sản phẩm</Typography>
                <Typography>{selectedProducts.length}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography sx={{ fontWeight: 500 }}>Tổng giá trị hàng nhập</Typography>
                <Typography>{totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <TextField
                label="Địa chỉ nhập hàng"
                type="text"
                variant="outlined"
                fullWidth
                value={importAddress}
                onChange={(e) => setImportAddress(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField label="Ghi chú" multiline rows={3} variant="outlined" fullWidth sx={{ mt: 2 }} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!selectedSupplier || selectedProducts.length === 0 || importAddress === ""}
                onClick={handleStockIn}
              >
                Xác nhận nhập hàng
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Modal */}
      <Dialog open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
        <DialogTitle>Xác nhận nhập hàng</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn nhập hàng với tổng giá trị là{" "}
            {totalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmModal(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={confirmStockIn} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={openDoneModal} onClose={resetStockIn}>
        <DialogTitle>Nhập hàng thành công</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hàng hóa đã được lên hệ thống thành công. Bạn có thể kiểm tra lại thông tin trong kho hàng của mình.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetStockIn} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default StockInPage;
