import logger from '@cloud-burger/logger';
import { Payment } from '~/domain/payment/entities/payment';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { PaymentPublisher } from '~/domain/payment/publisher/payment';
import { PaymentRepository } from '~/domain/payment/repositories/payment';
import { PaymentService } from '~/domain/payment/services/payment';

interface Input {
  externalId: string;
}

export class ProcessEventUseCase {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentPublisher: PaymentPublisher,
  ) {}

  async execute({ externalId }: Input): Promise<void> {
    try {
      const externalPayment =
        await this.paymentService.findByExternalId(externalId);

      const payment = await this.paymentRepository.findById(externalPayment.id);

      logger.debug({
        message: 'Set payment info',
        data: {
          payment,
          externalPayment,
        },
      });

      payment.setStatus(externalPayment.status);
      payment.setExternalId(externalPayment.externalId);

      await this.paymentRepository.update(payment);

      logger.debug({
        message: 'Payment updated',
        data: {
          payment,
          externalPayment,
        },
      });

      if (externalPayment.status === PaymentStatus.PAID) {
        logger.debug({
          message: 'Update order status',
          data: payment,
        });

        await this.paymentPublisher.processPayment(
          new Payment({
            ...externalPayment,
            ...payment,
          }),
        );
      }
    } catch (error) {
      logger.error({
        message: 'Unknown error while process event',
        data: error,
      });

      return;
    }
  }
}
