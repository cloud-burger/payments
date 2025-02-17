import { get } from '@cloud-burger/http-wrappers';
import { Order } from '~/domain/payment/entities/value-objects/order';
import { OrderService } from '~/domain/payment/services/orders';
import { FindOrderByIdResponse } from './dtos/find-order-by-id-response';

export class OrdersService implements OrderService {
  constructor(private readonly ordersUrl: string) {}

  async findById(id: string): Promise<Order> {
    const { data } = await get<FindOrderByIdResponse>({
      url: `${this.ordersUrl}/${id}`,
    });

    return data;
  }
}
