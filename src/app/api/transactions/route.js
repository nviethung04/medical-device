import { validateToken } from "@/lib/auth";
import pool from "@/lib/postgresql";
import { NextResponse } from "next/server";

// API GET để lấy danh sách transactions
export async function GET() {
  try {
    const client = await pool.connect();

    // Lấy danh sách tất cả các transactions
    const transactionResult = await client.query('SELECT * FROM transactions ORDER BY created_at DESC');
    const transactions = transactionResult.rows;

    // Sử dụng Promise.all để đợi tất cả các `map` async hoàn tất
    const transactionExport = await Promise.all(
      transactions.map(async (transaction) => {
        let supplier = {};
        if (transaction.supplier) {
          const supplierResult = await client.query('SELECT * FROM customers WHERE id = $1', [transaction.supplier]);
          if (supplierResult.rows.length > 0) {
            const supplierData = supplierResult.rows[0];
            supplier = {
              id: supplierData.id,
              name: supplierData.name,
              phone: supplierData.contact_info?.phone,
              address: supplierData.contact_info?.address,
              email: supplierData.email
            };
          }
        }

        let user = {};
        if (transaction.handled_by_id) {
          const userResult = await client.query('SELECT * FROM users WHERE id = $1', [transaction.handled_by_id]);
          if (userResult.rows.length > 0) {
            const userData = userResult.rows[0];
            user = {
              id: userData.id,
              name: userData.profile?.firstName + " " + userData.profile?.lastName,
              email: userData.email,
              role: userData.role || 4
            };
          }
        }
        let totalPrice = 0;
        transaction.products.forEach((product) => {
          totalPrice += product.price * product.quantity;
        });

        return {
          id: transaction.id,
          total_product: transaction.products?.length,
          totalPrice: totalPrice,
          address: transaction.address,
          note: transaction.note,
          status: transaction.status,
          created_at: transaction.created_at,
          updated_at: transaction.updated_at,
          type: transaction.type,
          supplier: supplier,
          user: user
        };
      })
    );

    client.release();
    return NextResponse.json({ success: true, data: transactionExport });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {

    return NextResponse.json({ success: true, message: "Tạo sản phẩm thành công", data: "OK" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const client = await pool.connect();
    const objectId = await validateToken(req);

    if (!objectId) {
      client.release();
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    const { id, note, address, status } = await req.json();

    if (!id) {
      client.release();
      return NextResponse.json({ success: false, message: "Thiếu thông tin" }, { status: 400 });
    }

    const transactionResult = await client.query('SELECT * FROM transactions WHERE id = $1', [id]);

    if (transactionResult.rows.length === 0) {
      client.release();
      return NextResponse.json({ success: false, message: "Không tìm thấy transaction" }, { status: 404 });
    }

    const transaction = transactionResult.rows[0];

    if (transaction.status === 8 || transaction.status === 9 || transaction.status === 10) {
      client.release();
      return NextResponse.json({ success: false, message: "Transaction đã hoàn thành" }, { status: 400 });
    }

    // update
    await client.query(
      'UPDATE transactions SET note = $1, address = $2, status = $3, updated_at = NOW() WHERE id = $4',
      [
        note || transaction.note,
        address || transaction.address,
        status || transaction.status,
        id
      ]
    );

    client.release();
    return NextResponse.json({ success: true, message: "Cập nhật thành công", data: "ok" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
