import { Customer } from './customer';
import { OrderStatus } from './enums/order-status';
import { Product } from './product';

export interface Order {
  id: string;
  amount?: number;
  number?: number;
  products?: Product[];
  customer?: Customer;
  status?: OrderStatus;
}
