import { Customer } from './customer';
import { Order } from './order';
import { OrderStatus } from './order-status';
import { Payment } from './payment';
import { PaymentMethod } from './payment-method';
import { Product } from './product';

describe('OrderService', () => {
  describe('domain:model:order', () => {
    it('should throw error when products is empty', () => {
      expect(() => new Order(null, null, null, null)).toThrowError(
        'The Order must have some product.',
      );
    });
  });

  describe('domain:model:order:update()', () => {
    it('should dont allow confirm order with status different of DRAFT', () => {
      const order = new Order(
        null,
        [
          new Product('', 'product_a_update'),
          new Product('', 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
      );
      order.id = 'order-id';
      order.confirm();

      expect(() => order.confirm()).toThrowError(
        "Only orders with status DRAFT can't be confirmed",
      );
    });

    it('should confirm order with status DRAFT', () => {
      const order = new Order(
        '',
        [
          new Product('', 'product_a_update'),
          new Product('', 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
      );
      order.id = 'order-id';

      expect(() => order.confirm()).not.toThrowError(
        'Only orders with status DRAFT cant be confirmed',
      );
    });

    it('should dont allow update order different of DRAFT', () => {
      const update = new Order(
        '',
        [
          new Product('', 'product_a_update'),
          new Product('', 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
      );
      const order = new Order(
        '',
        [
          new Product('', 'product_a_update'),
          new Product('', 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
      );
      order.id = 'order-id';
      order.confirm();

      expect(() => order.update(update)).toThrowError(
        `The Order with status ${order.status} can't be updated`,
      );
    });

    it('should dont allow confirm order with status different of DRAFT', () => {
      const order = new Order(
        '',
        [
          new Product('', 'product_a_update'),
          new Product('', 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
      );
      order.id = 'order-id';
      order.confirm();

      expect(() => order.confirm()).toThrowError(
        "Only orders with status DRAFT can't be confirmed",
      );
    });

    it('should update with partial changes', () => {
      const data = new Date();
      const order = new Order(
        '',
        [new Product('', 'product_a'), new Product('', 'product_b')],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
        OrderStatus.DRAFT,
        data,
      );
      order.id = 'order-id';

      const orderUpdate = new Order(
        '',
        [
          new Product('', 'product_a_update'),
          new Product('', 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
      );
      orderUpdate.id = 'order-id_update';

      const orderMerged = new Order(
        '',
        [
          new Product('', 'product_a_update'),
          new Product('', 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment('', PaymentMethod.MERCADO_PAGO),
        OrderStatus.DRAFT,
        data,
      );
      orderMerged.id = 'order-id';

      expect(order.update(orderUpdate)).toEqual(orderMerged);
    });
  });
});
