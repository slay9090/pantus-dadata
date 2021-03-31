import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogPartsModule } from './catalog-parts/catalog-parts.module';

@Module({
  imports: [CatalogPartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
