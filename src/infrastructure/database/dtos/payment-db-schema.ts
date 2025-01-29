export interface PaymentsDbSchema {
  id: string;
  amount: number;
  order_id: string;
  emv: string;
  external_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}
