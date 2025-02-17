import { Controller, Request, Response } from '@cloud-burger/handlers';
import logger from '@cloud-burger/logger';
import { PaymentStatusResponse } from '~/presenters/dtos/payment-status-response';
import { GetPaymentStatusByOrderPresenter } from '~/presenters/get-payment-status-by-order';
import { GetStatusByOrderUseCase } from '~/use-cases/get-status-by-order';

export class GetStatusByOrderController {
  constructor(
    private readonly getStatusByOrderUseCase: GetStatusByOrderUseCase,
  ) {}

  handler: Controller = async (
    request: Request,
  ): Promise<Response<PaymentStatusResponse>> => {
    const { orderId } = request.pathParameters;

    logger.info({
      message: 'Get status by order id request',
      data: request,
    });

    const payment = await this.getStatusByOrderUseCase.execute({
      orderId,
    });

    logger.info({
      message: 'Get status by order id response',
      data: payment,
    });

    return {
      statusCode: 200,
      body: GetPaymentStatusByOrderPresenter.toHttp(payment),
    };
  };
}
