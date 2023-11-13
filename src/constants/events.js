import { NONE, PROMOTION_TITLES, TIME } from './system.js';

export const DISCOUNT_PRICES = Object.freeze({
  dDay: 1_000,
  dDayInc: 100,
  week: 2_023,
  special: 1_000,
  none: NONE,
});

export const BADGES = Object.freeze({
  star: { title: 'star', price: 5_000 },
  tree: { title: 'tree', price: 10_000 },
  santa: { title: 'santa', price: 20_000 },
  none: NONE,
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
  none: NONE,
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
});
