import { connectDB } from "@/dbConfig/dbConfig";
//chaiaurcode vala yala fakt 'connect' mhante but naam me kya rakha hai
import  User  from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import  {sendEmail}  from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {

    try {
        //USERNAME = ROLL NO.
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        if (!username || !email || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verification email
        const emailType = "VERIFY";
        await sendEmail(email, emailType, savedUser._id, "Verify Email", "Check your email?");
      
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        console.log(error);
    }

    

}
