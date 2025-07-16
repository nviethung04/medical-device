import { validateToken } from "@/lib/auth";
import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy danh sách users
export async function GET(req) {
  try {
    const client = await pool.connect();

    const userId = await validateToken(req);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    try {
      // Lấy dữ liệu từ bảng users id = userId
      const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
      const user = result.rows[0];

      if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      // Trả về dữ liệu user (không trả về password)
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json({ success: true, data: userWithoutPassword });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
