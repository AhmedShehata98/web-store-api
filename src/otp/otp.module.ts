import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpCode, OtpSchema } from './otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: OtpSchema, name: 'OtpCode' }]),
  ],
  providers: [OtpService],
})
export class OtpModule {}
