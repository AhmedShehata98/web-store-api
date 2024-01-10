import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from 'src/users/user.schema';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfigService } from 'src/config/jwt.service';
import { UploadService } from 'src/upload/upload.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [UsersService, UploadService, CloudinaryService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({ useClass: JWTConfigService }),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
