import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';

export interface PaymentResponse {
  id: string;
  amount: number;
  status: PaymentStatus;
  orderId: string;
  emv: string;
}
