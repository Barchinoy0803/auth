import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller('auth')
export class MailController{
    constructor(
        private readonly mailService: MailService
    ){}

    @Post('send-otp')
    async sendOtp(
        @Body('email') email: string
    ){
        return this.mailService.sendOtpEmail(email)
    }

    @Post('verify-otp')
    async verifyOtp(
        @Body('otp') otp: string
    ){
        return this.mailService.verifyOtp(otp)
    }
}