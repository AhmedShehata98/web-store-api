import { Injectable } from '@nestjs/common';

@Injectable()
export class WebStoreConfigService {
  constructor(
    private _MongoUrl = process.env.DATABASE_URL,
    private _MongoDatabaseName = process.env.DATABASE_NAME,
  ) {}

  getMongoConfig(): { uri: string; dbName: string } {
    return { uri: this._MongoUrl, dbName: this._MongoDatabaseName };
  }
}
