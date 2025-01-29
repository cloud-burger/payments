import { ApiHandler } from '@cloud-burger/handlers';
import logger from '@cloud-burger/logger';
import { Request, Response } from 'express';
import { env } from '~/api/env';
import Connection from '~/api/postgres/connection';
import Pool from '~/api/postgres/pool';
import { PoolFactory } from '~/api/postgres/pool-factory';
import { CreatePaymentController } from '~/controllers/create';
import { PaymentService } from '~/domain/payment/services/payment';
import { PaymentRepository } from '~/infrastructure/database/payment-repository';
import { MercadoPagoService } from '~/infrastructure/service/mercado-pago/mercado-pago-service';
import { OrdersService } from '~/infrastructure/service/orders/orders-service';
import { CreatePaymentUseCase } from '~/use-cases/create';

let pool: Pool;
let paymentRepository: PaymentRepository;
let createPaymentUseCase: CreatePaymentUseCase;
let paymentServices: PaymentService;
let ordersService: OrdersService;
let createPaymentController: CreatePaymentController;
let apiHandler: ApiHandler;

const setDependencies = (connection: Connection) => {
  paymentRepository = new PaymentRepository(connection);
  paymentServices = new MercadoPagoService(
    env.MERCADO_PAGO_CREATE_QR_API_URL,
    env.MERCADO_PAGO_API_TOKEN,
  );
  ordersService = new OrdersService(env.ORDERS_URL);
  createPaymentUseCase = new CreatePaymentUseCase(
    paymentServices,
    paymentRepository,
    ordersService,
  );
  createPaymentController = new CreatePaymentController(createPaymentUseCase);
  apiHandler = new ApiHandler(createPaymentController.handler);
};

export const createPayment = async (
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
