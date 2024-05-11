import { connectDB } from "@/dbConfig/dbConfig";
//chaiaurcode vala yala fakt 'connect' mhante but naam me kya rakha hai
import { NextRequest,NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try { 
        const response = NextResponse.json({ message: "Logout successful", success: true }, { status: 200 });
        
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        }, );

        response.cookies.delete("token");


        return response


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        console.log(error);
    }
}