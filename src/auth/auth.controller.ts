import { CreateUserDTO, getUserDto } from 'src/auth/dto/user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  async handleSignup(
    @Body() signupData: CreateUserDTO,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    try {
      return await this.AuthService.create({ createUserData: signupData, res });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('login')
  @HttpCode(200)
  async handleLogin(
    @Response({ passthrough: true }) res: ExpressResponse,
    @Body() loginData: getUserDto,
  ) {
    try {
      return await this.AuthService.read({ res, getUserData: loginData });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('reset-password-request')
  @HttpCode(200)
  async handleResetPasswordRequest(@Body('email') email: string) {
    try {
      return await this.AuthService.resetPasswordRequest(email);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('reset-password')
  @HttpCode(200)
  async handleResetPassword(
    @Body('password') password: string,
    @Body('otpCode') otpCode: string,
  ) {
    try {
      return await this.AuthService.resetUserPassword({ otpCode, password });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('change-password')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handleChangePassword(
    @Req() req: ExpressRequest,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.AuthService.changePassword({
        userId,
        oldPassword,
        newPassword,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('verify-email')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async handleVerifyEmail(
    @Req() req: ExpressRequest,
    @Body('otpCode') otpCode: string,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.AuthService.emailAuthentication({ otpCode, userId });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('new-email-verification')
  @UseGuards(JwtAuthGuard)
  async handleSendNewEmailVerification(@Req() req: ExpressRequest) {
    try {
      const { _id: userId } = req.params;
      return await this.AuthService.sendEmailVerification(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
