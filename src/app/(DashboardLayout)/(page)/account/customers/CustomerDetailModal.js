import { Modal, Box, Typography, Chip, Button, Divider } from "@mui/material";

const CustomerDetailModal = ({ open, user, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
        overflow: "auto",
        maxHeight: "90vh"
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
          <strong>Ngày tạo:</strong> {new Date(user.created_at).toLocaleDateString()}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Purchase History Section */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Lịch sử mua hàng
      </Typography>
      {user.purchase_history.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Không có lịch sử mua hàng
        </Typography>
      ) : (
        user.purchase_history.map((purchase, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 2,
              bgcolor: "#f1f5f9",
              borderRadius: 2,
              border: "1px solid #e0e0e0"
            }}
          >
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Ngày mua:</strong> {new Date(purchase.purchase_date).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Số lượng:</strong> {purchase.quantity}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Giá:</strong> {purchase.price.toLocaleString()} VND
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Ngày hết hạn bảo hành:</strong> {new Date(purchase.warranty_end_date).toLocaleDateString()}
            </Typography>

            {/* Maintenance Schedule */}
            <Typography variant="subtitle2" fontWeight="bold" mt={2}>
              Lịch bảo trì
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {purchase.maintenance_schedule.map((maintenance, index) => (
                <Chip
                  key={index}
                  label={`${maintenance.maintenance_date} - ${maintenance.status}`}
                  color={maintenance.status === "Đã hoàn thành" ? "success" : "default"}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        ))
      )}

      <Divider sx={{ mt: 2, mb: 3 }} />

      {/* Close Button */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ minWidth: 120 }}>
          Đóng
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default CustomerDetailModal;
