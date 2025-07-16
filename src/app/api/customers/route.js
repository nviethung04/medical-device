import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy danh sách customers
export async function GET() {
  try {
    const client = await pool.connect();

    try {
      // Lấy dữ liệu từ bảng customers (sắp xếp theo created_at mới nhất)
      const result = await client.query('SELECT * FROM customers ORDER BY created_at DESC');
      const customers = result.rows;

      return NextResponse.json({ success: true, data: customers });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API POST để tạo một customer mới
export async function POST(req) {
  try {
    const client = await pool.connect();

    const { name, email, phone, address } = await req.json();

    try {
      // Kiểm tra xem email đã tồn tại chưa (nếu có email)
      if (email) {
        const customerCheck = await client.query('SELECT id FROM customers WHERE email = $1', [email]);

        if (customerCheck.rows.length > 0) {
          return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
        }
      }

      // Tạo customer mới
      const result = await client.query(
        'INSERT INTO customers (name, email, phone, address, active, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, email, phone, address, true, new Date()]
      );

      const newCustomer = result.rows[0];

      return NextResponse.json({ success: true, message: "Tạo khách hàng thành công", data: newCustomer });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API PUT để cập nhật thông tin customer
export async function PUT(req) {
  try {
    const client = await pool.connect();

    try {
      const { id, name, email, phone, address, active = true } = await req.json();

      // Kiểm tra xem customer có tồn tại không
      const customerCheck = await client.query('SELECT id FROM customers WHERE id = $1', [id]);

      if (customerCheck.rows.length === 0) {
        return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 });
      }

      // Cập nhật thông tin customer
      const result = await client.query(
        'UPDATE customers SET name = $1, email = $2, phone = $3, address = $4, active = $5, updated_at = $6 WHERE id = $7 RETURNING *',
        [name, email, phone, address, active, new Date(), id]
      );

      const updatedCustomer = result.rows[0];

      return NextResponse.json({
        success: true,
        message: "Cập nhật khách hàng thành công",
        data: updatedCustomer
      });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
