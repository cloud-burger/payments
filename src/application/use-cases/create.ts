import { ConflictError } from '@cloud-burger/handlers';
import logger from '@cloud-burger/logger';
import { Payment } from '~/domain/payment/entities/payment';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { PaymentRepository } from '~/domain/payment/repositories/payment';
import { PaymentService } from '~/domain/payment/services/payment';

interface Input {
  orderId: string;
}

export class CreatePaymentUseCase {
  constructor(
    private paymentService: PaymentService,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute({ orderId }: Input): Promise<Payment> {
    const existentPayment = await this.paymentRepository.findByOrderId(orderId);

    if (existentPayment) {
      const isOrderAlreadyPaid = existentPayment.status === PaymentStatus.PAID;

      if (isOrderAlreadyPaid) {
        logger.warn({
          message: 'Payment already confirmed',
          data: existentPayment,
        });

        throw new ConflictError('Payment already confirmed');
      }

      logger.debug({
        message: 'Order already have a existent payment',
        data: existentPayment,
      });

      return existentPayment;
    }

    // orderService.findById() ->> orders api | sync

    // const order = null;

    // if (!order) {
    //   logger.warn({
    //     message: 'Order not found',
    //     data: { orderId },
    //   });

    //   throw new NotFoundError('Order not found');
    // }

    const payment = await this.paymentService.create(
      new Payment({
        amount: 10, // mocked
        order: {
          id: '123', //mocked
        },
      }),
    );

    await this.paymentRepository.create(payment);

    logger.debug({
      message: 'Payment created',
      data: payment,
    });

    return payment;
  }
}
