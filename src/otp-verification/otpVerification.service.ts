import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import OTP from 'otp';
import { OtpVerification } from 'src/schemas/otp-verify.schema';

@Injectable()
export class OtpVerificationService {
  constructor(
    @InjectModel(OtpVerification.name)
    private OtpVerificationModal: Model<OtpVerification>,
  ) {}

  async createOTP({ email, userId }: { email: string; userId: string }) {
    try {
      const OTPcode = new OTP({ codeLength: 6 });
      const code = OTPcode.hotp(6);
      console.log(code);
      const otpResult = await new this.OtpVerificationModal({
        code,
        email,
        userId,
      });
      return await otpResult.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
