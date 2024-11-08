import { validateToken } from "@/lib/auth";
import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// API POST để tạo một transactions mới

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const productsCollection = db.collection("products");
    const transactionCollection = db.collection("transactions");

    const objectId = await validateToken(req);

    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    const { supplier, products, address, note, freeTax } = await req.json();

    const supplierId = getObjectId(supplier);

    const productsDetail = await productsCollection
      .find({ _id: { $in: products.map((product) => getObjectId(product.product)) } })
      .toArray();

    const transactionNew = {
      supplier: supplierId,
      products: productsDetail.map((product) => {
        const productSelected = products.find((item) => item.product === product._id.toString());
        return {
          product_id: product._id,
          name: product.name,
          category: product.category,
          quantity: productSelected.quantity,
          price: productSelected.price,
          expiry_date: product.stock.expiry
        };
      }),
      address,
      type: "export",
      note,
      freeTax: freeTax,
      status: 1,
      handled_by_id: objectId,
      created_at: new Date(),
      updated_at: new Date()
    };

    const data = await transactionCollection.insertOne(transactionNew);

    // update quantity of products
    productsDetail.forEach(async (product) => {
      const productSelected = products.find((item) => item.product === product._id.toString());
      await productsCollection.updateOne(
        { _id: product._id },
        {
          $set: {
            stock: {
              ...product.stock,
              total: product.stock.total - productSelected.quantity,
              available: product.stock.available - productSelected.quantity,
              used: product.stock.used + productSelected.quantity
            }
          }
        }
      );
    });

    return NextResponse.json({ success: true, message: "Đặt hàng thành công", data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
