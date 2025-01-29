import { mock, MockProxy } from 'jest-mock-extended';
import { makePayment } from 'tests/factories/make-payment';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { PaymentRepository } from '~/domain/payment/repositories/payment';
import { PaymentService } from '~/domain/payment/services/payment';
import { CreatePaymentUseCase } from './create';

describe('create payment use case', () => {
  let paymentService: MockProxy<PaymentService>;
  let paymentRepository: MockProxy<PaymentRepository>;
  let createPaymentUseCase: CreatePaymentUseCase;

  beforeAll(() => {
    paymentService = mock();
    paymentRepository = mock();
    createPaymentUseCase = new CreatePaymentUseCase(
      paymentService,
      paymentRepository,
    );
  });

  it('should throw conflict error when payment already has been confirmed', async () => {
    paymentRepository.findByOrderId.mockResolvedValue(
      makePayment({ status: PaymentStatus.PAID }),
    );

    await expect(
      createPaymentUseCase.execute({
        orderId: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      }),
    ).rejects.toThrow('Payment already confirmed');

    expect(paymentRepository.findByOrderId).toHaveBeenNthCalledWith(
      1,
      'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    );
  });

  it('should return existent payment', async () => {
    paymentRepository.findByOrderId.mockResolvedValue(makePayment());

    const payment = await createPaymentUseCase.execute({
      orderId: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    });

    expect(payment).toEqual({
      amount: 20.99,
      createdAt: expect.any(Date),
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      order: {
        amount: 20.99,
        customer: {
          documentNumber: '53523992060',
          email: 'johndue@gmail.com',
          id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
          name: 'John Due',
        },
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
        number: 123,
        products: [
          {
            amount: 20.99,
            category: 'BURGER',
            description:
              'Hambúrguer com bacon crocante, queijo cheddar e molho barbecue.',
            name: 'Bacon Burger',
            notes: 'Sem bacon',
            quantity: 1,
          },
        ],
        status: 'RECEIVED',
      },
      status: 'WAITING_PAYMENT',
      updatedAt: expect.any(Date),
    });
    expect(paymentRepository.findByOrderId).toHaveBeenNthCalledWith(
      1,
      'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    );
    expect(paymentRepository.create).not.toHaveBeenCalled();
  });

  it('should create payment successfully', async () => {
    paymentRepository.findByOrderId.mockResolvedValue(null);
    paymentService.create.mockResolvedValue(
      makePayment({
        emv: '00020101021243650016COM.MERCADOLIBRE0201306364a9e4780-d0a6-42e8-98d7-f6805209d83a5204000053039865802BR5909Test Test6009SAO PAULO62070503***63041A36',
      }),
    );

    const payment = await createPaymentUseCase.execute({
      orderId: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    });

    expect(payment).toEqual({
      amount: 20.99,
      createdAt: expect.any(Date),
      emv: '00020101021243650016COM.MERCADOLIBRE0201306364a9e4780-d0a6-42e8-98d7-f6805209d83a5204000053039865802BR5909Test Test6009SAO PAULO62070503***63041A36',
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      order: {
        amount: 20.99,
        customer: {
          documentNumber: '53523992060',
          email: 'johndue@gmail.com',
          id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
          name: 'John Due',
        },
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
        number: 123,
        products: [
          {
            amount: 20.99,
            category: 'BURGER',
            description:
              'Hambúrguer com bacon crocante, queijo cheddar e molho barbecue.',
            name: 'Bacon Burger',
            notes: 'Sem bacon',
            quantity: 1,
          },
        ],
        status: 'RECEIVED',
      },
      status: 'WAITING_PAYMENT',
      updatedAt: expect.any(Date),
    });

    expect(paymentRepository.findByOrderId).toHaveBeenNthCalledWith(
      1,
      'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    );
    expect(paymentService.create).toHaveBeenNthCalledWith(1, {
      amount: 10,
      createdAt: expect.any(Date),
      id: expect.any(String),
      order: {
        id: '123',
      },
      status: 'WAITING_PAYMENT',
      updatedAt: expect.any(Date),
    });
    expect(paymentRepository.create).toHaveBeenNthCalledWith(1, {
      amount: 20.99,
      createdAt: expect.any(Date),
      emv: '00020101021243650016COM.MERCADOLIBRE0201306364a9e4780-d0a6-42e8-98d7-f6805209d83a5204000053039865802BR5909Test Test6009SAO PAULO62070503***63041A36',
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      order: {
        amount: 20.99,
        customer: {
          documentNumber: '53523992060',
          email: 'johndue@gmail.com',
          id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
          name: 'John Due',
        },
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
        number: 123,
        products: [
          {
            amount: 20.99,
            category: 'BURGER',
            description:
              'Hambúrguer com bacon crocante, queijo cheddar e molho barbecue.',
            name: 'Bacon Burger',
            notes: 'Sem bacon',
            quantity: 1,
          },
        ],
        status: 'RECEIVED',
      },
      status: 'WAITING_PAYMENT',
      updatedAt: expect.any(Date),
    });
  });
});
