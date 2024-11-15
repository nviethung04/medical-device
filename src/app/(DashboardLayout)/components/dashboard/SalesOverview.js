import React, { useEffect, useState } from "react";
import { Select, MenuItem, CircularProgress, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import SendRequest from "@/utils/SendRequest";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  const [month, setMonth] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

// Hàm gọi API để lấy dữ liệu giao dịch
    useEffect(() => {
        // get current month
        const currentMonth = new Date().getMonth() + 1;
        setMonth(currentMonth);
    }, []);

  // Hàm gọi API để lấy dữ liệu giao dịch
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/transactions");
      if (res.payload) {
        setData(res.payload);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý dữ liệu giao dịch cho biểu đồ
  const processData = () => {
    const filteredData = data.filter((item) => {
      const transactionMonth = new Date(item.created_at).getMonth() + 1;
      return transactionMonth === month;
    });

    const categories = filteredData.map((item) =>
      new Date(item.created_at).toLocaleDateString("vi-VN")
    );

    const importData = filteredData
      .filter((item) => item.type === "import")
      .map((item) => item.totalPrice);

    const exportData = filteredData
      .filter((item) => item.type === "export")
      .map((item) => item.totalPrice);

    setCategories(categories);
    setSeries([
      { name: "Nhập hàng", data: importData },
      { name: "Xuất hàng", data: exportData },
    ]);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (data.length) {
      processData();
    }
  }, [data, month]);

  // Cấu hình biểu đồ
  const optionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: { show: true },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
      },
    },
    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  return (
    <DashboardCard
      title="Tổng quan giao dịch"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={(e) => setMonth(e.target.value)}
        >
          <MenuItem value={1}>Tháng 1</MenuItem>
          <MenuItem value={2}>Tháng 2</MenuItem>
          <MenuItem value={3}>Tháng 3</MenuItem>
          <MenuItem value={4}>Tháng 4</MenuItem>
          <MenuItem value={5}>Tháng 5</MenuItem>
          <MenuItem value={6}>Tháng 6</MenuItem>
          <MenuItem value={7}>Tháng 7</MenuItem>
          <MenuItem value={8}>Tháng 8</MenuItem>
          <MenuItem value={9}>Tháng 9</MenuItem>
          <MenuItem value={10}>Tháng 10</MenuItem>
          <MenuItem value={11}>Tháng 11</MenuItem>
          <MenuItem value={12}>Tháng 12</MenuItem>
        </Select>
      }
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="370px">
          <CircularProgress />
        </Box>
      ) : (
        <Chart
          options={optionscolumnchart}
          series={series}
          type="bar"
          height={370}
          width={"100%"}
        />
      )}
    </DashboardCard>
  );
};

export default SalesOverview;
