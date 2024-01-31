import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: isDevelopment
        ? 'http://localhost:3000'
        : 'https://web-store-apps.vercel.app',
      credentials: true,
    },
    bodyParser: true,
    rawBody: true,
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({});
  await app.listen(process.env.PORT || 7000);
}
bootstrap();
