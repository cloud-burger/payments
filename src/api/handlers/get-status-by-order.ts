import { ApiHandler } from '@cloud-burger/handlers';
import logger from '@cloud-burger/logger';
import { Request, Response } from 'express';
import Connection from '~/api/postgres/connection';
import Pool from '~/api/postgres/pool';
import { PoolFactory } from '~/api/postgres/pool-factory';
import { GetStatusByOrderController } from '~/controllers/get-status-by-order';
import { PaymentRepository } from '~/infrastructure/database/payment-repository';
import { GetStatusByOrderUseCase } from '~/use-cases/get-status-by-order';

let pool: Pool;
let paymentRepository: PaymentRepository;
let getStatusByOrderUseCase: GetStatusByOrderUseCase;
let getStatusByOrderController: GetStatusByOrderController;
let apiHandler: ApiHandler;

const setDependencies = (connection: Connection) => {
  paymentRepository = new PaymentRepository(connection);
  getStatusByOrderUseCase = new GetStatusByOrderUseCase(paymentRepository);
  getStatusByOrderController = new GetStatusByOrderController(
    getStatusByOrderUseCase,
  );
  apiHandler = new ApiHandler(getStatusByOrderController.handler);
};

export const getPaymentStatusByOrderId = async (
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
