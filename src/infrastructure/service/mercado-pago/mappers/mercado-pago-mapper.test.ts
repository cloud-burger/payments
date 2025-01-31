import { makePayment } from 'tests/factories/make-payment';
import { OrderStatus } from '~/domain/payment/entities/value-objects/enums/order-status';
import { ProductCategory } from '~/domain/payment/entities/value-objects/enums/product-category';
import { MercadoPagoMapper } from './mercado-pago-mapper';

describe('mercado pago mapper', () => {
  it('should map payment to create payment request', () => {
    expect(
      MercadoPagoMapper.toHttp(
        makePayment({
          order: {
            id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
            amount: 20.99,
            number: 123,
            customer: {
              id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
              documentNumber: '53523992060',
              email: 'johndue@gmail.com',
              name: 'John Due',
            },
            products: [
              {
                amount: 20.99,
                category: ProductCategory.BURGER,
                description:
                  'Hambúrguer com bacon crocante, queijo cheddar e molho barbecue.',
                name: 'Bacon Burger',
                quantity: 1,
                notes: 'Sem bacon',
              },
            ],
            status: OrderStatus.RECEIVED,
          },
        }),
      ),
    ).toEqual({
      description: 'SELFSERVICE-123',
      external_reference: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      items: [
        {
          quantity: 1,
          title: 'Bacon Burger',
          total_amount: 20.99,
          unit_measure: 'unit',
          unit_price: 20.99,
        },
      ],
      notification_url: 'http://localhost:9000',
      title: 'SELFSERVICE-123',
      total_amount: 20.99,
    });
  });
});
