import { validateToken } from "@/lib/auth";
import pool from "@/lib/postgresql";
import { calculateMaintenanceDateRaw } from "@/utils/Main";
import { NextResponse } from "next/server";

// API POST để tạo một transactions mới
export async function POST(req) {
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

    const { supplier, products, address, note } = await req.json();

    const productsDetailResult = await client.query(
      'SELECT * FROM products WHERE id = ANY($1)',
      [products.map((product) => product.product)]
    );

    const productsDetail = productsDetailResult.rows;
    let productsMaintenance = [];

    // Create new transaction
    const transactionResult = await client.query(
      'INSERT INTO transactions (supplier, products, address, note, type, status, handled_by_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
      [
        supplier,
        JSON.stringify(productsDetail.map((product) => {
          const productSelected = products.find((item) => item.product === product.id);
          const dataProduct = {
            product_id: product.id,
            name: product.name,
            category: product.category,
            quantity: productSelected.quantity,
            price: productSelected.price,
            expiry_date: product.stock.expiry
          };
          productsMaintenance.push(dataProduct);
          return dataProduct;
        })),
        address,
        note,
        "import",
        1,
        objectId
      ]
    );

    const transactionId = transactionResult.rows[0].id;

    // Update quantity of products
    for (const product of productsDetail) {
      const productSelected = products.find((item) => item.product === product.id);
      await client.query(
        'UPDATE products SET stock = jsonb_set(jsonb_set(stock, $1, to_jsonb((stock->>$2)::integer + $3)), $4, to_jsonb((stock->>$5)::integer + $6)) WHERE id = $7',
        [
          '{total}',
          'total',
          productSelected.quantity,
          '{available}',
          'available',
          productSelected.quantity,
          product.id
        ]
      );
    }

    // Create maintenance records
    for (const product of productsMaintenance) {
      await client.query(
        'INSERT INTO maintenances (product_id, name, category, quantity, price, expiry_date, type, transaction_id, supplier_id, userId, created_at, maintenanceDateNext, maintenanced) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), $11, $12)',
        [
          product.product_id,
          product.name,
          product.category,
          product.quantity,
          product.price,
          product.expiry_date,
          "import",
          transactionId,
          supplier,
          objectId,
          calculateMaintenanceDateRaw(new Date(), product.expiry_date),
          false
        ]
      );
    }

    client.release();
    return NextResponse.json({ success: true, message: "Đặt hàng thành công", data: transactionResult.rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
