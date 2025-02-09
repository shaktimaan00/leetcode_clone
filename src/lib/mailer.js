import nodemailer from 'nodemailer';
import { v4 as uuid } from 'uuid';
import { User } from '@/models/UserModel';

export const SendEmail = async ({email, emailType, userId}) => {
    try {
        console.log("Sending Email");
        const uuidToken = uuid();
        
        let updatedUser = null;
        let content = null;
        let subject = null;
        if (emailType === "VERIFY") {
            console.log(emailType);
            console.log(Date.now() + 3600000);
            const user = await User.findByIdAndUpdate(userId, {
                verificationToken : uuidToken,
                verificationTokenExpiry : Date.now() + 3600000
            }, {new: true});
            updatedUser = user;
            subject = "Verify your Email 🚨";
            content = `Please click <a href="${process.env.DOMAIN}/api/verifyemail?token=${uuidToken}">here</a> or the link below to verify your email : ${process.env.DOMAIN}/api/verifyemail?token=${uuidToken}`
        }
        else if (emailType === "RESET") {
            console.log(emailType);
            const user = await User.findByIdAndUpdate(userId, {
                resetToken : uuidToken,
                resetTokenExpiry : Date.now() + 3600000
            }, {new: true});
            updatedUser = user;
            subject = "🚨 Reset your Password 🚨";
            content = `Please click <a href="${process.env.DOMAIN}/resetpassword?token=${uuidToken}">here</a> or the link below to reset your password : ${process.env.DOMAIN}/resetpassword?token=${uuidToken}`
        }
        else if(emailType === "VERIFY_SUCCESS") {
            console.log(emailType);
            const user = await User.findById(userId);
            if(!user) throw new Error("User not found, Verfiy Success email failed");
            updatedUser = user;
            subject = "Email Verified 🎉🎉";
            content = `Hey, ${user.username}!! </br> Your email has been verified successfully! Welcome to LEETCODE (Parody)!`
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        // var transport = nodemailer.createTransport({
        //     host: "smtp.mailersend.net",
        //     port: 587,
        //     auth: {
        //     user: "MS_S0Hd8i@trial-z86org8qxwzgew13.mlsender.net",
        //     pass: "mssp.uwIl35A.vywj2lpzn5pg7oqz.34LW6cC"
        //     }
        // });

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "3cd6699d2dae0d",
            pass: "3af67e5290e888"
            }
        });

        // const mailOptions = {
        //     from: "MS_S0Hd8i@trial-z86org8qxwzgew13.mlsender.net",
        //     to: email,
        //     subject: subject,
        //     html: content
        // }

        const mailOptions = {
            from: "LeetCode (Parody) <noreply@leetcode.com> ",
            to: email,
            subject: subject,
            html: content
        }

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent successfully", mailResponse, updatedUser);
        return {mailResponse, updatedUser};

    } catch (error) {
        console.log("Error in sending email");
        console.log(error);
        throw new Error(error);
    }
}