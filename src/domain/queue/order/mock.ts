import { Order } from 'src/domain/model/order';
import { OrderQueue } from './index';

export class OrderQueueMock implements OrderQueue {
  push(order: Order): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
