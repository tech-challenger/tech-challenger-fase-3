import { Order } from '../../../../../domain/model/order';
import { ProductResponse } from './product';
import { CustomerResponse } from './customer';
import { OrderStatus } from '../../../../../domain/model/order-status';
import { PaymentResponse } from './payment';

export class OrderRespose {
  constructor(
    readonly status = OrderStatus.RECEIVED,
    readonly products: ProductResponse[],
    readonly customer: CustomerResponse,
    readonly payment: PaymentResponse,
    readonly leadtime: Date,
  ) {}

  static fromDomain(order: Order) {
    const products = [];

    if (order.products) {
      order.products.forEach((p) =>
        products.push(ProductResponse.fromDomain(p)),
      );
    }

    const customer = CustomerResponse.fromDomain(order.customer);

    const payment = PaymentResponse.fromDomain(order.payment);

    return new OrderRespose(
      order.status,
      products,
      customer,
      payment,
      order.leadtime,
    );
  }
}
