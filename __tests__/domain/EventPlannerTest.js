/* eslint-disable max-lines-per-function */
import { TITLES } from '../../src/constants/events';
import { NONE } from '../../src/constants/system';
import EventPlanner from '../../src/domain/EventPlanner';

describe('EventPlanner 클래스 테스트', () => {
  let visitDate;
  let dayIndex;
  let orderList;

  beforeEach(() => {
    visitDate = 3;
    dayIndex = 0;
    orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];
  });

  // EventPlanner 클래스의 getGiveAway() 메소드 테스트
  describe('getGiveAway() 메소드 테스트', () => {
    test('할인 전 총주문 금액이 12만원 이상이면, 샴페인을 증정한다.', () => {
      // GIVEN
      const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);

      // WHEN
      const result = eventPlanner.getGiveaway();
      const expected = [{ menu: '샴페인', quantity: 1 }];

      // THEN
      expect(result).toEqual(expected);
    });

    test(`할인 전 총주문 금액이 12만원 미만이면, '없음'을 반환한다.`, () => {
      // GIVEN
      const order = [{ menu: '아이스크림', quantity: 1 }];
      const eventPlanner = new EventPlanner(visitDate, dayIndex, order);

      // WHEN
      const result = eventPlanner.getGiveaway();
      const expected = '없음';

      // THEN
      expect(result).toEqual(expected);
    });
  });

  // EventPlanner 클래스의 getBenefitList() 메소드 테스트
  describe('getBenefitList() 메소드 테스트', () => {
    test('디데이, 평일, 특별, 증정이벤트 조건을 충족하는 메뉴가 입력되면, 모든 혜택 내역을 반환한다.', () => {
      // GIVEN
      const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);

      // WHEN
      const result = eventPlanner.getBenefitList();
      const expected = [
        { title: TITLES.dDay, price: 1200 },
        { title: TITLES.weekday, price: 4046 },
        { title: TITLES.special, price: 1000 },
        { title: TITLES.giveaway, price: 25000 },
      ];

      // THEN
      expect(result).toEqual(expected);
    });

    test('주말, 특별, 증정이벤트 조건을 충족하는 메뉴가 입력되면, 모든 혜택 내역을 반환한다.', () => {
      // GIVEN
      const lastDay = 31;
      const eventPlanner = new EventPlanner(lastDay, dayIndex, orderList);

      // WHEN
      const result = eventPlanner.getBenefitList();
      const expected = [
        { title: TITLES.weekday, price: 4046 },
        { title: TITLES.special, price: 1000 },
        { title: TITLES.giveaway, price: 25000 },
      ];

      // THEN
      expect(result).toEqual(expected);
    });

    test('증정이벤트 조건만 충족하는 메뉴가 입력되면, 해당 내역을 반환한다.', () => {
      // GIVEN
      const excludedEvent = 29;
      const fridayIndex = 5;
      const order = [{ menu: '초코케이크', quantity: 20 }];
      const eventPlanner = new EventPlanner(excludedEvent, fridayIndex, order);

      // WHEN
      const result = eventPlanner.getBenefitList();
      const expected = [{ title: TITLES.giveaway, price: 25000 }];

      // THEN
      expect(result).toEqual(expected);
    });

    test('디데이, 평일, 주간, 증정이벤트 조건을 모두 충족하지 않는다면, 없음을 반환한다.', () => {
      // GIVEN
      const excludedEvent = 29;
      const fridayIndex = 5;
      const order = [{ menu: '아이스크림', quantity: 1 }];
      const eventPlanner = new EventPlanner(excludedEvent, fridayIndex, order);

      // WHEN
      const result = eventPlanner.getBenefitList();
      const expected = NONE;

      // THEN
      expect(result).toEqual(expected);
    });
  });

  // EventPlanner 클래스의 getTotalBenefitPrice() 메소드 테스트
  describe('getTotalBenefitPrice() 테스트', () => {
    test('주문 내역을 입력하면, 총할인 내역에 증정 메뉴 가격을 더한 총혜택 금액을 반환한다.', () => {
      const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);

      // WHEN
      const result = eventPlanner.getTotalBenefitPrice();
      const expected = 31_246;

      // THEN
      expect(result).toEqual(expected);
    });

    test('할인 조건에 충족하지 않은 주문 내역인 경우, 0을 반환한다.', () => {
      const excludedEvent = 29;
      const fridayIndex = 5;
      const order = [{ menu: '아이스크림', quantity: 1 }];
      const eventPlanner = new EventPlanner(excludedEvent, fridayIndex, order);

      // WHEN
      const result = eventPlanner.getTotalBenefitPrice();
      const expected = 0;

      // THEN
      expect(result).toEqual(expected);
    });
  });

  // EventPlanner 클래스의 getTotalPrice() 메소드 테스트
  describe('getTotalBenefitPrice() 테스트', () => {
    test('주문 내역을 입력하면, 할인 전 총주문 금액에서 할인 내역을 뺀 예상 결제 금액을 반환한다.', () => {
      const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);

      // WHEN
      const result = eventPlanner.getTotalPrice();
      const expected = 135_754;

      // THEN
      expect(result).toEqual(expected);
    });

    test('할인 조건에 충족하지 않은 주문 내역을 입력하면, 할인 전 총주문 금액을 반환한다.', () => {
      const excludedEvent = 29;
      const fridayIndex = 5;
      const order = [{ menu: '아이스크림', quantity: 1 }];
      const eventPlanner = new EventPlanner(excludedEvent, fridayIndex, order);

      // WHEN
      const result = eventPlanner.getTotalPrice();
      const expected = eventPlanner.getPreTotalPrice();

      // THEN
      expect(result).toEqual(expected);
    });
  });

  test('getPreTotalPrice()를 호출하면 할인 전 총주문 금액을 계산하여 반환한다.', () => {
    // GIVEN
    const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);

    // WHEN
    const result = eventPlanner.getPreTotalPrice();
    const expected = 142_000;

    // THEN
    expect(result).toBe(expected);
  });
});
