import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        let response = NextResponse.json({ message: "User Logged Out", success: true }, { status: 200 });
        response.cookies.set("userToken", "", {
            httpOnly: true,
            expires: new Date(0) // Set the cookie to expire immediately
        });

        // console.log("Response:", response);

        return response;
    } catch (err: any) {
        // console.error("Error:", err.message);
        return NextResponse.json({ error: err.message, success : true }, { status: 500 });
    }
}
