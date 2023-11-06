import { Order } from '../../model/order';

export interface OrderQueue {
  push(order: Order): Promise<string>;
}

export const OrderQueue = Symbol('OrderQueue');
