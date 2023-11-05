import { ObjectId } from 'mongodb';
import { CustomerDocument } from 'src/infra/datastore/mongo/customer/doc';
export type OrderDocument = {
  _id: ObjectId;
  status: string;
  products: ProductDocument[];
  customer: CustomerDocument;
  payment: PaymentDocument;
  leadtime?: Date;
  lastModifiedAt: Date;
  lastModifiedBy: string;
};
