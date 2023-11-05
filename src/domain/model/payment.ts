import { PaymentMethod } from './payment-method';
import { AssertionConcern } from '../common/assertion-concern';
export class Payment extends AssertionConcern<Payment> {
  constructor(readonly id: string, readonly name: PaymentMethod) {
    super();
    this.validate();
  }

  validate() {
    this.assertArgumentNotEmpty(
      this.name,
      'The Payment name must have some value.',
    );
  }
}
