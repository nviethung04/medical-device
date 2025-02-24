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
import { IconEye } from "@tabler/icons-react";
import { IconReload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { formatCurrency } from "@/utils/Main";
import Checkbox from "@mui/material/Checkbox";


const ProductPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/products");
      if (res.payload) {
        setProducts(res.payload);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToCreate = () => {
    router.push("/products/create");
  };


  const navigateToView = (productId) => {
    router.push(`/products/${productId}`);
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
       ? prevSelected.filter((productId) => productId !== id)
       : [...prevSelected, id]
   );
  };

  const handleDeleteSelected = async () => {
      await deleteProductsAPI(selectedProducts); // Gọi API để xóa sản phẩm
      setSelectedProducts([]);
      fetchProducts()   
  };

  const deleteProductsAPI = async (productIds) => {   
      await SendRequest("DELETE", "/api/products", {
        productIds, // Gửi danh sách ID cần xóa
      });
  };
  

  return (
    <PageContainer title="Quản lý sản phẩm" description="Quản lý sản phẩm">
      <DashboardCard
  title="Quản lý sản phẩm"
  action={
    <div style={{ display: "flex", gap: "10px" }}>
      <Button variant="contained" color="primary" onClick={navigateToCreate}>
        Thêm sản phẩm
      </Button>
      <Button variant="contained" color="primary" onClick={handleDeleteSelected}>
        Xóa sản phẩm
      </Button>
    </div>
  }
>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            label="Tìm kiếm sản phẩm"
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

          <Box sx={{ marginLeft: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button variant="contained" color="primary" onClick={fetchProducts}>
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
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center">Mã sản phẩm</TableCell>
                  <TableCell align="center">Tên sản phẩm</TableCell>
                  <TableCell align="center">Danh mục</TableCell>
                  <TableCell align="center">Giá</TableCell>
                  <TableCell align="center">Tổng kho</TableCell>
                  <TableCell align="center">Hạn sử dụng</TableCell>
                  <TableCell align="center">Ngày cập nhật</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                  <TableRow key={product._id}>
                    <TableCell align="center">
                    <Checkbox
                        checked={selectedProducts.includes(product._id)}
                        onChange={() => handleSelectProduct(product._id)}
                       />
                    </TableCell>
                    <TableCell align="center">{product.hardware.serial_number}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">
                      {CATEGORY_LIST.find((category) => category.value === product.category)?.name}
                    </TableCell>
                    <TableCell align="center">{formatCurrency(product.price)} VNĐ</TableCell>
                    <TableCell align="center">{product.stock.available}</TableCell>
                    <TableCell align="center">{product.stock.expiry} Ngày</TableCell>
                    <TableCell align="center">{new Date(product.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={product.status === 1 ? "Active" : "Inactive"}
                        color={product.status === 1 ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconEye onClick={() => navigateToView(product._id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredProducts.length}
              page={page}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default ProductPage;
