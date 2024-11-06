// lib/mongooseConnect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;


async function mongooseConnect(): Promise<typeof mongoose> {

  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("New database connection established");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default mongooseConnect;
