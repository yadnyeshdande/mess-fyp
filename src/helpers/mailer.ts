import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async (email: string, emailType:"VERIFY", userId: string, subject: string, text: string) => {
    
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            const updatedUser = await User.findByIdAndUpdate
            (userId, {
                $set: {verifyToken:hashedToken, 
                verifyTokenExpires: Date.now() + 3600000} //Expiries in 1 hour from now
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate
            (userId, {
                $set: {forgotPasswordToken:hashedToken, 
                forgotPasswordTokenExpires: Date.now() + 3600000}
            })
        }
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",// apla mail and details takayache
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USER , // admin@email.com
            to: email,
            subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
            text : "Check your email?",
            html: `<p>click here <a href="${process.env.DOMAIN} /verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify rmail" : "reset password"} 
            or copy this link <br> ${process.env.DOMAIN} /verifyemail?token=${hashedToken} </p>`,
        };
        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}