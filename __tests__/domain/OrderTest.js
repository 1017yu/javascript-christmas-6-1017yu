/* eslint-disable max-lines-per-function */
import { ERROR_MESSAGES } from '../../src/constants/messages.js';
import Order from '../../src/domain/Order.js';

describe('Order 클래스 테스트', () => {
  test('입력 받은 주문 내역을 파싱하면, Set 배열로 반환한다.', () => {
    // GIVEN
    const orderInput = '티본스테이크-1,레드와인-1';

    // WHEN
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '레드와인', quantity: 1 },
    ];

    // THEN
    expect(Array.isArray(orderList)).toBe(true);
    expect(new Order(orderInput).getOrderList()).toEqual(orderList);
  });

  test('유효하지 않은 메뉴 이름을 입력하면, 에러를 던진다.', () => {
    // GIVEN
    const orderInput =
      (['해산물파스타-1,타코-1'],
      ['제로콜라-1,레드와인-1'],
      ['시저샐러드-1,시저샐러드-1']);

    // WHEN && THEN
    orderInput.forEach(order => {
      expect(() => new Order(order)).toThrow(ERROR_MESSAGES.prefix);
    });
  });

  test('유효하지 않은 메뉴 개수를 입력하면, 에러를 던진다.', () => {
    // GIVEN
    const orderInput =
      (['해산물파스타-1a,레드와인-1'],
      ['해산물파스타-10,레드와인-10,시저샐러드-10'],
      ['해산물파스타-0,시저샐러드-21']);

    // WHEN && THEN
    orderInput.forEach(order => {
      expect(() => new Order(order)).toThrow(ERROR_MESSAGES.prefix);
    });
  });
});
