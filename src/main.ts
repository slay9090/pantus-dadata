import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const config = require('../configs/settings')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
}
bootstrap();
