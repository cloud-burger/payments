import { Entity, EntityProps } from '~/domain/core/entities/entity';
import { PaymentStatus } from './value-objects/enums/payment-status';
import { Order } from './value-objects/order';

export interface PaymentProps extends EntityProps {
  amount: number;
  order?: Order;
  emv?: string;
  status?: PaymentStatus;
  externalId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment extends Entity {
  amount: number;
  status: PaymentStatus;
  order?: Order;
  emv?: string;
  externalId?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(input: PaymentProps) {
    super(input.id);

    input.status = input.status ?? PaymentStatus.WAITING_PAYMENT;
    input.createdAt = input.createdAt ?? new Date();
    input.updatedAt = input.updatedAt ?? new Date();

    Object.assign(this, input);
  }

  setStatus(status: PaymentStatus) {
    this.status = status;
  }

  setExternalId(externalId: number) {
    this.externalId = externalId;
  }

  setEmv(emv: string) {
    this.emv = emv;
  }

  setOrder(order: Order) {
    this.order = order;
  }
}
