import { ApiHandler } from '@cloud-burger/handlers';
import logger from '@cloud-burger/logger';
import { Request, Response } from 'express';
import { env } from '~/api/env';
import Connection from '~/api/postgres/connection';
import Pool from '~/api/postgres/pool';
import { PoolFactory } from '~/api/postgres/pool-factory';
import { EventController } from '~/controllers/event';
import { PaymentService } from '~/domain/payment/services/payment';
import { PaymentRepository } from '~/infrastructure/database/payment-repository';
import { MercadoPagoService } from '~/infrastructure/service/mercado-pago/mercado-pago-service';
import { ProcessEventUseCase } from '~/use-cases/process-event';

let pool: Pool;
let paymentService: PaymentService;
let paymentRepository: PaymentRepository;
let processEventUseCase: ProcessEventUseCase;
let eventController: EventController;
let apiHandler: ApiHandler;

const setDependencies = (connection: Connection) => {
  paymentService = new MercadoPagoService(
    env.MERCADO_PAGO_GET_QR_INFO_API_URL,
    env.MERCADO_PAGO_API_TOKEN,
  );
  paymentRepository = new PaymentRepository(connection);
  processEventUseCase = new ProcessEventUseCase(
    paymentService,
    paymentRepository,
    env.UPDATE_ORDER_STATUS_QUEUE_URL,
  );
  eventController = new EventController(processEventUseCase);
  apiHandler = new ApiHandler(eventController.handler);
};

export const webhook = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  logger.setEvent('payments', request);
  logger.debug({
    message: 'Event received',
    data: request,
  });

  pool = await PoolFactory.getPool();
  const connection = await pool.getConnection();

  setDependencies(connection);

  try {
    return await apiHandler.handler(request, response);
  } finally {
    connection.release();
  }
};
