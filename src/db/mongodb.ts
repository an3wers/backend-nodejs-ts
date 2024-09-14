import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const url = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB_NAME || "startdb";

/*
  work with mongodb native driver

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
*/

// work with mongoose

export const startMongoDB = async () => {
  try {
    await mongoose.connect(url + dbName);
    console.log("[Start MongoDB]: MongoDB connected");
  } catch (error) {
    console.error("[Start MongoDB]: ", error);
    await mongoose.disconnect();
    throw error;
  }
};
