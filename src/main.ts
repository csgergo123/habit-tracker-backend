import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  /*app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );*/
  app.enableCors({
    origin: 'http://localhost:4200',
  });

  const options = new DocumentBuilder()
    .setTitle('Habit tracker API')
    .setDescription('Habit tracker API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);

  logger.log(`Application listening on ${port}`);
}
bootstrap();
