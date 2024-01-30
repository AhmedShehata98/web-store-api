import {
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('image'))
  async handleUploadImage(@UploadedFile() image: Express.Multer.File) {
    try {
      return await this.uploadService.uploadImage(image);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
