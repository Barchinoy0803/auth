import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { totp } from "otplib";

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) {
        totp.options = { step: 300, digits: 6 }
    }

    async sendOtpEmail(email: string) {
        const secret = process.env.OTP_SECRET || "usersecret"
        const otp = totp.generate(secret)
        await this.mailerService.sendMail({
            to: email,
            subject: "OTP verification",
            html: `<h1>Your otp is <strong>${otp}</strong></h1><p>This otp is valid for 5minutes</p>`
        })
        return {message: "Otp send successfully✅"}
    }

    async verifyOtp(otp: string){
        const secret = process.env.OTP_SECRET || "usersecret"
        const isValid = totp.check(otp, secret)
        if(!isValid){
            return {message: "Invalid otp"}
        }
        return {message: "Your otp is successfully verified✅"}
    }
}