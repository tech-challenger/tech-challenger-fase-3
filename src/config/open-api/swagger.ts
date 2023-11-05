import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function (app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('tech-challenge')
    .setDescription('API de pedidos de lanchonete')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
