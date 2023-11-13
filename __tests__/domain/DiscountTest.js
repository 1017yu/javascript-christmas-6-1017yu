import Discount from '../../src/domain/Discount.js';

describe('Discount 클래스 테스트', () => {
  let preTotalPrice;

  beforeEach(() => {
    preTotalPrice = 142000;
  });

  test('방문 날짜가 1일과 25일 사이라면, 크리스마스 디데이 할인이 적용된다.', () => {
    // GIVEN
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];

    // WHEN
    const discount = new Discount(3, 0, orderList);

    // THEN
    const expected = [
      { title: '크리스마스 디데이 할인', price: 1200 },
      { title: '평일 할인', price: 4046 },
      { title: '특별 할인', price: 1000 },
    ];

    expect(discount.getDiscounts(preTotalPrice)).toEqual(expected);
  });

  test('방문 날짜가 1일과 25일 사이가 아니라면, 크리스마스 디데이 할인이 적용되지 않는다.', () => {
    // GIVEN
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];

    // WHEN
    const discount = new Discount(31, 0, orderList);

    // THEN
    const expected = [
      { title: '평일 할인', price: 4046 },
      { title: '특별 할인', price: 1000 },
    ];

    expect(discount.getDiscounts(preTotalPrice)).toEqual(expected);
  });

  test('방문 날짜가 주말이라면, 주말 할인이 적용된다.', () => {
    // GIVEN
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];

    // WHEN
    const discount = new Discount(30, 6, orderList);

    // THEN
    const expected = [{ title: '주말 할인', price: 4046 }];

    expect(discount.getDiscounts(preTotalPrice)).toEqual(expected);
  });

  test(`할인 전 총 주문 금액이 10,000원 미만이라면 '없음'을 반환한다.`, () => {
    // GIVEN
    const orderList = [{ menu: '아이스크림', quantity: 1 }];

    // WHEN
    const discount = new Discount(30, 6, orderList);

    // THEN
    const expected = '없음';

    expect(discount.getDiscounts(5000)).toEqual(expected);
  });
});
