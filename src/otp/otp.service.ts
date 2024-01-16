import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OtpCode } from './otp.schema';
import mongoose, { Model } from 'mongoose';
const otpGenerator = require('otp-generator');

@Injectable()
export class OtpService {
  constructor(@InjectModel(OtpCode.name) private OtpModal: Model<OtpCode>) {}

  async createOtpCode({
    email,
    userId,
  }: {
    email: string;
    userId: mongoose.Types.ObjectId;
  }) {
    try {
      const code = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
      const oldOtpId = await this.OtpModal.exists({
        $or: [{ accountId: userId }, { email }],
      });

      if (Boolean(oldOtpId)) {
        await this.OtpModal.deleteOne({ _id: oldOtpId });
      }
      const otp = await new this.OtpModal({
        accountId: userId,
        email,
        otpCode: code,
      });

      return await otp.save();
    } catch (error) {
      throw error;
    }
  }

  async getOtpCode({
    otpCode,
    userId,
    email,
  }: {
    otpCode?: string;
    email?: string;
    userId?: string;
  }): Promise<OtpCode | null> {
    try {
      let otp = null;
      if (otpCode) {
        otp = await this.OtpModal.findOne({ otpCode });
      }
      if (userId) {
        otp = await this.OtpModal.findOne({ email });
      }
      if (userId) {
        otp = await this.OtpModal.findOne({ userId });
      }

      if (!otp)
        throw new NotFoundException(
          'Not found code for this account ,please request a new code',
        );
      return otp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteOtpCode(code: string) {
    try {
      const otp = await this.OtpModal.deleteOne({ code });
      return otp;
    } catch (error) {
      throw error;
    }
  }
}
