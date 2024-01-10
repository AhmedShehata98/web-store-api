import { JWTConfigService } from './../config/jwt.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/users/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { OtpService } from 'src/otp/otp.service';
import { OtpCode, OtpSchema } from 'src/otp/otp.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService, OtpService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ schema: OtpSchema, name: 'OtpCode' }]),
    JwtModule.registerAsync({ useClass: JWTConfigService }),
    MailModule,
  ],
})
export class AuthModule {}
