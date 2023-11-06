import { Order } from 'src/domain/model/order';
import { OrderQueue } from '../../../../domain/queue/order/index';

export class OrderMockQueue implements OrderQueue {
  push(order: Order) {
    console.log('OrderMockQueue::send ' + order);
    return Promise.resolve('queueId');
  }
}
