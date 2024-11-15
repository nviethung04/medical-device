import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar, CircularProgress, Box } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import SendRequest from "@/utils/SendRequest";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProductTotal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [available, setAvailable] = useState(0);
  const [used, setUsed] = useState(0);
  const [series, setSeries] = useState([]);

  // Lấy màu sắc từ theme
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = "#ecf2ff";
  const successlight = theme.palette.success.light;

  // Hàm lấy dữ liệu từ API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/products");
      if (res.payload) {
        setData(res.payload);
        processProductData(res.payload);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý dữ liệu sản phẩm cho biểu đồ
  const processProductData = (products) => {
    const totalProducts = products.reduce((acc, product) => acc + product.stock.total, 0);
    const availableProducts = products.reduce((acc, product) => acc + product.stock.available, 0);
    const usedProducts = products.reduce((acc, product) => acc + product.stock.used, 0);

    setTotal(totalProducts);
    setAvailable(availableProducts);
    setUsed(usedProducts);

    // Cập nhật dữ liệu cho biểu đồ
    setSeries([availableProducts, usedProducts, totalProducts - availableProducts - usedProducts]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Cấu hình biểu đồ
  const optionscolumnchart = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: false },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
  };

  return (
    <DashboardCard title="Tổng quan sản phẩm">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={150}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Thông tin sản phẩm */}
          <Grid item xs={7} sm={7}>
            <Typography variant="h3" fontWeight="700">
              Tổng số: {total}
            </Typography>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <IconArrowUpLeft width={20} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                {Math.round((available / total) * 100)}%
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                sản phẩm có sẵn
              </Typography>
            </Stack>
            <Stack spacing={3} mt={5} direction="row">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 9, height: 9, bgcolor: primary }}></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  Kho
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 9, height: 9, bgcolor: primarylight }}></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  Đã xuất
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          {/* Biểu đồ tổng quan */}
          <Grid item xs={5} sm={5}>
            <Chart
              options={optionscolumnchart}
              series={series}
              type="donut"
              height={150}
              width={"100%"}
            />
          </Grid>
        </Grid>
      )}
    </DashboardCard>
  );
};

export default ProductTotal;
