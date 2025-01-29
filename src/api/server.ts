import logger from '@cloud-burger/logger';
import cors from 'cors';
import express, { Router } from 'express';
import { env } from './env';

import { createPayment } from './handlers/create';
import { getPaymentStatusByOrderId } from './handlers/get-status-by-order';
import { webhook } from './handlers/webhook';

const app = express();
const PORT = +env.PORT;

const router = Router();

// Payment
router.get('/payment/:orderId', getPaymentStatusByOrderId);
router.post('/payment', createPayment);

// Webhook
router.post('/webhook', webhook);

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  logger.info({
    message: `App listening on port ${PORT}`,
  });
});
