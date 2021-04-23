import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
const settings = require('../configs/settings')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('DADATA')
    .setDescription('Документация API сервиса обогащения данынх')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('doc', app, document, {
    customCss: '' +
      '.swagger-ui table tbody tr td { vertical-align: baseline; } .swagger-ui .opblock .opblock-summary-path {line-height: 1rem;} .swagger-ui .opblock .opblock-summary-description {text-align: end;}',
    customSiteTitle: 'Pantus DADATA API doc',
  });

  await app.listen(settings.port);
}
bootstrap();
