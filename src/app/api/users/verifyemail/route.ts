import { connectDB } from "@/dbConfig/dbConfig";
//chaiaurcode vala yala fakt 'connect' mhante but naam me kya rakha hai
import  User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token}   = reqBody;
        console.log(token);
        
        const user = await User.findOne({ verifyToken: token, verifyTokenExpires: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        console.log(user);
        user.isVarified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpires = undefined;
        await user.save();
        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 500 });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        console.log(error);
    }
}