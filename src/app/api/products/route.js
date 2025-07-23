import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { validateToken } from "@/lib/auth";
import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy danh sách products
export async function GET() {
  try {
    const client = await pool.connect();

    try {
      const result = await client.query('SELECT * FROM products ORDER BY created_at DESC');
      const products = result.rows;

      return NextResponse.json({ success: true, data: products });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API POST để tạo một product mới
export async function POST(req) {
  try {
    const client = await pool.connect();

    const objectId = await validateToken(req);

    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    const { name, description, price, quantity, category } = await req.json();

    // Kiểm tra required fields
    if (!name) {
      client.release();
      return NextResponse.json({ success: false, message: "Tên sản phẩm là bắt buộc" }, { status: 400 });
    }

    // Insert product vào PostgreSQL
    const result = await client.query(
      `INSERT INTO products (id, name, description, price, quantity, category, active, created_at, updated_at) 
       VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, true, NOW(), NOW()) RETURNING *`,
      [name, description || '', price || 0, quantity || 0, category || '']
    );

    client.release();

    return NextResponse.json({ success: true, message: "Tạo sản phẩm thành công", data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API PUT để cập nhật thông tin product
export async function PUT(req) {
  try {
    const client = await pool.connect();
    const { id, name, category, stock, hardware, software, user_manual, status, notes, price } = await req.json();
    const isCategory = CATEGORY_LIST.find((item) => item.value === category);

    if (!isCategory) {
      client.release();
      return NextResponse.json({ success: false, message: "Danh mục sản phẩm không hợp lệ" }, { status: 400 });
    }

    const userUpdateId = await validateToken(req);

    if (!userUpdateId) {
      client.release();
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    // Kiểm tra xem product có tồn tại không
    const productResult = await client.query('SELECT * FROM products WHERE id = $1', [id]);

    if (productResult.rows.length === 0) {
      client.release();
      return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    const product = productResult.rows[0];

    // Cập nhật thông tin product
    await client.query(
      `UPDATE products SET 
        name = $1, 
        category = $2, 
        price = $3, 
        _user_updated = $4, 
        stock = $5, 
        hardware = $6, 
        software = $7, 
        user_manual = $8, 
        status = $9, 
        notes = $10, 
        updated_at = NOW() 
      WHERE id = $11`,
      [
        name,
        category,
        price,
        userUpdateId,
        JSON.stringify({
          ...product.stock,
          ...stock
        }),
        JSON.stringify({
          ...product.hardware,
          ...hardware
        }),
        JSON.stringify({
          ...product.software,
          ...software
        }),
        user_manual,
        status,
        notes,
        id
      ]
    );

    client.release();

    return NextResponse.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: { id }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const client = await pool.connect();
    const userDeleteId = await validateToken(req); // Kiểm tra người dùng có quyền không

    if (!userDeleteId) {
      client.release();
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    const { productIds } = await req.json();
    console.log("=======================")
    console.log(productIds)

    // Kiểm tra xem sản phẩm có tồn tại không
    const productsResult = await client.query('SELECT * FROM products WHERE id = ANY($1)', [productIds]);

    if (!productsResult.rows || productsResult.rows.length === 0) {
      client.release();
      return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    // Xóa sản phẩm
    const deleteResult = await client.query('DELETE FROM products WHERE id = ANY($1)', [productIds]);
    client.release();

    return NextResponse.json({
      success: true,
      message: `Xóa sản phẩm thành công ${deleteResult.rowCount} sản phẩm`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
