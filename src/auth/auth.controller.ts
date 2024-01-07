import { CreateUserDTO } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Response,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

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

  @Post('signup/federated/google')
  handleAuth0Google() {}
}
