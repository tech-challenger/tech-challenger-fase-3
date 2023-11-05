/* eslint-disable prettier/prettier */
import { OrderStatus } from './order-status';
import { Product } from './product';
import { Customer } from './customer';
import { Payment } from './payment';
import { AssertionConcern } from '../common/assertion-concern';

export class Order extends AssertionConcern<Order> {
  private _id: string;
  private _products: Product[];
  private _customer: Customer;
  private _payment: Payment;
  private _status: OrderStatus;
  private _leadtime?: Date;

  constructor(
    id: string,
    products: Product[],
    customer: Customer,
    payment: Payment,
    status = OrderStatus.DRAFT,
    leadtime?: Date,
  ) {
    super();
    this._id = id;
    this._products = products;
    this._customer = customer;
    this._payment = payment;
    this._status = status;
    this._leadtime = leadtime;
    this.validate();
  }

  get id() { return this._id; }
  set id(id) { this._id = id; }
  get status() { return this._status; }
  get products() { return this._products; }
  get customer() { return this._customer; }
  get payment() { return this._payment; }
  get leadtime() { return this._leadtime; }

  validate() {
    this.validateProducts();
  }

  update(order: Order) {
    this.validateUpdateAction();
    this.validateProducts();
    this._products = order.products;
    this._payment = order.payment;
    return this;
  }

  confirm() {
    if (OrderStatus.DRAFT !== this._status) {
      throw new Error(`Only orders with status ${OrderStatus.DRAFT} can't be confirmed`); 
    }
    this._status = OrderStatus.RECEIVED;
    return this;
  }

  toJSON() {
    return {
      id: this._id,
      status: this._status,
      products: this._products,
      customer: this._customer,
      payment: this._payment,
      leadtime: this._leadtime,
    };
  }

  toString() {
    return JSON.stringify(this);
  }

  private validateUpdateAction() {
    if (this.canUpdate()) {
      throw new Error(`The Order with status ${this.status} can't be updated`);
    }
  }

  private canUpdate() {
    return OrderStatus.DRAFT !== this.status;
  }

  private validateProducts() {
    this.assertArrayNotEmpty(
      this.products,
      'The Order must have some product.',
    );
  }
}
