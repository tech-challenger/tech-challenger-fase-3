import { Product } from 'src/domain/model/product';
import { ProductQueue } from '../../../../domain/queue/product/index';

export class ProductMockQueue implements ProductQueue {
  push(product: Product) {
    console.log('ProductMockQueue::send ' + product);
    return Promise.resolve('queueId');
  }
}
