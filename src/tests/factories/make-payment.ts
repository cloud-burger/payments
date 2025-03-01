import { Payment } from '~/domain/payment/entities/payment';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';

export const makePayment = (override: Partial<Payment> = {}): Payment =>
  new Payment({
    id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    amount: 20.99,
    status: PaymentStatus.WAITING_PAYMENT,
    order: {
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    },
    createdAt: new Date('2024-07-12T22:18:26.351Z'),
    updatedAt: new Date('2024-07-12T22:18:26.351Z'),
    ...override,
  });
