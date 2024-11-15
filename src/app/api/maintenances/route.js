import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// API GET để lấy danh sách users
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const accountsCollection = db.collection("maintenances");

    // Sắp xếp theo maintenanceDateNext tăng dần (1) hoặc giảm dần (-1)
    const maintenances = await accountsCollection
      .find()
      .sort({ maintenanceDateNext: 1 }) // Thay 1 thành -1 nếu muốn sắp xếp giảm dần
      .toArray();

    return NextResponse.json({ success: true, data:maintenances });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {}

export async function PUT(request) {
  try {
    const { id, maintenanced } = await request.json();

    // Kiểm tra nếu `id` và `maintenanced` không được truyền vào
    if (!id || typeof maintenanced !== "boolean") {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("products");
    const accountsCollection = db.collection("maintenances");

    // Cập nhật trạng thái `maintenanced` theo `_id`
    const result = await accountsCollection.updateOne(
      { _id: getObjectId(id) },
      { $set: { maintenanced } }
    );

    return NextResponse.json({ success: true, message: "Maintenance updated successfully", data: "ok" });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}