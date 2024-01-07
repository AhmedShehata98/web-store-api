import { JWTConfigService } from './../config/jwt.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
// import { OtpService } from 'src/otp/otp.service';
// import { MailService } from 'src/mail/mail.service';
import { OtpModule } from 'src/otp/otp.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({ useClass: JWTConfigService }),
    MailModule,
    OtpModule,
  ],
})
export class AuthModule {}
