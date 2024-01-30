import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadController } from './upload.controller';

@Module({
  providers: [UploadService, CloudinaryService],
  exports: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
