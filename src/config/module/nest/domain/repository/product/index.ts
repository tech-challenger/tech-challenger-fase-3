import { Module } from '@nestjs/common';
import { ProductRepositoryMock } from 'src/infra/datastore/mock/product';
import { ProductRepository } from 'src/domain/repository/product';

const provider = {
  provide: ProductRepository,
  useClass: ProductRepositoryMock,
};

@Module({
  imports: [],
  providers: [provider],
  exports: [provider],
})
export class ProductRepositoryModule {}
