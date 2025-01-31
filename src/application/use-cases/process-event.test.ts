import { sendMessage } from '@cloud-burger/aws-wrappers';
import { mock, MockProxy } from 'jest-mock-extended';
import { makePayment } from 'tests/factories/make-payment';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { PaymentPublisher } from '~/domain/payment/publisher/payment';
import { PaymentRepository } from '~/domain/payment/repositories/payment';
import { PaymentService } from '~/domain/payment/services/payment';
import { ProcessEventUseCase } from './process-event';

jest.mock('@cloud-burger/aws-wrappers');

describe('process event use case', () => {
  const sendMessageMock = jest.mocked(sendMessage);
  let paymentService: MockProxy<PaymentService>;
  let paymentRepository: MockProxy<PaymentRepository>;
  let paymentPublisher: MockProxy<PaymentPublisher>;
  let processEventUseCase: ProcessEventUseCase;

  beforeAll(() => {
    paymentService = mock();
    paymentRepository = mock();
    paymentPublisher = mock();
    processEventUseCase = new ProcessEventUseCase(
      paymentService,
      paymentRepository,
      paymentPublisher,
    );
  });

  it('should not process event when error', async () => {
    paymentService.findByExternalId.mockRejectedValue(new Error());

    await processEventUseCase.execute({
      externalId: '12345',
    });

    expect(paymentService.findByExternalId).toHaveBeenNthCalledWith(1, '12345');
    expect(paymentRepository.findById).not.toHaveBeenCalled();
    expect(paymentRepository.update).not.toHaveBeenCalled();
    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  it('should process event successfully', async () => {
    paymentService.findByExternalId.mockResolvedValue(
      makePayment({ externalId: 12345 }),
    );
    paymentRepository.findById.mockResolvedValue(makePayment());

    await processEventUseCase.execute({
      externalId: '12345',
    });

    expect(paymentService.findByExternalId).toHaveBeenNthCalledWith(1, '12345');
    expect(paymentRepository.findById).toHaveBeenNthCalledWith(
      1,
      'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    );
    expect(paymentRepository.update).toHaveBeenNthCalledWith(1, {
      amount: 20.99,
      createdAt: expect.any(Date),
      externalId: 12345,
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      order: {
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      },
      status: 'WAITING_PAYMENT',
      updatedAt: expect.any(Date),
    });
    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  it('should process payment event successfully', async () => {
    paymentService.findByExternalId.mockResolvedValue(
      makePayment({ externalId: 12345, status: PaymentStatus.PAID }),
    );
    paymentRepository.findById.mockResolvedValue(makePayment());
    await processEventUseCase.execute({
      externalId: '12345',
    });

    expect(paymentService.findByExternalId).toHaveBeenNthCalledWith(1, '12345');
    expect(paymentRepository.findById).toHaveBeenNthCalledWith(
      1,
      'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    );
    expect(paymentRepository.update).toHaveBeenNthCalledWith(1, {
      amount: 20.99,
      createdAt: expect.any(Date),
      externalId: 12345,
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      order: {
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      },
      status: 'PAID',
      updatedAt: expect.any(Date),
    });
    expect(paymentPublisher.processPayment).toHaveBeenNthCalledWith(1, {
      amount: 20.99,
      createdAt: new Date('2024-07-12T22:18:26.351Z'),
      externalId: 12345,
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      order: { id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e' },
      status: 'PAID',
      updatedAt: new Date('2024-07-12T22:18:26.351Z'),
    });
  });
});
