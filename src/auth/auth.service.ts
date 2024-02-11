import { MailService } from './../mail/mail.service';
import { CreateUserDTO, getUserDto } from './dto/user.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Response as ExpressResponse } from 'express';
import * as bcrypt from 'bcrypt';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  private expiresDate: 3_600_000;
  constructor(
    @InjectModel(User.name) private UserService: Model<User>,
    private jwtService: JwtService,
    private MailService: MailService,
    private OtpService: OtpService,
  ) {}

  async create({
    createUserData,
    res,
  }: {
    createUserData: CreateUserDTO;
    res: ExpressResponse;
  }): Promise<{ message: string }> {
    try {
      const hashedPassword = bcrypt.hashSync(
        createUserData.password,
        parseInt(process.env.SALT_ROUNDS),
      );

      // create a new user
      const user = await new this.UserService({
        ...createUserData,
        password: hashedPassword,
      });
      await user.save();
      // disabled confirmation email temporary
      //
      // Create otp code
      // const otp = await this.OtpService.createOtpCode({
      //   email: user.email,
      //   userId: user.id,
      // });

      // send verification email
      // await this.MailService.sendEmail({
      //   to: user.email,
      //   subject: `Web Store, this is a confirmation email address`,
      //   html: this.MailService.confirmEmailTemplate({
      //     name: user.fullName,
      //     otpCode: otp.otpCode,
      //   }) as string,
      // });

      const token = await this.setToken({ _id: user._id });
      this.sendCookies({ res, name: 'token', data: token });
      res.cookie('isLoggedIn', true, {
        maxAge: this.expiresDate,
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });
      return {
        message: `hello ${user.fullName} in your Web Store account, Publish your web app and enjoy`,
      };
    } catch (error) {
      throw error;
    }
  }

  async read({
    getUserData,
    res,
  }: {
    getUserData: getUserDto;
    res: ExpressResponse;
  }): Promise<{ message: string }> {
    try {
      const user = await this.getUser({ email: getUserData.email });
      if (!user) throw new NotFoundException('This user is not registered');

      const password = await bcrypt.compare(
        getUserData.password,
        user.password,
      );
      if (!password)
        throw new ForbiddenException('Incorrect email or password , try again');

      const token = await this.setToken({ _id: user._id });

      this.sendCookies({ res, name: 'token', data: token });
      res.cookie('isLoggedIn', true, {
        maxAge: this.expiresDate,
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      });

      return { message: `logged in successfully , welcome ${user.fullName}` };
    } catch (error) {
      throw error;
    }
  }

  async changePassword({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      const user = await this.getUser({ userId });
      const isValid = await bcrypt.compare(oldPassword, user.password);
      //
      if (!isValid) throw new NotFoundException('password is incorrect');

      const hashedPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT_ROUNDS),
      );
      const affectedUser = await this.UserService.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });

      return await affectedUser.save();
    } catch (error) {
      throw error;
    }
  }

  async emailAuthentication({
    otpCode,
    userId,
  }: {
    otpCode: string;
    userId: string;
  }) {
    try {
      const account = await this.OtpService.getOtpCode({ otpCode, userId });
      if (account) {
        const isVerifiedUser = await this.UserService.findByIdAndUpdate(
          userId,
          { isVerified: true },
        ).select('isVerified');
        await isVerifiedUser.save();
        return isVerifiedUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async sendEmailVerification(userId: string) {
    try {
      const user = await this.UserService.findById(userId);
      if (!user)
        throw new NotFoundException('user not found or not registered');
      const otpCode = await this.OtpService.createOtpCode({
        email: user.email,
        userId: user._id,
      });
      if (!otpCode)
        throw new BadRequestException(
          'error happened will generate the otp code.',
        );
      const template = this.MailService.confirmEmailTemplate({
        name: user.fullName,
        otpCode: otpCode.otpCode,
      });
      const email = await this.MailService.sendEmail({
        to: user.email,
        subject: 'Email confirmation for "web store" platform',
        html: template,
      });

      return 'email confirmation was sent successfully';
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordRequest(email: string) {
    try {
      const user = await this.getUser({ email });
      if (!user) throw new NotFoundException(`user ${email} is not registered`);

      // generate new OTP password
      const otp = await this.OtpService.createOtpCode({
        email,
        userId: user._id,
      });
      if (!otp)
        throw new BadRequestException(
          'error happened will generate the otp code.',
        );
      // send OTP password to the user email
      const template = this.MailService.resetAccountPassword({
        name: user.fullName,
        otpCode: otp.otpCode,
      });
      await this.MailService.sendEmail({
        to: user.email,
        subject: 'Password reset , "Web Store" platform',
        html: template,
      });

      return 'password reset sent successfully';
    } catch (error) {
      throw error;
    }
  }

  async resetUserPassword({
    otpCode,
    newPassword,
  }: {
    otpCode: string;
    newPassword: string;
  }) {
    try {
      const checkOtpCode = await this.OtpService.getOtpCode({ otpCode });
      const hashedPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT_ROUNDS),
      );
      const modifiedUser = await this.UserService.findByIdAndUpdate(
        checkOtpCode.accountId,
        { password: hashedPassword },
      );
      await modifiedUser.save();
      if (modifiedUser) {
        await this.OtpService.deleteOtpCode(otpCode);
      }

      return 'password changed successfully';
    } catch (error) {
      throw error;
    }
  }

  async logout(res: ExpressResponse) {
    try {
      res.cookie('token', '', {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      res.end();
    } catch (error) {
      throw error;
    }
  }

  private sendCookies({
    res,
    name,
    data,
  }: {
    res: ExpressResponse;
    name: string;
    data: any;
  }) {
    res.cookie(name, data, {
      maxAge: this.expiresDate,
      httpOnly: true,
      secure: true,
      // domain: process.env.ORIGIN,
      sameSite: 'none',
    });
  }
  private async getUser({
    email,
    userId,
  }: {
    email?: string;
    userId?: string;
  }) {
    if (email) {
      return await this.UserService.findOne({ email });
    }
    return await this.UserService.findById(userId);
  }
  private async setToken(data) {
    return await this.jwtService.signAsync(data);
  }
}
