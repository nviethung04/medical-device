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
  Box
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import SendRequest from "@/utils/SendRequest";
import { IconEye } from "@tabler/icons-react";
import { IconReload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@/app/constants/ProductConstants";
import { formatCurrency } from "@/utils/Main";

const OrderPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Fetch orders từ API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/transactions");
      if (res.payload) {
        setOrders(res.payload);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
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

  const handleFilterChange = (type) => {
    setFilterType(type);
    setPage(0);
  };

  // Lọc đơn hàng theo loại và tìm kiếm
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.supplier?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" ||
      (filterType === "import" && order.type === "import") || // 1 = Nhập hàng
      (filterType === "export" && order.type === "export"); // 2 = Xuất hàng

    return matchesSearch && matchesType;
  });

  const navigateToCreate = () => {
    router.push("/orders/exports");
  };

  const navigateToImport = () => {
    router.push("/orders/imports");
  };

  const navigateToView = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <PageContainer title="Quản lý đơn hàng" description="Quản lý đơn hàng">
      <DashboardCard
        title="Quản lý đơn hàng"
        action={
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button variant="contained" color="primary" onClick={navigateToImport} style={{ marginRight: "10px" }}>
              Nhập hàng
            </Button>
            <Button variant="contained" color="primary" onClick={navigateToCreate}>
              Xuất hàng
            </Button>
          </Box>
        }
      >
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          {/* Nút lọc loại đơn hàng */}
          <Box sx={{ marginRight: 2, display: "flex", alignItems: "center" }}>
            <Button
              variant={filterType === "all" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleFilterChange("all")}
              sx={{ whiteSpace: "nowrap" }}
            >
              Tất cả
            </Button>
            <Button
              variant={filterType === "import" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleFilterChange("import")}
              sx={{ marginLeft: "10px", whiteSpace: "nowrap" }}
            >
              Nhập hàng
            </Button>
            <Button
              variant={filterType === "export" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleFilterChange("export")}
              sx={{ marginLeft: "10px", whiteSpace: "nowrap" }}
            >
              Xuất hàng
            </Button>
          </Box>

          {/* Ô tìm kiếm */}
          <TextField
            label="Tìm kiếm khách hàng"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            size="small"
            onChange={handleSearchChange}
            style={{ margin: 0 }}
          />

          {/* Nút reload */}
          <Box sx={{ marginLeft: 2, display: "flex", alignItems: "center" }}>
            <Button variant="contained" color="primary" onClick={fetchOrders}>
              <IconReload />
            </Button>
          </Box>
        </Box>

        {/* Bảng dữ liệu */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Thể loại</TableCell>
                  <TableCell align="center">Ngày đặt đơn</TableCell>
                  <TableCell align="center">Số lượng đơn</TableCell>
                  <TableCell align="center">Tổng giá tiền</TableCell>
                  <TableCell align="center">Khách hàng</TableCell>
                  <TableCell align="center">Người thực hiện</TableCell>
                  <TableCell align="center">Trạng thái</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                  <TableRow key={order._id}>
                    <TableCell align="center">{TRANSACTION_TYPE[order.type]}</TableCell>
                    <TableCell align="center">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{order.total_product} Đơn</TableCell>
                    <TableCell align="center">{formatCurrency(order.totalPrice)} VNĐ</TableCell>
                    <TableCell align="center">{order.supplier?.name}</TableCell>
                    <TableCell align="center">{order.user?.name}</TableCell>
                    <TableCell align="center">{TRANSACTION_STATUS[order.status]}</TableCell>
                    <TableCell align="center">
                      <IconEye onClick={() => navigateToView(order._id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredOrders.length}
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

export default OrderPage;
