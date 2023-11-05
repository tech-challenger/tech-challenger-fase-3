import { Customer } from 'src/domain/model/customer';
import { Order } from '../../../../domain/model/order';
import { Product } from '../../../../domain/model/product';
import { Payment } from '../../../../domain/model/payment';
import paymentMethod from '../../../../domain/model/payment-method';
import orderStatus from 'src/domain/model/order-status';
import mongoUtils, { Converter } from '../../../../util/lib/mongodb/converter';
import { OrderDocument } from './doc';

function from({
  _id,
  status,
  customer,
  payment,
  products,
  leadtime,
}: OrderDocument) {
  return new Order(
    _id.toHexString(),
    products.map((doc) => new Product(doc._id, doc.name)),
    new Customer(customer._id, customer.name, customer.cpf),
    new Payment(payment._id, paymentMethod.fromString(payment.name)),
    orderStatus.fromString(status),
    leadtime,
  );
}

function to({ id, status, customer, payment, products, leadtime }) {
  return {
    _id: mongoUtils._id(id),
    status,
    customer: {
      _id: customer.id,
      name: customer.name,
    },
    payment: {
      _id: payment.id,
      name: payment.name,
    },
    products: products.map((p) => ({ _id: p.id, name: p.name })),
    leadtime: leadtime,
  };
}

const converter: Converter = {
  from,
  to,
};

export default converter;
