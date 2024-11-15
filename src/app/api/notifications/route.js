import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
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
    const client = await clientPromise;
    const db = client.db("products");
    const maintenancesCollection = db.collection("maintenances");
    const productsCollection = db.collection("products");

    const { currentDate, next40Days } = getNext40Days();

    // Lấy các lịch trình bảo trì sắp tới (trong 40 ngày) và chưa bảo trì
    const upcomingMaintenances = await maintenancesCollection
      .find({
        maintenanced: false,
        maintenanceDateNext: {
          $gte: currentDate,
          $lte: next40Days,
        },
      })
      .toArray();

    // Lấy các sản phẩm có số lượng còn lại < 10
    const lowStockProducts = await productsCollection
      .find({
        "stock.available": { $lt: 10 },
      })
      .toArray();

    // Tạo danh sách thông báo
    const notify = [
      ...upcomingMaintenances.map((item) => ({
        type: "maintenance",
        productId: item.product_id,
        transaction_id : item.transaction_id,
        name: item.name,
        maintenanceDateNext: item.maintenanceDateNext,
        message: `Lịch bảo trì sắp đến cho sản phẩm "${item.name}" vào ngày ${convertDate(item.maintenanceDateNext)}.`,
      })),
      ...lowStockProducts.map((item) => ({
        type: "stock",
        productId: item._id,
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
