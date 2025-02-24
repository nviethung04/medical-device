import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { validateToken } from "@/lib/auth";
import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// API GET để lấy danh sách products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const productsCollection = db.collection("products");

    const products = await productsCollection.find({}).sort({ created_at: -1 }).toArray();

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API POST để tạo một product mới
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const productsCollection = db.collection("products");

    const objectId = await validateToken(req);

    if (!objectId) {
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    const { name, category, stock, hardware, software, user_manual, status, price } = await req.json();

    const isCategory = CATEGORY_LIST.find((item) => item.value === category);

    if (!isCategory) {
      return NextResponse.json({ success: false, message: "Danh mục sản phẩm không hợp lệ" }, { status: 400 });
    }

    const newProduct = {
      name,
      _user_added: objectId,
      _user_updated: objectId,
      price,
      category,
      stock: {
        ...stock,
        total: 0,
        available: 0,
        used: 0,
        maintenance: 0
      },
      hardware,
      software,
      user_manual,
      notes: "",
      status,
      created_at: new Date(),
      updated_at: new Date()
    };

    // Chèn product mới vào collection
    await productsCollection.insertOne(newProduct);

    return NextResponse.json({ success: true, message: "Tạo sản phẩm thành công", data: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API PUT để cập nhật thông tin product
export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const productsCollection = db.collection("products");

    const { id, name, category, stock, hardware, software, user_manual, status, notes, price } = await req.json();
    const isCategory = CATEGORY_LIST.find((item) => item.value === category);

    if (!isCategory) {
      return NextResponse.json({ success: false, message: "Danh mục sản phẩm không hợp lệ" }, { status: 400 });
    }
    // Convert id sang ObjectId
    const ObjectId = getObjectId(id);
    const userUpdateId = await validateToken(req);

    if (!userUpdateId) {
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    // Kiểm tra xem product có tồn tại không
    const product = await productsCollection.findOne({ _id: ObjectId });

    if (!product) {
      return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    // Cập nhật thông tin product
    await productsCollection.updateOne(
      { _id: ObjectId },
      {
        $set: {
          name,
          category,
          price,
          _user_updated: userUpdateId,
          stock: {
            ...product.stock,
            ...stock
          },
          hardware: {
            ...product.hardware,
            ...hardware
          },
          software: {
            ...product.software,
            ...software
          },
          user_manual,
          status,
          notes,
          updated_at: new Date()
        }
      }
    );

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
    const client = await clientPromise;
    const db = client.db("products");
    const productsCollection = db.collection("products");

    const userDeleteId = await validateToken(req); // Kiểm tra người dùng có quyền không

    if (!userDeleteId) {
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
        { status: 401 }
      );
    }

    const { productIds } = await req.json();
    console.log("=======================")
    console.log(productIds)

    // Kiểm tra xem sản phẩm có tồn tại không
    const products = await productsCollection.find({ _id: { $in: productIds } });

    if (!products || products.length === 0) {
      return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    // Xóa sản phẩm
    const ret = await productsCollection.deleteMany({ _id: { $in: productIds.map(id => getObjectId(id)) } });
    return NextResponse.json({
      success: true,
      message: `Xóa sản phẩm thành công ${ret.deletedCount} sản phẩm`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
