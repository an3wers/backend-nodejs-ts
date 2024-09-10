import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI;
export const client = new MongoClient(url as string);

export const db = client.db("startdb");

export const startMongoDB = async () => {
  try {
    await client.connect();
    await client.db("startdb").command({ ping: 1 });
    console.log("[Start MongoDB]: MongoDB connected");
  } catch (error) {
    console.error("[Start MongoDB]: ", error);
    await client.close();
    throw error;
  }
};
