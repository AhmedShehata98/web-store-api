import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private cloudinaryService: CloudinaryService) {}
  async uploadImage(file: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadFile(file);
    } catch (error) {
      throw error;
    }
  }
}
