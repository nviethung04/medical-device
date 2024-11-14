import { CATEGORY_LIST } from "@/app/constants/ProductConstants";
import { validateToken } from "@/lib/auth";
import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// API GET để lấy sản phảm theo id

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const transactionCollection = db.collection("transactions");

    const { customerId } = params;

    const ObjectId = getObjectId(customerId);

    const transaction = await transactionCollection.find({ supplier: ObjectId }).toArray();

    return NextResponse.json({ success: true, data: transaction });
    
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
