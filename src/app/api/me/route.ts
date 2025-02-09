// import { tokenExtractor } from '@/lib/tokenExtractor'
// import { NextRequest, NextResponse } from 'next/server'
// import { User } from '@/models/UserModel'
// import { connectDB } from '@/lib/db'

// connectDB();

// export const GET = async (request : NextRequest) => {
//     const userId = tokenExtractor(request);
//     console.log("User ID:", userId);
//     const user = await User.findOne({_id : userId}).select("-password");

//     if(!user){
//         return NextResponse.json({error: "User not found", success : false}, {status: 404});
//     }

//     return NextResponse.json({
//         success: true, 
//         message : "Logged In user details found", 
//         userData : user
//     }, {status: 200});
// }

import { tokenExtractor } from '@/lib/tokenExtractor'
import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/models/UserModel'
import { connectDB } from '@/lib/db'
import { errorResponse } from '@/lib/utils'

connectDB();

export const GET = async (request: NextRequest) => {
    try {
        const userId = tokenExtractor(request);
        console.log("User ID:", userId);

        if (!userId) {
            return errorResponse("Unauthorized, Please login to continue", 401);
        }

        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return errorResponse("User not found", 404);
        }

        return NextResponse.json({
            success: true,
            message: "Logged In user details found",
            userData: user
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error:", error.message);
        return errorResponse(error.message, 500);
    }
}