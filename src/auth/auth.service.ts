import { MailService } from './../mail/mail.service';
import { OtpService } from './../otp/otp.service';
import { CreateUserDTO } from './../dto/user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Response as ExpressResponse } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserService: Model<User>,
    private jwtService: JwtService,
    private OtpService: OtpService,
    private MailService: MailService,
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
      const user = await new this.UserService({
        ...createUserData,
        password: hashedPassword,
      });
      // const otpCode = await this.OtpService.createOtp({
      //   email: user.email,
      //   accountId: user._id.toString(),
      // });
      // if (otpCode) {
      await this.MailService.SendUserEmailConfirmation({
        to: user.email,
        subject: `Web Store, this is a confirmation email address`,
        context: { code: '45668', name: user.fullName },
        template: 'confirm-email.hbs',
      });
      // }

      // await user.save();
      // const token = await this.jwtService.signAsync({ _id: user._id });

      // res.cookie('token', token, {
      //   httpOnly: true,
      //   secure: true,
      //   maxAge: 60 * 60 * 24 * 1000,
      // });
      return {
        message: `hello ${user.fullName} in your WebStore Account, publish your web app and enjoy`,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async read(createUserData: CreateUserDTO): Promise<{ message: string }> {
    return;
  }
  async updated(createUserData: CreateUserDTO): Promise<User> {
    return;
  }
  async delete(createUserData: CreateUserDTO): Promise<User> {
    return;
  }
}
