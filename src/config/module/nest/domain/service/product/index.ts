import { Module } from '@nestjs/common';
import { ProductRepositoryModule } from '../../repository/product';
import { ProductService } from 'src/domain/service/product';

@Module({
  imports: [ProductRepositoryModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductServiceModule {}
