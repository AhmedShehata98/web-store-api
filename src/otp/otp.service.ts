import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from 'src/schemas/otp.schema';
const otpGenerator = require('otp-generator');

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private OtpService: Model<Otp>) {}

  async createOtp({ email, accountId }: { email: string; accountId: string }) {
    try {
      const generatedOtp = otpGenerator.generate(6, { digits: true });
      const otp = await new this.OtpService({
        accountId,
        email,
        otp: generatedOtp,
      });
      await otp.save();
      return generatedOtp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOtp(otpCode: string) {
    try {
      const otp = await this.OtpService.findOne({ otp: otpCode });
      return otp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
