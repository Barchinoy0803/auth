import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { hostname } from "os";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MailerModule.forRootAsync({ 
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => ({
                transport: {
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "barchinoyyusupova33@gmail.com",
                        pass: "wfvb nymu rznu hbaz"
                    }
                },
                defaults: {
                    from: "barchinoyyusupova33@gmail.com"
                }
            })
        })
    ],
    controllers: [MailController],
    providers: [MailService],
    exports: [MailService]
})

export class MailModule { }
