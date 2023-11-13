/* eslint-disable max-lines-per-function */
import EventPlanner from '../../src/domain/EventPlanner.js';
import { BADGES, GIVEAWAYS, TITLES } from '../../src/constants/events.js';
import { NONE } from '../../src/constants/system.js';

describe('EventPlanner 클래스 테스트', () => {
  test('방문 날짜와 주문 목록을 입력받아 혜택 내역을 반환한다.', () => {
    // GIVEN
    const visitDate = 3;
    const dayIndex = 0;
    const orderList = [
      { menu: '티본스테이크', quantity: 1 },
      { menu: '바비큐립', quantity: 1 },
      { menu: '초코케이크', quantity: 2 },
      { menu: '제로콜라', quantity: 1 },
    ];

    // WHEN
    const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);

    // THEN
    const expected = [
      142000,
      [{ menu: GIVEAWAYS.giveaway, quantity: 1 }],
      [
        { title: TITLES.dDay, price: 1200 },
        { title: TITLES.weekday, price: 4046 },
        { title: TITLES.special, price: 1000 },
        { title: TITLES.giveaway, price: 25000 },
      ],
      31246,
      135754,
      BADGES.santa.title,
    ];

    expect(eventPlanner.getPlanner()).toEqual(expected);
  });

  test('방문 날짜와 주문 목록을 입력받아 혜택 내역을 반환한다.', () => {
    // GIVEN
    const visitDate = 26;
    const dayIndex = 2;
    const orderList = [
      { menu: '타파스', quantity: 1 },
      { menu: '제로콜라', quantity: 1 },
    ];

    // WHEN
    const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);

    // THEN
    const expected = [8500, NONE, NONE, 0, 8500, NONE];

    expect(eventPlanner.getPlanner()).toEqual(expected);
  });
});
