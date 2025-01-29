import { Order } from '../entities/value-objects/order';

export interface OrderService {
  findById(id: string): Promise<Order>;
}
