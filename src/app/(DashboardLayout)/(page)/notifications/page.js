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
  Pagination,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SendRequest from "@/utils/SendRequest";
import DashboardCard from "../../components/shared/DashboardCard";

const NotificationsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch dữ liệu từ API
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/notifications");
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

  // Hàm reload dữ liệu
  const handleReload = () => {
    fetchData();
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <PageContainer title="Thông báo" description="Thông báo quan trọng về bảo trì và tồn kho">
      <DashboardCard
        title="Thông báo"
        action={
          <Button variant="contained" color="primary" onClick={handleReload}>
            
            tải lại
          </Button>
        }
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Loại thông báo</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Chi tiết</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>{item.type === "maintenance" ? "Bảo trì" : "Tồn kho"}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.message}</TableCell>
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

export default NotificationsPage;
