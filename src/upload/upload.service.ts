import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { uid } from 'uid';

@Injectable()
export class UploadService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async uploadImage(file: Express.Multer.File) {
    try {
      const uploaded = await this.cloudinaryService.uploadFile(file);
      return {
        url: uploaded.secure_url,
        width: uploaded.width,
        height: uploaded.height,
        format: uploaded.format,
        created_at: uploaded.created_at,
      };
    } catch (error) {
      throw error;
    }
  }
}
