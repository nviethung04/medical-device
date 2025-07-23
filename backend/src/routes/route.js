import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

// API GET để lấy danh sách users
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users ORDER BY created_at DESC');
    client.release();

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API POST để tạo một user mới
export async function POST(req) {
  try {
    const client = await pool.connect();
    const { data } = await req.json();

    const newUserId = uuidv4();
    const result = await client.query(
      'INSERT INTO users (id, data, active, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [newUserId, JSON.stringify(data), true]
    );
    client.release();

    const newUser = result.rows[0];

    return NextResponse.json({ success: true, message: "Tạo tài khoản thành công", data: newUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API PUT để cập nhật thông tin user
export async function PUT(req) {
  try {
    const client = await pool.connect();
    const { id, data } = await req.json();

    // Kiểm tra xem user có tồn tại không
    const userResult = await client.query('SELECT * FROM users WHERE id = $1', [id]);

    if (userResult.rows.length === 0) {
      client.release();
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Cập nhật thông tin user
    await client.query(
      'UPDATE users SET data = $1, updated_at = NOW() WHERE id = $2',
      [JSON.stringify(data), id]
    );
    client.release();

    return NextResponse.json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: { id }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
