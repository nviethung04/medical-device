import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// API GET để lấy danh sách users
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("accounts");
    const accountsCollection = db.collection("customers");

    // Lấy dữ liệu từ bảng users
    const customers = await accountsCollection.find({}).sort({ created_at: -1 }).toArray();

    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API POST để tạo một user mới
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("accounts"); // Tên database của bạn
    const accountsCollection = db.collection("customers");

    // Lấy thông tin từ body
    const { name, address, contact_info, contract = null } = await req.json();

    // Tao customer moi
    const customer = {
      name,
      address,
      contact_info,
      contract,
      created_at: new Date(),
      purchase_history: [],
      active: true
    };

    // Thêm customer vào database
    await accountsCollection.insertOne(customer);

    return NextResponse.json({ success: true, message: "Tạo người dùng thành công", data: "ok" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API PUT để cập nhật thông tin user
export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("accounts");
    const accountsCollection = db.collection("customers");

    // Lấy thông tin từ body
    const { id, name, address, contact_info, contract, active = true } = await req.json();

    const ObjectId = getObjectId(id);

    // Cập nhật thông tin user
    await accountsCollection.updateOne(
      { _id: ObjectId },
      {
        $set: {
          name,
          address,
          contact_info,
          contract,
          active,
          updated_at: new Date()
        }
      }
    );

    return NextResponse.json({ success: true, message: "Cập nhật người dùng thành công", data: "ok" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
