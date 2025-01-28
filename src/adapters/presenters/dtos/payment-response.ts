import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';

export interface PaymentResponse {
  id: string;
  amount: string;
  status: PaymentStatus;
  orderId: string;
  emv: string;
}
