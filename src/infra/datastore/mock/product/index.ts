import { Product } from '../../../../domain/model/product';
import { ProductRepository } from 'src/domain/repository/product';
import { ProductFilter } from 'src/domain/repository/product/filter';

const mockedOrders = [
  new Product(null, 'product_a'),
  new Product(null, 'product_b'),
  new Product(null, 'product_c'),
];

export class ProductRepositoryMock implements ProductRepository {
  count(filter: ProductFilter): Promise<number> {
    return Promise.resolve(10);
  }

  find(filter: ProductFilter): Promise<Product[]> {
    return Promise.resolve(mockedOrders);
  }

  create(product: Product): Promise<string> {
    return Promise.resolve('12345');
  }

  delete(id: Product): Promise<void> {
    return Promise.resolve();
  }
}
