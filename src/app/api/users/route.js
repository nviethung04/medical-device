import { ROLE_MANAGER } from "@/app/constants/RoleManager";
import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { encrypt } from "@/utils/Security";
import { NextResponse } from "next/server";

// API GET để lấy danh sách users
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("accounts");
    const accountsCollection = db.collection("users");

    // Lấy dữ liệu từ bảng users
    // const users = await accountsCollection.find({}).toArray();
    // Lấy dữ liệu tạo mới nhất lên trước
    const users = await accountsCollection.find({}).sort({ created_at: -1 }).toArray();

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API POST để tạo một user mới
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("accounts"); // Tên database của bạn
    const accountsCollection = db.collection("users");

    const { email, password, firstName, lastName, role = ROLE_MANAGER.SALE } = await req.json();

    // role phải thuộc ROLE_MANAGER
    if (!Object.values(ROLE_MANAGER).includes(role)) {
      return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 });
    }

    // Kiểm tra xem email đã tồn tại chưa
    const user = await accountsCollection.findOne({
      email
    });

    if (user) {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
    }

    // Mã hóa mật khẩu trước khi lưu vào database
    const hashedPassword = await encrypt(password);

    const newUser = {
      email,
      password: hashedPassword,
      profile: {
        firstName,
        lastName
      },
      role,
      active: true,
      created_at: new Date()
    };

    // Chèn user mới vào collection
    await accountsCollection.insertOne(newUser);

    return NextResponse.json({ success: true, message: "Tạo tài khoản thành công", data: newUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API PUT để cập nhật thông tin user
export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("accounts");
    const accountsCollection = db.collection("users");

    const { id, profile, role, active = true } = await req.json();

    // role phải thuộc ROLE_MANAGER
    if (role && !Object.values(ROLE_MANAGER).includes(role)) {
      return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 });
    }

    // convert id to ObjectId
    const ObjectId = getObjectId(id);

    // Kiểm tra xem user có tồn tại không
    const user = await accountsCollection.findOne({
      _id: ObjectId
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Cập nhật thông tin user
    await accountsCollection.updateOne(
      {
        _id: ObjectId
      },
      {
        $set: {
          profile,
          role,
          active,
          updated_at: new Date()
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: { id, profile, role, active }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
