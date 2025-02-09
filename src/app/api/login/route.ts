import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import {User} from "@/models/UserModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request : NextRequest){
    await connectDB();
    try{
        const UserBody = await request.json();
        const {email, password} = UserBody;

        if(!email || !password){
            return NextResponse.json({error: "Please provide email and password"}, {status: 400});
        }

        const user = await User.findOne({email : email});

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        console.log("User found:", user);

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch){
            return NextResponse.json({error: "Invalid Credentials", success : false}, {status: 401});
        }
        console.log("Password matched");

        const tokenData = {
            id : user._id.toString(),
            email : user.email,
            username : user.username
        }
        console.log("Token Data:", tokenData);

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn : "1d"});
        console.log("Token generated:", token);

        let response = NextResponse.json({message: "User Logged In", success : true}, {status: 200});
        response.cookies.set("userToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000),
        });

        console.log("Response:", response);
        
        return response;
    }
    catch(err : any){
        console.error("Error:", err.message);
        return NextResponse.json({error: err.message, success : false}, {status: 500});
    }
}