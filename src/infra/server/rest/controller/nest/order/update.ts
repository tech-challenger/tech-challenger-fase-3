import {
  BadRequestException,
  Body,
  Controller,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Order } from 'src/domain/model/order';
import { OrderService } from '../../../../../../domain/service/order/index';
import { OrderRequest } from '../../../model/request/order';
import { Param } from '@nestjs/common';

@Controller()
export class OrderUpdateController {
  constructor(private readonly orderService: OrderService) {}

  @Put('/order/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() dto: OrderRequest) {
    let order: Order;

    try {
      order = dto.toDomain();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    order.id = id;

    return this.orderService.update(order);
  }
}
