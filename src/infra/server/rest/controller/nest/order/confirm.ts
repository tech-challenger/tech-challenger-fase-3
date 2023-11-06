import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { OrderService } from '../../../../../../domain/service/order/index';

@Controller()
export class OrderConfirmController {
  constructor(private readonly orderService: OrderService) {}

  @Put('/order/:id/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string) {
    return this.orderService.confirm(id);
  }
}
