"use client";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  Divider,
  CircularProgress,
  TextareaAutosize
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import SendRequest from "@/utils/SendRequest";
import { useRouter } from "next/navigation";
import { CATEGORY_LIST, PRODUCT_STATUS } from "@/app/constants/ProductConstants";
import LoadingFullScreen from "@/app/(DashboardLayout)/components/Loading/LoadingFullScreen";
import toast from "react-hot-toast";

const EditProduct = ({ params }) => {
  const { productId } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: { expiry: "", certificates: [] },
    hardware: { details: "", model: "", serial_number: "" },
    software: { version: "", update_date: "" },
    user_manual: "",
    notes: "",
    status: 1
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await SendRequest("GET", `/api/products/${productId}`);
        if (res.payload) {
          setProduct(res.payload);
          setFormData({
            name: res.payload.name,
            category: res.payload.category,
            price: res.payload?.price || 0,
            stock: {
              expiry: res.payload.stock.expiry,
              certificates: res.payload.stock.certificates
            },
            hardware: {
              details: res.payload.hardware.details,
              model: res.payload.hardware.model,
              serial_number: res.payload.hardware.serial_number
            },
            software: {
              version: res.payload.software.version,
              update_date: res.payload.software.update_date
            },
            user_manual: res.payload.user_manual,
            notes: res.payload.notes,
            status: res.payload.status
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) formErrors.name = "Tên sản phẩm không được để trống";
    if (!formData.category) formErrors.category = "Danh mục không được để trống";
    if (!formData.price) formErrors.price = "Giá không được để trống";
    if (!formData.stock.expiry) formErrors.expiry = "Hạn sử dụng không được để trống";
    if (!formData.stock.certificates.length) formErrors.certificates = "Chứng chỉ không được để trống";
    if (!formData.hardware.model) formErrors.model = "Mã sản phẩm không được để trống";
    if (!formData.hardware.serial_number) formErrors.serial_number = "Số Serial không được để trống";
    if (!formData.hardware.details) formErrors.details = "Chi tiết phần cứng không được để trống";
    if (!formData.software.version) formErrors.version = "Phiên bản phần mềm không được để trống";
    if (!formData.software.update_date) formErrors.update_date = "Ngày cập nhật không được để trống";
    if (!formData.user_manual) formErrors.user_manual = "Link tài liệu hướng dẫn không được để trống";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const res = await SendRequest("PUT", `/api/products`, {
          ...formData,
          id: productId
        });
        if (res.payload) {
          toast.success("Cập nhật sản phẩm thành công");
          router.push(`/products/${productId}`);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer title="Chỉnh sửa sản phẩm" description="Quản lý sản phẩm">
      <DashboardCard title="Chỉnh sửa chi tiết sản phẩm">
        {loading && <LoadingFullScreen />}
        <Grid container spacing={2}>
          {/* Product Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Thông tin cơ bản
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tên sản phẩm"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Danh mục"
              name="category"
              fullWidth
              variant="outlined"
              value={formData.category}
              onChange={handleInputChange}
              error={!!errors.category}
              helperText={errors.category}
            >
              {CATEGORY_LIST.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* giá có thể đổi */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Giá (VND)"
              fullWidth
              variant="outlined"
              value={formData.price}
              onChange={handleInputChange}
              name="price"
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>

          {/* Stock Information (Editable Fields Only) */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thông tin kho
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hạn sử dụng (ngày)"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.stock.expiry}
              onChange={(e) => handleNestedInputChange("stock", "expiry", e.target.value)}
              error={!!errors.expiry}
              helperText={errors.expiry}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Chứng chỉ"
              fullWidth
              variant="outlined"
              value={formData.stock.certificates.join(", ")}
              onChange={(e) =>
                handleNestedInputChange(
                  "stock",
                  "certificates",
                  e.target.value.split(",").map((cert) => cert.trim())
                )
              }
              error={!!errors.certificates}
              helperText={errors.certificates}
            />
          </Grid>

          {/* Hardware Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thông tin phần cứng
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mã sản phẩm"
              fullWidth
              variant="outlined"
              value={formData.hardware.model}
              onChange={(e) => handleNestedInputChange("hardware", "model", e.target.value)}
              error={!!errors.model}
              helperText={errors.model}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Số Serial"
              fullWidth
              variant="outlined"
              value={formData.hardware.serial_number}
              onChange={(e) => handleNestedInputChange("hardware", "serial_number", e.target.value)}
              error={!!errors.serial_number}
              helperText={errors.serial_number}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Chi tiết phần cứng"
              fullWidth
              variant="outlined"
              value={formData.hardware.details}
              onChange={(e) => handleNestedInputChange("hardware", "details", e.target.value)}
              error={!!errors.details}
              helperText={errors.details}
            />
          </Grid>

          {/* Software Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Thông tin phần mềm
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phiên bản phần mềm"
              fullWidth
              variant="outlined"
              value={formData.software.version}
              onChange={(e) => handleNestedInputChange("software", "version", e.target.value)}
              error={!!errors.version}
              helperText={errors.version}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ngày cập nhật"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={formData.software.update_date}
              onChange={(e) => handleNestedInputChange("software", "update_date", e.target.value)}
              error={!!errors.update_date}
              helperText={errors.update_date}
            />
          </Grid>

          {/* Documentation and Notes */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Tài liệu và Ghi chú
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
              label="Link tài liệu hướng dẫn"
              fullWidth
              variant="outlined"
              value={formData.user_manual}
              onChange={handleInputChange}
              name="user_manual"
              error={!!errors.user_manual}
              helperText={errors.user_manual}
            /> */}
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Tài liệu hướng dẫn
            </Typography>
            <TextareaAutosize
              minRows={3}
              style={{ width: "100%", padding: "8px", fontSize: "16px", resize: "vertical" }}
              value={formData.user_manual}
              onChange={handleInputChange}
              name="user_manual"
              error={!!errors.user_manual}
              helperText={errors.user_manual}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Ghi chú
            </Typography>

            <TextareaAutosize
              minRows={3}
              style={{ width: "100%", padding: "8px", fontSize: "16px", resize: "vertical" }}
              value={formData.notes}
              onChange={handleInputChange}
              name="notes"
            />
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Trạng thái
            </Typography>
            <TextField
              select
              label="Trạng thái"
              fullWidth
              variant="outlined"
              value={formData.status}
              onChange={handleInputChange}
              name="status"
            >
              <MenuItem value={1}>{PRODUCT_STATUS[1]}</MenuItem>
              <MenuItem value={2}>{PRODUCT_STATUS[2]}</MenuItem>
              <MenuItem value={3}>{PRODUCT_STATUS[3]}</MenuItem>
            </TextField>
          </Grid>

          {/* Save Button */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Lưu thay đổi
            </Button>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};

export default EditProduct;
