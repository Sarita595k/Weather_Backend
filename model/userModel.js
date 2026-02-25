import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, favorites: {
        type: [String],
        default: []
    }, resetPasswordToken: String,
    resetPasswordExpire: Date
},
    { timestamps: true }
)

export const UserDetails = mongoose.model("UserDetails", userSchema)