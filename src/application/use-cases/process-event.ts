import logger from '@cloud-burger/logger';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { PaymentRepository } from '~/domain/payment/repositories/payment';
import { PaymentService } from '~/domain/payment/services/payment';

interface Input {
  externalId: string;
}

export class ProcessEventUseCase {
  constructor(
    private paymentService: PaymentService,
    private paymentRepository: PaymentRepository,
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

      await this.paymentRepository.update(externalPayment);

      if (externalPayment.status === PaymentStatus.PAID) {
        logger.debug('Update order status');

        // publish updateOrderStatus
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
