import { Payment } from './payment';
import { OrderStatus } from './value-objects/enums/order-status';
import { ProductCategory } from './value-objects/enums/product-category';

describe('payment', () => {
  it('should create payment entity', () => {
    const payment = new Payment({
      id: '8cdc0c47-ea35-424a-b016-2d8b9c1381e0',
      amount: 10,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    });

    expect(payment).toEqual({
      id: '8cdc0c47-ea35-424a-b016-2d8b9c1381e0',
      status: 'WAITING_PAYMENT',
      amount: 10,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    });

    payment.setEmv(
      '00020101021226940014BR.GOV.BCB.PIX2572pix-qr-h.mercadopago.com/instore/h/p/v2/6bc7048752b6451a95ce9f0259187e5843540016com.mercadolibre0130https://mpago.la/pos/1045739825204000053039865802BR5909Test Test6009SAO PAULO62070503***63043314',
    );
    payment.setExternalId(123);
    payment.setOrder({
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
    });

    expect(payment).toEqual({
      amount: 10,
      createdAt: new Date('2023-01-01'),
      emv: '00020101021226940014BR.GOV.BCB.PIX2572pix-qr-h.mercadopago.com/instore/h/p/v2/6bc7048752b6451a95ce9f0259187e5843540016com.mercadolibre0130https://mpago.la/pos/1045739825204000053039865802BR5909Test Test6009SAO PAULO62070503***63043314',
      externalId: 123,
      id: '8cdc0c47-ea35-424a-b016-2d8b9c1381e0',
      order: {
        amount: 20.99,
        customer: {
          documentNumber: '53523992060',
          email: 'johndue@gmail.com',
          id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
          name: 'John Due',
        },
        id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
        number: 123,
        products: [
          {
            amount: 20.99,
            category: 'BURGER',
            description:
              'Hambúrguer com bacon crocante, queijo cheddar e molho barbecue.',
            name: 'Bacon Burger',
            notes: 'Sem bacon',
            quantity: 1,
          },
        ],
        status: 'RECEIVED',
      },
      status: 'WAITING_PAYMENT',
      updatedAt: new Date('2023-01-01'),
    });
  });
});
