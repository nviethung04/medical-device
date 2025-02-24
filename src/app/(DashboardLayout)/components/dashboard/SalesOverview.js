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

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    setMonth(currentMonth);
  }, []);

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
      show: true,
      position: "top",
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
      enabled: false,
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
          {[...Array(12)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              Tháng {i + 1}
            </MenuItem>
          ))}
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