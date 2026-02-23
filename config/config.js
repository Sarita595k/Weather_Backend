import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected Successfully")
    }
    catch (err) {
        console.log("DB connection failed", err)
    }
}