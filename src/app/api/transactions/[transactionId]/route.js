import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// API GET để lấy danh sách transactions
export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const dbUser = client.db("accounts");
    const transactionCollection = db.collection("transactions");
    const userCollection = dbUser.collection("users");
    const customerCollection = dbUser.collection("customers");

    const { transactionId } = params;

    // Lấy transaction theo id
    const transaction = await transactionCollection.findOne({ _id: getObjectId(transactionId) });

    if (!transaction) {
      return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
    }

    let supplier = {};
    if (transaction.supplier) {
      supplier = await customerCollection.findOne({ _id: transaction.supplier });
    }

    let user = {};
    if (transaction.handled_by_id) {
      user = await userCollection.findOne({ _id: transaction.handled_by_id });
    }

    let transactionExport = {
      ...transaction,
      supplier: supplier,
      user: user
    };

    return NextResponse.json({ success: true, data: transactionExport });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
