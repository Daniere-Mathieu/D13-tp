import mongoose from "mongoose";

export default async function () {
  try {
    mongoose.set("strictQuery", true);
    const uri = (global as any).env.mongoose.uri;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(`Unable to connect to database: ${error}`);
  }
}
