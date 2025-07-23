import { validateToken } from "@/lib/auth";
import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy sản phảm theo id

export async function GET(req, { params }) {
  try {
    const client = await pool.connect();
    const { customerId } = params;

    const transactionResult = await client.query('SELECT * FROM transactions WHERE supplier = $1', [customerId]);
    client.release();

    return NextResponse.json({ success: true, data: transactionResult.rows });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
