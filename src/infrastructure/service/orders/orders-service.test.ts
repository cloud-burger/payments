import { get } from '@cloud-burger/http-wrappers';
import { OrderStatus } from '~/domain/payment/entities/value-objects/enums/order-status';
import { ProductCategory } from '~/domain/payment/entities/value-objects/enums/product-category';
import { OrdersService } from './orders-service';

jest.mock('@cloud-burger/http-wrappers');

describe('mercado pago service', () => {
  const getMock = jest.mocked(get);
  let ordersService: OrdersService;

  beforeAll(() => {
    ordersService = new OrdersService('http://api.orders.com');
  });

  it('should find order by id successfully', async () => {
    getMock.mockResolvedValue({
      data: {
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
      status: 200,
    });

    const order = await ordersService.findById(
      'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    );

    expect(order).toEqual({
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
    });
    expect(getMock).toHaveBeenNthCalledWith(1, {
      url: 'http://api.orders.com/eba521ba-f6b7-46b5-ab5f-dd582495705e',
    });
  });
});
