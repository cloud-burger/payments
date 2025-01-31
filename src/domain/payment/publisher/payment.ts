import { Payment } from '../entities/payment';

export interface PaymentPublisher {
  processPayment(payment: Payment): Promise<void>;
}
