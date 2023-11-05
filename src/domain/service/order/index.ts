import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../../model/order';
import { OrderRepository } from '../../repository/order/index';
import { OrderFilter } from '../../repository/order/filter';
import { Page } from '../../common/page';
import * as log from '../../../util/log';
import { OrderQueue } from '../../queue/order/index';

@Injectable()
export class OrderService {
  private readonly logger = log.fromContext(OrderService.name);
  constructor(
    @Inject(OrderRepository) private readonly respository: OrderRepository,
    @Inject(OrderQueue) private readonly orderQueue: OrderQueue,
  ) {}

  //TODO: create tests
  async confirm(orderId: string) {
    const order = await this.respository.findById(orderId);
    if (!order) {
      throw new Error(`Order ${order.id} not found`);
    }
    order.confirm();
    await this.orderQueue.push(order);
    await this.respository.update(order);
    this.logger.info(`The order with id ${orderId} was received`);
  }

  async create(order: Order) {
    const createdId = await this.respository.create(order);
    this.logger.info(`The order with id ${createdId} was created`);
    return createdId;
  }

  async update(order: Order) {
    const currentOrder = await this.respository.findById(order.id);
    if (!currentOrder) {
      throw new Error(`Order ${order.id} not found`);
    }
    currentOrder.update(order);
    await this.respository.update(currentOrder);
    this.logger.info(
      `The order with id ${order.id} was updated` + currentOrder,
    );
  }

  async search(filter: OrderFilter) {
    const [total, orders] = await this.findWithTotal(filter);
    return new Page(orders, filter, total);
  }

  private findWithTotal(filter: OrderFilter) {
    return Promise.all([
      this.respository.count(filter),
      this.respository.find(filter),
    ]);
  }
}
