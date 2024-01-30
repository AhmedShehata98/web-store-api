import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    private uploadServices: UploadService,
  ) {}

  async getUserInfo(userId: string): Promise<Partial<IUser>> {
    try {
      const user = await this.userModel
        .findById(userId)
        .select(
          'fullName email profileImageUrl jobTitle country usedFramework githubProfileUrl linkedinProfileUrl isVerified',
        );

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateLinkedInProfileURL({
    linkedinProfileUrl,
    userId,
  }: {
    userId: string;
    linkedinProfileUrl: string;
  }) {
    try {
      const userLinkedinProfileUrl = await this.userModel
        .findByIdAndUpdate(userId, { linkedinProfileUrl })
        .select('linkedinProfileUrl');

      return userLinkedinProfileUrl;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateGithubProfileURL({
    githubProfileUrl,
    userId,
  }: {
    userId: string;
    githubProfileUrl: string;
  }) {
    try {
      const userGithubProfileURL = await this.userModel
        .findByIdAndUpdate(userId, { githubProfileUrl })
        .select('githubProfileUrl');
      await userGithubProfileURL.save();
      return userGithubProfileURL;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateCountry({
    country,
    userId,
  }: {
    userId: string;
    country: string;
  }) {
    try {
      const userCountry = await this.userModel
        .findByIdAndUpdate(userId, { country })
        .select('country');
      await userCountry.save();
      return userCountry;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUsedFramework({
    usedFramework,
    userId,
  }: {
    userId: string;
    usedFramework: string;
  }) {
    try {
      const userUsedFramework = await this.userModel
        .findByIdAndUpdate(userId, { usedFramework })
        .select('usedFramework');
      await userUsedFramework.save();
      return userUsedFramework;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateJobTitle({
    jobTitle,
    userId,
  }: {
    userId: string;
    jobTitle: string;
  }) {
    try {
      const userJobTitle = await this.userModel
        .findByIdAndUpdate(userId, { jobTitle })
        .select('jobTitle');
      await userJobTitle.save();
      return userJobTitle;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateProfileImage({
    file,
    userId,
  }: {
    userId: string;
    file: Express.Multer.File;
  }) {
    try {
      console.log(file, userId);
      if (!file)
        throw new BadRequestException(
          'cannot find image file ,please provide a file',
        );
      const uploadImage = await this.uploadServices.uploadImage(file);

      if (uploadImage.url) {
        const user = await this.userModel
          .findByIdAndUpdate(userId, {
            profileImageUrl: uploadImage.url,
          })
          .select('profileImageUrl');
        await user.save();
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
}
