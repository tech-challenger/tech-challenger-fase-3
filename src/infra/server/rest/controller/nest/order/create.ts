import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Order } from 'src/domain/model/order';
import { OrderService } from '../../../../../../domain/service/order/index';
import { OrderRequest } from '../../../model/request/order';

@Controller()
export class OrderCreateController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/order')
  async create(@Body() dto: OrderRequest, @Res() res) {
    let order: Order;

    try {
      order = dto.toDomain();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const createdId = await this.orderService.create(order);

    res
      .status(HttpStatus.CREATED)
      .location('/order/' + createdId)
      .json(createdId);
  }
}
