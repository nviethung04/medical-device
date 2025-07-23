import pool from "@/lib/postgresql";
import { convertDate } from "@/utils/Main";
import { NextResponse } from "next/server";

// Hàm tính toán ngày hiện tại và khoảng 40 ngày tới
const getNext40Days = () => {
  const currentDate = new Date();
  const next40Days = new Date();
  next40Days.setDate(currentDate.getDate() + 360);
  return { currentDate, next40Days };
};

// API GET để lấy danh sách thông báo
export async function GET() {
  try {
    const client = await pool.connect();
    const { currentDate, next40Days } = getNext40Days();

    console.log("Getting notifications...");
    console.log("Date range:", currentDate, "to", next40Days);

    // Lấy các lịch trình bảo trì sắp tới (trong 40 ngày) và chưa hoàn thành
    const upcomingMaintenancesResult = await client.query(
      "SELECT * FROM maintenances WHERE status != 'completed' AND scheduled_date >= $1 AND scheduled_date <= $2",
      [currentDate, next40Days]
    );

    console.log("Maintenances found:", upcomingMaintenancesResult.rows.length);

    // Lấy các sản phẩm có số lượng còn lại < 10
    const lowStockProductsResult = await client.query(
      "SELECT * FROM products WHERE quantity < 10"
    );

    console.log("Low stock products found:", lowStockProductsResult.rows.length);

    client.release();

    // Tạo danh sách thông báo
    const notify = [
      ...upcomingMaintenancesResult.rows.map((item) => ({
        type: "maintenance",
        productId: item.product_id,
        customerId: item.customer_id,
        maintenanceId: item.id,
        description: item.description,
        scheduledDate: item.scheduled_date,
        message: `Lịch bảo trì sắp đến: "${item.description}" vào ngày ${convertDate(item.scheduled_date)}.`,
      })),
      ...lowStockProductsResult.rows.map((item) => ({
        type: "stock",
        productId: item.id,
        name: item.name,
        available: item.quantity,
        message: `Sản phẩm "${item.name}" chỉ còn ${item.quantity} trong kho.`,
      })),
    ];

    console.log("Total notifications:", notify.length);

    return NextResponse.json({ success: true, data: notify });

  } catch (error) {
    console.error("Error in notifications API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
