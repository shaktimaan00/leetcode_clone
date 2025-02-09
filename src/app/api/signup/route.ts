import { connectDB } from "@/lib/db";
import { User } from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SendEmail } from "@/lib/mailer";

connectDB();

export async function POST(request : NextRequest){
    console.log("POST request received");
    console.log("Database connected");
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        const user = await User.findOne({email})
        console.log("User found:", user);
        if(user){
            return NextResponse.json({error: "User already exists", success : false, user}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log("Password hashed");


        const newUser = new User({
            username,
            email,
            password : hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("User saved:", savedUser);

        const mailResponse = await SendEmail({ 
            email,
            emailType: "VERIFY",
            userId : savedUser._id.toString()
        });

        return NextResponse.json({
            message: "User created successfully",
            success : true,
            savedUser,
            mailResponse
        }, {status: 201});

        
    } catch (error : any) {
        console.error("Error:", error.message);
        return NextResponse.json({error: error.message, success : false}, {status: 500});
    }
}