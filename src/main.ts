import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port');

  await app.listen(port);
  console.log(`🚀 DevFlow running on http://localhost:${port}/api`);
}

bootstrap();
