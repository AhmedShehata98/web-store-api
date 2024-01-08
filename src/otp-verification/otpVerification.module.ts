import { Module } from '@nestjs/common';
import { OtpVerificationService } from './otpVerification.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OtpVerificationSchema,
  OtpVerification,
} from 'src/schemas/otp-verify.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpVerification.name, schema: OtpVerificationSchema },
    ]),
  ],
  providers: [OtpVerificationService],
  exports: [OtpVerificationService],
})
export class OtpVerificationModule {}
