import { Product } from 'src/domain/model/product';
import { ProductQueue } from './index';

export class ProductQueueMock implements ProductQueue {
  push(product: Product): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
