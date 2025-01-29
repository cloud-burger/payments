import { OrderStatus } from '~/domain/payment/entities/value-objects/enums/order-status';
import { ProductCategory } from '~/domain/payment/entities/value-objects/enums/product-category';

export interface FindOrderByIdResponse {
  id: string;
  amount: number;
  number: number;
  customer?: CustomerResponse;
  status: OrderStatus;
  products: ProductResponse[];
}

interface CustomerResponse {
  id: string;
  documentNumber: string;
  name: string;
  email: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  amount: number;
  image?: any;
  notes?: string;
  quantity?: number;
}
