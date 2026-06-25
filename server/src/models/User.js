import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        username:{
            type: String, 
            required: true,
            unique: true
        },
        credits:{
            type:Number,
            required: true,
            default:5000
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);