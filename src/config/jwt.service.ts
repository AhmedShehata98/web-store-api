import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JWTConfigService implements JwtOptionsFactory {
  constructor(private ConfigService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: `${this.ConfigService.getOrThrow('JWT_SECRET_KEY')}`,
      signOptions: { expiresIn: '1 day' },
      global: true,
    };
  }
}
