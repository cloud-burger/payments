import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';

export interface PaymentStatusResponse {
  id: string;
  status: PaymentStatus;
}
