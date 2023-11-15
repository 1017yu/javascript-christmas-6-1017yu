import { DISCOUNT_PRICES, TITLES } from '../../src/constants/events';
import Benefit from '../../src/domain/Benefit';

/* eslint-disable max-lines-per-function */
describe('Benefit 클래스 테스트', () => {
  let discountList;

  beforeEach(() => {
    discountList = [{ title: TITLES.special, price: DISCOUNT_PRICES.special }];
  });

  test('증정 이벤트 조건을 충족하면, 증정 이벤트를 포함한 혜택 리스트를 반환한다', () => {
    // WHEN
    const benefit = new Benefit(discountList, true);

    // THEN
    const result = benefit.getList();

    expect(result).toEqual(
      expect.arrayContaining([{ title: TITLES.giveaway, price: 25_000 }]),
    );
  });

  test('증정 이벤트 조건을 충족하지 않으면, 기존의 혜택 리스트를 반환한다.', () => {
    // WHEN
    const benefit = new Benefit(discountList, false);

    // THEN
    const result = benefit.getList();

    expect(result).toEqual(discountList);
  });

  test(`기존 혜택 내역이 '없음'이 아니면, getTotalPrice()가 총 금액을 누산하여 반환한다.`, () => {
    // WHEN
    const benefit = new Benefit(discountList, false);

    // THEN
    const result = benefit.getTotalPrice();

    expect(result).toEqual(1000);
  });

  test(`기존 혜택 내역이 '없음'이면 getTotalPrice()가 0을 반환한다.`, () => {
    // WHEN
    const noneList = '없음';
    const benefit = new Benefit(noneList, false);

    // THEN
    const result = benefit.getTotalPrice();

    expect(result).toEqual(0);
  });
});
