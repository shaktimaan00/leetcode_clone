// import { NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken";

// export const tokenExtractor = (request: NextRequest) => {
//     try {
//         const token = request.cookies.get("userToken")?.value || null;
//         console.log("Token:", token);
//         if (!token) {
//             throw new Error("Unauthorized, Please login to continue");
//         }
//         const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
//         console.log("Decoded Token:", decodedToken);
//         return decodedToken.id;
//     } catch (error : any) {
//         console.error("Error:", error.message);
//         NextResponse.json({error: error.message}, {status: 500});
//     }
// }


// /lib/tokenExtractor.ts
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const tokenExtractor = (request: NextRequest): string => {
  const token = request.cookies.get("userToken")?.value;
  if (!token) {
    throw new Error("Unauthorized: Please login to continue");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return (decodedToken as any).id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
