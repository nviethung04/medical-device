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

    // Lấy các lịch trình bảo trì sắp tới (trong 40 ngày) và chưa bảo trì
    const upcomingMaintenancesResult = await client.query(
      'SELECT * FROM maintenances WHERE maintenanced = false AND maintenanceDateNext >= $1 AND maintenanceDateNext <= $2',
      [currentDate, next40Days]
    );

    // Lấy các sản phẩm có số lượng còn lại < 10
    const lowStockProductsResult = await client.query(
      "SELECT * FROM products WHERE stock->>'available' < '10'"
    );

    client.release();

    // Tạo danh sách thông báo
    const notify = [
      ...upcomingMaintenancesResult.rows.map((item) => ({
        type: "maintenance",
        productId: item.product_id,
        transaction_id: item.transaction_id,
        name: item.name,
        maintenanceDateNext: item.maintenanceDateNext,
        message: `Lịch bảo trì sắp đến cho sản phẩm "${item.name}" vào ngày ${convertDate(item.maintenanceDateNext)}.`,
      })),
      ...lowStockProductsResult.rows.map((item) => ({
        type: "stock",
        productId: item.id,
        name: item.name,
        available: item.stock.available,
        message: `Sản phẩm "${item.name}" chỉ còn ${item.stock.available} trong kho.`,
      })),
    ];

    return NextResponse.json({ success: true, data: notify });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
