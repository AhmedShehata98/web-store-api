import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoDatabaseService implements MongooseOptionsFactory {
  constructor(private ConfigService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this.ConfigService.getOrThrow('DATABASE_URL'),
      dbName: this.ConfigService.getOrThrow('DATABASE_NAME'),
    };
  }
}
