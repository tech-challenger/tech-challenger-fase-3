import { Payment } from 'src/domain/model/payment';
import { PaymentMethod } from '../../../../../domain/model/payment-method';

export class PaymentResponse {
  constructor(readonly name: PaymentMethod) {}

  static fromDomain(payment: Payment) {
    return new PaymentResponse(payment.name);
  }
}
