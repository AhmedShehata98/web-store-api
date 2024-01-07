import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OTPSchema, Otp } from 'src/schemas/otp.schema';

@Module({
  providers: [OtpService],
  imports: [MongooseModule.forFeature([{ schema: OTPSchema, name: Otp.name }])],
  exports: [OtpService],
})
export class OtpModule {}
