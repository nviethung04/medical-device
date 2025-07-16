
import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy danh sách users
export async function GET() {
  try {
    const client = await pool.connect();

    // Sắp xếp theo maintenanceDateNext tăng dần
    const result = await client.query('SELECT * FROM maintenances ORDER BY maintenanceDateNext ASC');
    client.release();

    return NextResponse.json({ success: true, data: result.rows });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) { }

export async function PUT(request) {
  try {
    const { id, maintenanced } = await request.json();

    // Kiểm tra nếu `id` và `maintenanced` không được truyền vào
    if (!id || typeof maintenanced !== "boolean") {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    const client = await pool.connect();

    // Cập nhật trạng thái `maintenanced` theo `id`
    const result = await client.query(
      'UPDATE maintenances SET maintenanced = $1 WHERE id = $2',
      [maintenanced, id]
    );
    client.release();

    return NextResponse.json({ success: true, message: "Maintenance updated successfully", data: "ok" });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}