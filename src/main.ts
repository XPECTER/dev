import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: configService.get('EXE_ENV') === 'prod',
      transform: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
