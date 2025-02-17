import { sendMessage } from '@cloud-burger/aws-wrappers';
import { Payment } from '~/domain/payment/entities/payment';
import { PaymentPublisher } from '~/domain/payment/publisher/payment';

export class SqsPaymentPublisher implements PaymentPublisher {
  constructor(private readonly updateOrderStatusQueueUrl: string) {}

  async processPayment(payment: Payment): Promise<void> {
    await sendMessage({
      MessageBody: JSON.stringify(payment),
      QueueUrl: this.updateOrderStatusQueueUrl,
    });
  }
}
