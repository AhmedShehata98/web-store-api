import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './application.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigService } from 'src/config/jwt.service';
import { ApplicationController } from './application.controller';
import { UploadModule } from 'src/upload/upload.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    JwtModule.registerAsync({ useClass: JWTConfigService }),
    UploadModule,
    NestjsFormDataModule,
  ],
  providers: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
