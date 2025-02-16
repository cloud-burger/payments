import logger from '@cloud-burger/logger';
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

      payment.status = externalPayment.status;
      payment.setExternalId(externalPayment.externalId);

      await this.paymentRepository.update(payment);

      if (externalPayment.status === PaymentStatus.PAID) {
        logger.debug('Update order status');

        await this.paymentPublisher.processPayment(externalPayment);
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
