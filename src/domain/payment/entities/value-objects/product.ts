import { ProductCategory } from './enums/product-category';

export interface Product {
  name: string;
  category: ProductCategory;
  description: string;
  amount: number;
  quantity?: number;
  notes?: string;
}
