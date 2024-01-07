import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongoDatabaseService } from './database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigService } from './config/jwt.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerLoaderService } from './config/nodemailer.service';
import { MailModule } from './mail/mail.module';
import { OtpService } from './otp/otp.service';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongoDatabaseService }),
    JwtModule.registerAsync({ useClass: JWTConfigService }),
    MailerModule.forRootAsync({ useClass: MailerLoaderService }),
    AuthModule,
    UsersModule,
    MailModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
