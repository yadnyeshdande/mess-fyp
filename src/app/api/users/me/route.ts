import { connectDB } from "@/dbConfig/dbConfig";
//chaiaurcode vala yala fakt 'connect' mhante but naam me kya rakha hai
import  User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
    const userId = await getDataFromToken(request);
    const user = await User.findOne(userId).select("-password");
    return NextResponse.json({ 
        message: "User Found",
        data: user }, 
        { status: 200 }
    );
}