import mongoose from "mongoose";
import { dbName } from "../constants.js";

export const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      dbName: dbName
    });
    console.log(`Database connected to host: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Some error occured while connecting to database: ${err}`);
  }
}
