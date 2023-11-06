import { Order } from '../../model/order';
import { OrderFilter } from './filter';

export interface OrderRepository {
  update(order: Order): Promise<boolean>;
  create(order: Order): Promise<string>;
  find(filter: OrderFilter): Promise<Order[]>;
  findById(orderId: string): Promise<Order>;
  count(filter: OrderFilter): Promise<number>;
}

export const OrderRepository = Symbol('OrderRepository');
