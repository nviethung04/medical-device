import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { validateToken } from "@/lib/auth";
import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy sản phảm theo id

export async function GET(req, { params }) {
  try {
    const client = await pool.connect();
    const { productId } = params;

    const productResult = await client.query('SELECT * FROM products WHERE id = $1', [productId]);

    if (productResult.rows.length === 0) {
      client.release();
      return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    const product = productResult.rows[0];

    // get _user_added and _user_updated
    let userAdded = null;
    let userUpdated = null;

    if (product._user_added) {
      const userAddedResult = await client.query('SELECT * FROM users WHERE id = $1', [product._user_added]);
      if (userAddedResult.rows.length > 0) {
        userAdded = userAddedResult.rows[0];
      }
    }

    if (product._user_updated) {
      const userUpdatedResult = await client.query('SELECT * FROM users WHERE id = $1', [product._user_updated]);
      if (userUpdatedResult.rows.length > 0) {
        userUpdated = userUpdatedResult.rows[0];
      }
    }

    product._user_added = userAdded;
    product._user_updated = userUpdated;

    client.release();
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
