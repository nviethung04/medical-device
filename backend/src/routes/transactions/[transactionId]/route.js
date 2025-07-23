import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy danh sách transactions
export async function GET(req, { params }) {
  try {
    const client = await pool.connect();
    const { transactionId } = params;

    // Lấy transaction theo id
    const transactionResult = await client.query('SELECT * FROM transactions WHERE id = $1', [transactionId]);

    if (transactionResult.rows.length === 0) {
      client.release();
      return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
    }

    const transaction = transactionResult.rows[0];

    let supplier = {};
    if (transaction.supplier) {
      const supplierResult = await client.query('SELECT * FROM customers WHERE id = $1', [transaction.supplier]);
      if (supplierResult.rows.length > 0) {
        supplier = supplierResult.rows[0];
      }
    }

    let user = {};
    if (transaction.handled_by_id) {
      const userResult = await client.query('SELECT * FROM users WHERE id = $1', [transaction.handled_by_id]);
      if (userResult.rows.length > 0) {
        user = userResult.rows[0];
      }
    }

    let transactionExport = {
      ...transaction,
      supplier: supplier,
      user: user
    };

    client.release();
    return NextResponse.json({ success: true, data: transactionExport });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
