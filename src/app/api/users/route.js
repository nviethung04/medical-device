import { ROLE_MANAGER } from "@/app/constants/RoleManager";
import pool from "@/lib/postgresql";
import { encrypt } from "@/utils/Security";
import { NextResponse } from "next/server";

// API GET để lấy danh sách users
export async function GET() {
  try {
    const client = await pool.connect();

    try {
      // Lấy dữ liệu từ bảng users (sắp xếp theo created_at mới nhất)
      const result = await client.query('SELECT * FROM users ORDER BY created_at DESC');
      const users = result.rows;

      return NextResponse.json({ success: true, data: users });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API POST để tạo một user mới
export async function POST(req) {
  try {
    const client = await pool.connect();

    const { email, password, firstName, lastName, role = ROLE_MANAGER.SALE } = await req.json();

    try {
      // role phải thuộc ROLE_MANAGER
      if (!Object.values(ROLE_MANAGER).includes(role)) {
        return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 });
      }

      // Kiểm tra xem email đã tồn tại chưa
      const userCheck = await client.query('SELECT id FROM users WHERE email = $1', [email]);

      if (userCheck.rows.length > 0) {
        return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
      }

      // Mã hóa mật khẩu trước khi lưu vào database
      const hashedPassword = encrypt(password);

      // Chèn user mới vào database
      const result = await client.query(
        'INSERT INTO users (email, password, first_name, last_name, role, active, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [email, hashedPassword, firstName, lastName, role, true, new Date()]
      );

      const newUser = result.rows[0];

      return NextResponse.json({ success: true, message: "Tạo tài khoản thành công", data: newUser });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API PUT để cập nhật thông tin user
export async function PUT(req) {
  try {
    const client = await pool.connect();

    try {
      const { id, firstName, lastName, role, active = true } = await req.json();

      // role phải thuộc ROLE_MANAGER
      if (role && !Object.values(ROLE_MANAGER).includes(role)) {
        return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 });
      }

      // Kiểm tra xem user có tồn tại không
      const userCheck = await client.query('SELECT id FROM users WHERE id = $1', [id]);

      if (userCheck.rows.length === 0) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }

      // Cập nhật thông tin user
      const result = await client.query(
        'UPDATE users SET first_name = $1, last_name = $2, role = $3, active = $4, updated_at = $5 WHERE id = $6 RETURNING *',
        [firstName, lastName, role, active, new Date(), id]
      );

      const updatedUser = result.rows[0];

      return NextResponse.json({
        success: true,
        message: "Cập nhật thông tin thành công",
        data: updatedUser
      });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
