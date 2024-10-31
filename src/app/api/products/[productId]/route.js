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
    const userDb = client.db("accounts");
    const productsCollection = db.collection("products");
    const usersCollection = userDb.collection("users");

    const { productId } = params;

    const ObjectId = getObjectId(productId);

    const product = await productsCollection.findOne({
      _id: ObjectId
    });

    // get _user_added and _user_updated
    const userAdded = await usersCollection.findOne({
      _id: product._user_added
    });

    const userUpdated = await usersCollection.findOne({
      _id: product._user_updated
    });

    product._user_added = userAdded;
    product._user_updated = userUpdated;

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
