"use client";
import { Box, Grid, Typography, Chip, Divider, Link, CircularProgress, Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import SendRequest from "@/utils/SendRequest";
import { useRouter } from "next/navigation";
import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { ROLE_MANAGER_TEXT } from "@/app/constants/RoleManager";
import { formatCurrency } from "@/utils/Main";

const ViewProduct = ({ params }) => {
  const { productId } = params;

  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await SendRequest("GET", `/api/products/${productId}`);
        if (res.payload) {
          setProduct(res.payload);
        }else{
        window.location.href = "/404";

        }
      } catch (error) {
        // redirect to 404 page
        window.location.href = "/404";
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const navigateToEdit = () => {
    router.push(`/products/${productId}/edit`);
  };

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer title={product.name || "Xem sản phẩm"} description="Quản lý sản phẩm">
      <DashboardCard
        title="Chi tiết sản phẩm"
        action={
          <Button variant="contained" color="primary" onClick={navigateToEdit}>
            Chỉnh sửa
          </Button>
        }
      >
        <Grid container spacing={2}>
          {/* Product Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Thông tin cơ bản
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Tên sản phẩm</Typography>
            <Typography>{product.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Danh mục
            </Typography>
            <Typography>
              {CATEGORY_LIST.find((category) => category.value === product.category)?.name || "Không xác định"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Giá sản phẩm
            </Typography>
            <Typography>{formatCurrency(product.price)} VNĐ</Typography>
          </Grid>

          {/* Stock Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thông tin kho
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Hạn sử dụng
            </Typography>
            <Typography>{product.stock.expiry} ngày</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Chứng chỉ
            </Typography>
            <Typography>{product.stock.certificates.join(", ")}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Tổng số lượng
            </Typography>
            <Typography>{product.stock.total}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Có sẵn
            </Typography>
            <Typography>{product.stock.available}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Đã sử dụng
            </Typography>
            <Typography>{product.stock.used}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Bảo trì
            </Typography>
            <Typography>{product.stock.maintenance}</Typography>
          </Grid>

          {/* Hardware Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thông tin phần cứng
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Mã sản phẩm
            </Typography>
            <Typography>{product.hardware.model}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Số Serial
            </Typography>
            <Typography>{product.hardware.serial_number}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Chi tiết phần cứng
            </Typography>
            <Typography>{product.hardware.details}</Typography>
          </Grid>

          {/* Software Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thông tin phần mềm
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Phiên bản
            </Typography>
            <Typography>{product.software.version}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Ngày cập nhật
            </Typography>
            <Typography>{product.software.update_date}</Typography>
          </Grid>

          {/* Documentation and Notes */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "600" }}>
              Tài liệu và Ghi chú
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Tài liệu hướng dẫn
            </Typography>
            <Typography style={{ whiteSpace: "pre-wrap" }}>{product.user_manual}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Ghi chú
            </Typography>
            <Typography style={{ whiteSpace: "pre-wrap" }}>{product.notes || "Không có ghi chú"}</Typography>
          </Grid>

          {/* Status and Dates */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Trạng thái và Thời gian
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Ngày tạo
            </Typography>
            <Typography>{new Date(product.created_at).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Ngày cập nhật
            </Typography>
            <Typography>{new Date(product.updated_at).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Trạng thái
            </Typography>
            <Chip
              label={product.status === 1 ? "Active" : "Inactive"}
              color={product.status === 1 ? "success" : "default"}
              variant="outlined"
            />
          </Grid>

          {/* User Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thông tin người dùng
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Người thêm
            </Typography>
            <Typography>
              Họ Tên: {`${product._user_added.profile.firstName} ${product._user_added.profile.lastName}`}
            </Typography>

            <Typography>Email: {product._user_added.email}</Typography>
            <Typography>Vai trò: {ROLE_MANAGER_TEXT[product._user_added.role] || "Không xác định"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
              Người cập nhật
            </Typography>
            <Typography>
              Họ Tên: {`${product._user_updated.profile.firstName} ${product._user_updated.profile.lastName}`}
            </Typography>

            <Typography>Email: {product._user_updated.email}</Typography>
            <Typography>Vai trò: {ROLE_MANAGER_TEXT[product._user_updated.role] || "Không xác định"}</Typography>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default ViewProduct;
