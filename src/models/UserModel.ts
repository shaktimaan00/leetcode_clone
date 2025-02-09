import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, "Please provide a username"], 
        unique: [true, "username is already taken"] },
    email: { 
        type: String, 
        required: [true, "Please provide an email"], 
        unique: [true, "Email Id already exists"] },
    password: { 
        type: String, 
        required: [true, "Please enter a password"] },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    verificationToken: { type: String},
    verificationTokenExpiry: { type: Date},
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
}, { timestamps: true });

console.log("Defining User model...");
export const User = mongoose.models.Users || mongoose.model("Users", UserSchema);
console.log("User model defined:", User);