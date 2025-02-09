import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/UserModel";
import { connectDB } from "@/lib/db";
import { SendEmail } from "@/lib/mailer";

export const GET = async (request : NextRequest) => {
    await connectDB();
    console.log("Verify Email request received");
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if(!token){
            return NextResponse.json({error: "incorrect URL, Missing a token", success : false}, {status: 400});
        }
        else{
            console.log("Token:", token);
        }

        const user = await User.findOne({verificationToken : token, verificationTokenExpiry : { $gt : Date.now() }});
        if(!user){
            return NextResponse.json({error: "Invalid or expired token", success : false}, {status: 400});
        }
        console.log("User found:", user);
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        user.isVerified = true;
        await user.save();

        const mailResponse = await SendEmail({
            email : user.email,
            emailType : "VERIFY_SUCCESS",
            userId : user._id.toString()
        });

        return NextResponse.json({message: "Email verified successfully", success : true}, {status: 200});
    } catch (error : any) {
        return NextResponse.json({error: error.message, success : false}, {status: 500});
    }
}