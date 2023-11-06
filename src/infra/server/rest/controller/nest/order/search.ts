import { Controller, Logger, Get, Query } from '@nestjs/common';
import { OrderService } from '../../../../../../domain/service/order/index';
import { OrderQuery, toFilter } from '../../../model/request/order';
import { OrderRespose } from '../../../model/response/order';
import { Page } from '../../../../../../domain/common/page';
import { Order } from '../../../../../../domain/model/order';
import { OrderFilter } from '../../../../../../domain/repository/order/filter';
import { ApiQuery } from '@nestjs/swagger';
import { OrderStatus } from '../../../../../../domain/model/order-status';

@Controller()
export class OrderSearchController {
  private readonly logger = new Logger(OrderSearchController.name);

  constructor(private readonly orderService: OrderService) {}

  @Get('/order')
  @ApiQuery({ name: 'orderId', required: false })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'status', enum: OrderStatus, required: false })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  async search(@Query() query: OrderQuery) {
    const filter = toFilter(query);
    const orderPage = await this.orderService.search(filter);
    return this.convertToResponse(orderPage, filter);
  }

  private convertToResponse(orderPage: Page<Order>, filter: OrderFilter) {
    const orders = orderPage.items.map((order) =>
      OrderRespose.fromDomain(order),
    );

    return new Page(orders, filter, orderPage.result.total);
  }
}
