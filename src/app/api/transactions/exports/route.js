import { validateToken } from "@/lib/auth";
import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { calculateMaintenanceDateRaw } from "@/utils/Main";
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

    let productsMaintenance = []

    const transactionNew = {
      supplier: supplierId,
      products: productsDetail.map((product) => {
        const productSelected = products.find((item) => item.product === product._id.toString());
        const dataProduct = {
          product_id: product._id,
          name: product.name,
          category: product.category,
          quantity: productSelected.quantity,
          price: productSelected.price,
          expiry_date: product.stock.expiry
        };
        productsMaintenance.push(dataProduct);
        return dataProduct;
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

    // get id inserted
    const transactionId = data.insertedId;

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

    // create maintenance
    productsMaintenance.forEach(async (product) => {
      const maintenanceNew = {
        product_id : product.product_id,
        name : product.name,
        category : product.category,
        quantity : product.quantity,
        price : product.price,
        expiry_date : product.expiry_date,
        type: "import",
        transaction_id: transactionId,
        supplier_id: supplierId,
        userId: objectId,
        created_at: new Date(),
        maintenanceDateNext: calculateMaintenanceDateRaw(new Date(), product.expiry_date),
        maintenanced: false,
      };
      await maintenanceCollection.insertOne(maintenanceNew);
    });

    return NextResponse.json({ success: true, message: "Đặt hàng thành công", data: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
