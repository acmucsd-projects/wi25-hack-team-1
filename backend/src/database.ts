import mongoose from "mongoose";
import env from "./utils/validateEnv";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
