import * as dotenv from 'dotenv';
dotenv.config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import setupOpenAPI from './config/open-api/swagger';
import { AppModule } from './config/module';
import { initLogger } from './util/log';

async function bootstrap() {
  initLogger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      //forbidUnknownValues: true,
    }),
  );

  setupOpenAPI(app);

  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
