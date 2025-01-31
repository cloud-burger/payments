import { sendMessage } from '@cloud-burger/aws-wrappers';
import { Payment } from '~/domain/payment/entities/payment';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { SqsPaymentPublisher } from './payment-publisher';

jest.mock('@cloud-burger/aws-wrappers');

describe('sqs payment publisher', () => {
  const sendMessageMock = jest.mocked(sendMessage);
  let paymentPublisher: SqsPaymentPublisher;

  beforeAll(() => {
    paymentPublisher = new SqsPaymentPublisher(
      'sqs.com/update-order-status-queue-url',
    );
  });

  it('should publish process payment message successfully', async () => {
    await paymentPublisher.processPayment(
      new Payment({
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
        amount: 20.99,
        status: PaymentStatus.PAID,
        order: { id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e' },
        createdAt: new Date('2024-07-12T22:18:26.351Z'),
        updatedAt: new Date('2024-07-12T22:18:26.351Z'),
        externalId: 12345,
      }),
    );

    expect(sendMessageMock).toHaveBeenNthCalledWith(1, {
      MessageBody: JSON.stringify({
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
        amount: 20.99,
        status: 'PAID',
        order: { id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e' },
        createdAt: '2024-07-12T22:18:26.351Z',
        updatedAt: '2024-07-12T22:18:26.351Z',
        externalId: 12345,
      }),
      QueueUrl: 'sqs.com/update-order-status-queue-url',
    });
  });
});
