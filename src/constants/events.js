import { PROMOTION_TITLES, TIME, UNITS } from './system.js';

export const DISCOUNT_PRICES = Object.freeze({
  dDay: 1_000,
  dDayInc: 100,
  week: 2_023,
  special: 1_000,
});

export const BADGES = Object.freeze({
  star: { title: '별', price: 5_000 },
  tree: { title: '트리', price: 10_000 },
  santa: { title: '산타', price: 20_000 },
});

export const TITLES = Object.freeze({
  dDay: `${PROMOTION_TITLES[TIME.month]} 디데이 할인`,
  weekday: '평일 할인',
  weekend: '주말 할인',
  special: '특별 할인',
  giveaway: '증정 이벤트',
});

export const GIVEAWAYS = Object.freeze({
  giveaway: '샴페인',
  giveawayUnit: 1,
  giveawayPrice: 120_000,
});

export const ORDER = Object.freeze({
  minPrice: 10_000,
  minQuantity: 1,
  maxQuantity: 20,
});

export const DATES = Object.freeze({
  startDate: 1,
  endDate: 31,
  christmas: 25,
  specialDayIndex: 0,
  weekendIndex: 5,
});

export const BENEFITS = Object.freeze({
  menu: '<주문 메뉴>',
  preTotalPrice: '<할인 전 총주문 금액>',
  giveaway: '<증정 메뉴>',
  benefitList: '<혜택 내역>',
  totalBenefitPrice: '<총혜택 금액>',
  totalPrice: '<할인 후 예상 결제 금액>',
  badge: `<${TIME.month}${UNITS.month} 이벤트 배지>`,
});
