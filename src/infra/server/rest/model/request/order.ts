import { Order } from '../../../../../domain/model/order';
import { ProductRequest } from './product';
import { CustomerRequest } from './customer';
import { PaymentRequest } from './payment';
import { IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Query } from './query';
import { OrderFilter } from '../../../../../domain/repository/order/filter';
import { ApiProperty } from '@nestjs/swagger';

export class OrderRequest {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductRequest)
  products: ProductRequest[];

  @ApiProperty()
  @IsObject({ always: false })
  @ValidateNested()
  @Type(() => CustomerRequest)
  customer: CustomerRequest;

  @ApiProperty()
  @IsObject({ always: false })
  @ValidateNested()
  @Type(() => PaymentRequest)
  payment: PaymentRequest;

  toDomain() {
    const products = [];
    if (this.products) {
      this.products.forEach((p) => products.push(p.toDomain()));
    }
    const customer = this.customer?.toDomain();
    const payment = this.payment?.toDomain();
    return new Order(null, products, customer, payment);
  }
}

export type OrderQuery = {
  status: string;
  orderId: string;
  customerId: string;
  offset: string;
  limit: string;
};

export function toFilter(query: OrderQuery) {
  return new OrderFilter(
    query.status,
    query.orderId,
    query.customerId,
    parseInt(query.offset),
    parseInt(query.limit),
  );
}
