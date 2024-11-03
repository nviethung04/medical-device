// lib/mongodb.js
import { MONGODB_CONNECT } from "@/constants/MainConstant";
import { MongoClient } from "mongodb";

const uri = MONGODB_CONNECT;
const options = {
  useNewUrlParser: true // Loại bỏ useUnifiedTopology
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
