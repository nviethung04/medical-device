import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
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
      const transactionColection = db.collection("transactions");
  
      const objectId = await validateToken(req);
  
      if (!objectId) {
        return NextResponse.json(
          { success: false, message: "Bạn cần đăng nhập để thực hiện thao tác này" },
          { status: 401 }
        );
      }
  
      const { name, transaction_type, products = [], customer_id, handled_by_id, notes="" } = await req.json();

      const transactionNew = {
        name,
        transaction_type,
        products,
        customer_id,
        handled_by_id,
        notes
      }
      
      return NextResponse.json({ success: true, message: "Tạo sản phẩm thành công", data: "ok" });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }