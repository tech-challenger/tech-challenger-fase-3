export enum PaymentMethod {
  MERCADO_PAGO = 'MERCADO_PAGO',
}

function fromString(paymentMethod: string): PaymentMethod {
  if (!PaymentMethod[paymentMethod]) {
    throw new Error('payment ' + paymentMethod + 'is not valid');
  }
  return PaymentMethod[paymentMethod];
}

export default {
  PaymentMethod,
  fromString,
};
