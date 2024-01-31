import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.ORIGIN,
      credentials: true,
    },
    bodyParser: true,
    rawBody: true,
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  await app.listen(process.env.PORT || 7000);
}
bootstrap();
