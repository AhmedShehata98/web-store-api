import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [UploadService, CloudinaryService],
})
export class UploadModule {}
