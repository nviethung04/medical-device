"use client";
import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SendRequest from "@/utils/SendRequest";
import DashboardCard from "../../components/shared/DashboardCard";
import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { convertDate, formatCurrency } from "@/utils/Main";

const MaintenancePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch dữ liệu từ API
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/maintenances");
      if (res.payload) {
        setData(res.payload);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReload = () => {
    fetchData();
  };

  // Hàm cập nhật trạng thái bảo trì
  const handleMaintenanceUpdate = async (id, currentStatus) => {
    setUpdating(true);
    try {
      const res = await SendRequest("PUT", "/api/maintenances", { id, maintenanced: !currentStatus });
      if (res.payload) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, maintenanced: !currentStatus } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating maintenance status:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Lọc dữ liệu theo trạng thái bảo trì
  const filteredData = data.filter((item) =>
    tabIndex === 0 ? !item.maintenanced : item.maintenanced
  );

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <PageContainer title="Bảo trì" description="Lịch trình bảo trì">
      <DashboardCard
        title="Lịch trình bảo trì"
        action={
          <Button variant="contained" color="primary" onClick={handleReload}>
            Tải lại
          </Button>
        }
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Tabs phân loại */}
            <Tabs
              value={tabIndex}
              onChange={(event, newValue) => {
                setTabIndex(newValue);
                setCurrentPage(1);
              }}
              aria-label="Maintenance Tabs"
            >
              <Tab label="Chưa bảo trì" />
              <Tab label="Đã bảo trì" />
            </Tabs>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Danh mục</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Ngày bảo trì tiếp theo</TableCell>
                        <TableCell>Trạng thái bảo trì</TableCell>
                        <TableCell>Hành động</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            {CATEGORY_LIST.find((category) => category.value === item.category)?.name}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatCurrency(item.price)} VND</TableCell>
                          <TableCell>{convertDate(item.maintenanceDateNext)}</TableCell>
                          <TableCell>
                            {item.maintenanced ? "Đã bảo trì" : "Chưa bảo trì"}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color={item.maintenanced ? "secondary" : "primary"}
                              disabled={updating}
                              onClick={() => handleMaintenanceUpdate(item._id, item.maintenanced)}
                            >
                              {updating ? (
                                <CircularProgress size={20} />
                              ) : item.maintenanced ? "Hủy bảo trì" : "Đánh dấu đã bảo trì"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            {/* Phân trang */}
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default MaintenancePage;
