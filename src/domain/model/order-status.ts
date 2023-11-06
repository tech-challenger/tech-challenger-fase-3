export enum OrderStatus {
  DRAFT = 'DRAFT',
  RECEIVED = 'RECEIVED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  FINISHED = 'FINISHED',
}

function fromString(orderStatus: string): OrderStatus {
  if (!OrderStatus[orderStatus]) {
    throw new Error('payment ' + orderStatus + 'is not valid');
  }
  return OrderStatus[orderStatus];
}

export default {
  OrderStatus,
  fromString,
};
