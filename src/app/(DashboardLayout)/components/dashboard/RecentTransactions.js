import { useEffect, useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Link, Typography, Box, CircularProgress } from "@mui/material";
import SendRequest from "@/utils/SendRequest";
import { convertDate } from "@/utils/Main";

const RecentNotifies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch dữ liệu từ API
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await SendRequest("GET", "/api/notifications");
      if (res.payload) {
        let _data = res.payload;
        // lấy 10 thông báo gần đây
        _data = _data.slice(0, 5);
        setData(_data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DashboardCard title="Thông báo gần đây">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: "-40px",
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {data.map((item) => (
            <TimelineItem key={item.productId}>
              <TimelineOppositeContent>
                {item.maintenanceDateNext ?

                  convertDate(item.maintenanceDateNext) :
                  "Cảnh báo"}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={
                    item.type === "maintenance"
                      ? "primary"
                      : item.type === "low_stock"
                        ? "warning"
                        : "success"
                  }
                  variant="outlined"
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight="600">{item.message}</Typography>
                {item?.transaction_id ? (
                  <Link href={`/orders/${item.transaction_id}`} underline="none">
                    Xem đơn hàng
                  </Link>
                ) : (
                  <Link href={`/products/${item.productId}`} underline="none">
                    Xem sản phẩm
                  </Link>
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </DashboardCard>
  );
};

export default RecentNotifies;
