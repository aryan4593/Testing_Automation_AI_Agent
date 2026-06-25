import mongoose from "mongoose";
import dotenv from "dotenv"
const connectDB = async () => {
    // console.log("entered connect DB");
    try {
        const URI = process.env.MONGO_URI ;
        const conn = await mongoose.connect(URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;