
import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy danh sách maintenances
export async function GET() {
  try {
    const client = await pool.connect();

    // Sắp xếp theo scheduled_date tăng dần
    const result = await client.query('SELECT * FROM maintenances ORDER BY scheduled_date ASC');
    client.release();

    return NextResponse.json({ success: true, data: result.rows });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) { }

export async function PUT(request) {
  try {
    const { id, status } = await request.json();

    // Kiểm tra nếu `id` và `status` không được truyền vào
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    const client = await pool.connect();

    // Cập nhật trạng thái theo `id`
    const result = await client.query(
      'UPDATE maintenances SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [status, id]
    );
    client.release();

    return NextResponse.json({ success: true, message: "Maintenance updated successfully", data: "ok" });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}