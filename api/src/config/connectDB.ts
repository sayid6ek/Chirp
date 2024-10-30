import { connect } from "mongoose";
import env from "../utils/validate.env.js";

const connectDB = async () => {
  try {
    const conn = await connect(env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Unexpected error: ${error}`);
    }
    process.exit(1);
  }
};

export default connectDB;
