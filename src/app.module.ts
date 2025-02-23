import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { UserModule } from './Users/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), DatabaseModule, UserModule, MailModule],
})
export class AppModule {}
