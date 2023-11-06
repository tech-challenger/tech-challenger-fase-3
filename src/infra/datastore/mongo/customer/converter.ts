import { Customer } from 'src/domain/model/customer';
import mongoUtils, { Converter } from '../../../../util/lib/mongodb/converter';
import { CustomerDocument } from './doc';

function from({
  _id,
}: CustomerDocument) {
  return new Customer(
    '', '', ''
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
