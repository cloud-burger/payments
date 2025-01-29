import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { DatabasePaymentMapper } from './database-payment';

describe('database payment mapper', () => {
  it('should map to domain', () => {
    expect(
      DatabasePaymentMapper.toDomain({
        id: '123',
        amount: 31,
        order_id: '1376c2b4-74bd-477c-8f44-7cc593e8c734',
        status: PaymentStatus.PAID,
        emv: '00020101021123450016',
        external_id: 1234557,
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
      }),
    ).toEqual({
      id: '123',
      amount: 31,
      status: PaymentStatus.PAID,
      order: {
        id: '1376c2b4-74bd-477c-8f44-7cc593e8c734',
      },
      emv: '00020101021123450016',
      externalId: 1234557,
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-01T00:00:00.000Z'),
    });

    expect(
      DatabasePaymentMapper.toDomain({
        id: '123',
        amount: 31,
        order_id: '',
        status: PaymentStatus.PAID,
        emv: '00020101021123450016',
        external_id: 1234557,
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
      }),
    ).toEqual({
      id: '123',
      amount: 31,
      status: PaymentStatus.PAID,
      order: null,
      emv: '00020101021123450016',
      externalId: 1234557,
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2023-01-01T00:00:00.000Z'),
    });
  });
});
