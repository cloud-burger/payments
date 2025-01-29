import { Payment } from '~/domain/payment/entities/payment';
import { OrderStatus } from '~/domain/payment/entities/value-objects/enums/order-status';
import { PaymentStatus } from '~/domain/payment/entities/value-objects/enums/payment-status';
import { ProductCategory } from '~/domain/payment/entities/value-objects/enums/product-category';

export const makePayment = (override: Partial<Payment> = {}): Payment =>
  new Payment({
    id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    amount: 20.99,
    status: PaymentStatus.WAITING_PAYMENT,
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
    createdAt: new Date('2024-07-12T22:18:26.351Z'),
    updatedAt: new Date('2024-07-12T22:18:26.351Z'),
    ...override,
  });
