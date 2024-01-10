import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async handleGetUserInfo(@Req() req: ExpressRequest) {
    try {
      const { _id: userId } = req.params;
      return await this.usersService.getUserInfo(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('updateLinkedinURL')
  @UseGuards(JwtAuthGuard)
  async handleUpdateLinkedinUrl(
    @Req() req: ExpressRequest,
    @Body('linkedinProfileUrl') linkedinProfileUrl: string,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.usersService.updateLinkedInProfileURL({
        userId,
        linkedinProfileUrl,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('updateGithubURL')
  @UseGuards(JwtAuthGuard)
  async handleUpdateGithubURL(
    @Req() req: ExpressRequest,
    @Body('githubProfileUrl') githubProfileUrl: string,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.usersService.updateGithubProfileURL({
        userId,
        githubProfileUrl,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('update-country')
  @UseGuards(JwtAuthGuard)
  async handleUpdateCountryName(
    @Req() req: ExpressRequest,
    @Body('country') country: string,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.usersService.updateCountry({
        userId,
        country,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('update-usedFramework')
  @UseGuards(JwtAuthGuard)
  async handleUpdateUsedFramework(
    @Req() req: ExpressRequest,
    @Body('usedFramework') usedFramework: string,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.usersService.updateUsedFramework({
        userId,
        usedFramework,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('update-jobTitle')
  @UseGuards(JwtAuthGuard)
  async handleUpdateJobTitle(
    @Req() req: ExpressRequest,
    @Body('jobTitle') jobTitle: string,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.usersService.updateJobTitle({
        userId,
        jobTitle,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Put('update-profile-image')
  @UseInterceptors(FileInterceptor('profileImageUrl'))
  @UseGuards(JwtAuthGuard)
  async handleUpdateProfileImage(
    @UploadedFile() profileImageUrl: Express.Multer.File,
    @Req() req: ExpressRequest,
  ) {
    try {
      const { _id: userId } = req.params;
      return await this.usersService.updateProfileImage({
        file: profileImageUrl,
        userId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
