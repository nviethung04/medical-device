import getObjectId from "@/lib/getObjectId";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// API GET để lấy danh sách transactions
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const dbUser = client.db("accounts");
    const transactionCollection = db.collection("transactions");
    const userCollection = dbUser.collection("users");
    const customerCollection = dbUser.collection("customers");

    // Lấy danh sách tất cả các transactions
    const transactions = await transactionCollection.find({}).sort({ created_at: -1 }).toArray();

    // Sử dụng Promise.all để đợi tất cả các `map` async hoàn tất
    // eslint-disable-next-line no-undef
    const transactionExport = await Promise.all(
      transactions.map(async (transaction) => {
        let supplier = {};
        if (transaction.supplier) {
          supplier = await customerCollection.findOne({ _id: transaction.supplier });
          if (supplier) {
            supplier = {
              _id: supplier._id,
              name: supplier.name,
              phone: supplier.contact_info.phone,
              address: supplier.contact_info.address,
              email: supplier.email
            };
          }
        }

        let user = {};
        if (transaction.handled_by_id) {
          user = await userCollection.findOne({ _id: transaction.handled_by_id });
          if (user) {
            user = {
              _id: user._id,
              name: user.profile?.firstName + " " + user.profile?.lastName,
              email: user.email,
              role: user.role || 4
            };
          }
        }

        return {
          _id: transaction._id,
          total_product: transaction.products?.length,
          address: transaction.address,
          note: transaction.note,
          status: transaction.status,
          created_at: transaction.created_at,
          updated_at: transaction.updated,
          type: transaction.type,
          supplier: supplier,
          user: user
        };
      })
    );

    return NextResponse.json({ success: true, data: transactionExport });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
