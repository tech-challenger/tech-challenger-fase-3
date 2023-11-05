import * as sinon from 'sinon';
import { Product } from '../../model/product';
import { OrderService } from '.';
import { Order } from '../../model/order';
import { OrderRepositoryMock } from '../../repository/order/mock';
import { OrderFilter } from '../../repository/order/filter';
import { Customer } from '../../model/customer';
import { Payment } from '../../model/payment';
import { PaymentMethod } from '../../model/payment-method';
import { OrderStatus } from '../../model/order-status';
import { OrderQueueMock } from '../../queue/order/mock';

describe('OrderService', () => {
  const repository = new OrderRepositoryMock();
  const queue = new OrderQueueMock();
  const service = new OrderService(repository, queue);

  describe('create', () => {
    const sandbox = sinon.createSandbox();
    let repositoryStub: sinon.SinonStubbedInstance<OrderRepositoryMock>;

    beforeEach(() => {
      repositoryStub = sandbox.stub(repository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call repository create and promise reject', async () => {
      const createSpy = repositoryStub.create.rejects({ message: 'test' });
      const order = new Order(
        null,
        [new Product(null, 'Test')],
        null,
        null,
        null,
      );

      expect.assertions(2);
      await expect(service.create(order)).rejects.toEqual({ message: 'test' });
      expect(createSpy.firstCall.args).toEqual([order]);
    });

    it('should call repository create and promise resolve', async () => {
      const createSpy = repositoryStub.create.resolves('order-id');
      const order = new Order(
        null,
        [new Product(null, 'Test')],
        null,
        null,
        null,
      );

      expect.assertions(2);
      await expect(service.create(order)).resolves.toEqual('order-id');
      expect(createSpy.firstCall.args).toEqual([order]);
    });
  });

  describe('search', () => {
    const sandbox = sinon.createSandbox();
    let repositoryStub: sinon.SinonStubbedInstance<OrderRepositoryMock>;

    beforeEach(() => {
      repositoryStub = sandbox.stub(repository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call repository search and promise reject', async () => {
      const findSpy = repositoryStub.find.rejects({ message: 'test' });
      const filter = new OrderFilter(
        OrderStatus.DRAFT,
        'orderId_1',
        'customerId_1',
      );

      expect.assertions(2);
      await expect(service.search(filter)).rejects.toEqual({ message: 'test' });
      expect(findSpy.firstCall.args).toEqual([{ ...filter }]);
    });

    it('should call repository search and promise reject when call count', async () => {
      const expectedOrder = new Order(
        null,
        [new Product(null, 'product_a'), new Product(null, 'product_b')],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      const findSpy = repositoryStub.find.resolves([expectedOrder]);
      const countSpy = repositoryStub.count.rejects({ message: 'test' });
      const filter = new OrderFilter(
        OrderStatus.DRAFT,
        'orderId_1',
        'customerId_1',
      );

      expect.assertions(3);
      await expect(service.search(filter)).rejects.toEqual({ message: 'test' });
      expect(countSpy.firstCall.args).toEqual([{ ...filter }]);
      expect(findSpy.firstCall.args).toEqual([{ ...filter }]);
    });

    it('should call repository search and promise resolve', async () => {
      const orderMock = new Order(
        null,
        [new Product(null, 'product_a'), new Product(null, 'product_b')],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      const findSpy = repositoryStub.find.resolves([orderMock]);
      const countSpy = repositoryStub.count.resolves(10);
      const filter = new OrderFilter(
        OrderStatus.DRAFT,
        'orderId_1',
        'customerId_1',
      );

      const expected = {
        items: [
          new Order(
            null,
            [new Product(null, 'product_a'), new Product(null, 'product_b')],
            new Customer('', 'customer_a', ''),
            new Payment(null, PaymentMethod.MERCADO_PAGO),
          ),
        ],
        result: { limit: 10, offset: 0, total: 10 },
      };

      expect.assertions(3);
      await expect(service.search(filter)).resolves.toEqual(expected);
      expect(countSpy.firstCall.args).toEqual([{ ...filter }]);
      expect(findSpy.firstCall.args).toEqual([{ ...filter }]);
    });
  });

  describe('update', () => {
    const sandbox = sinon.createSandbox();
    let repositoryStub: sinon.SinonStubbedInstance<OrderRepositoryMock>;

    beforeEach(() => {
      repositoryStub = sandbox.stub(repository);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call repository update and promise reject when call findById', async () => {
      const findByIdSpy = repositoryStub.findById.rejects({ message: 'test' });
      const orderMock = new Order(
        null,
        [new Product(null, 'product_a'), new Product(null, 'product_b')],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      orderMock.id = 'order-id';

      expect.assertions(3);
      await expect(service.update(orderMock)).rejects.toEqual({
        message: 'test',
      });
      expect(findByIdSpy.firstCall.args).toEqual(['order-id']);
      expect(repositoryStub.update.called).toBeFalsy();
    });

    it('should call repository update and promise reject when call update', async () => {
      const orderFromRepository = new Order(
        null,
        [new Product(null, 'product_a')],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      orderFromRepository.id = 'order-id';

      const findByIdSpy = repositoryStub.findById.resolves(orderFromRepository);
      const updateSpy = repositoryStub.update.rejects({ message: 'test' });

      const orderToUpdate = new Order(
        null,
        [
          new Product(null, 'product_a_update'),
          new Product(null, 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      orderToUpdate.id = 'order-id';

      const orderMerged = new Order(
        null,
        [
          new Product(null, 'product_a_update'),
          new Product(null, 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      orderMerged.id = 'order-id';

      expect.assertions(3);
      await expect(service.update(orderToUpdate)).rejects.toEqual({
        message: 'test',
      });
      expect(findByIdSpy.firstCall.args).toEqual(['order-id']);
      expect(updateSpy.firstCall.args).toEqual([orderMerged]);
    });

    it('should call repository update and promise resolve', async () => {
      const orderFromRepository = new Order(
        null,
        [new Product(null, 'product_a')],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      orderFromRepository.id = 'order-id';

      const findByIdSpy = repositoryStub.findById.resolves(orderFromRepository);
      const updateSpy = repositoryStub.update.resolves();

      const orderToUpdate = new Order(
        null,
        [
          new Product(null, 'product_a_update'),
          new Product(null, 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      orderToUpdate.id = 'order-id';

      const orderMerged = new Order(
        null,
        [
          new Product(null, 'product_a_update'),
          new Product(null, 'product_b_update'),
        ],
        new Customer('', 'customer_a', ''),
        new Payment(null, PaymentMethod.MERCADO_PAGO),
      );
      orderMerged.id = 'order-id';

      expect.assertions(3);
      await expect(service.update(orderToUpdate)).resolves.toEqual(undefined);
      expect(findByIdSpy.firstCall.args).toEqual(['order-id']);
      expect(updateSpy.firstCall.args).toEqual([orderMerged]);
    });
  });
});
