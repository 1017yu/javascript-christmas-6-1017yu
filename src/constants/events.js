export const DISCOUNTS = Object.freeze({
  d_Day: 1_000,
  d_Day_inc: 100,
  week: 2_023,
  special: 1_000,
});

export const BADGE_THRESHOLD = Object.freeze({
  star: 5_000,
  tree: 10_000,
  santa: 20_000,
});

export const BADGE = Object.freeze({
  [BADGE_THRESHOLD.star]: '별',
  [BADGE_THRESHOLD.tree]: '트리',
  [BADGE_THRESHOLD.santa]: '산타',
});

export const EVENTS_OPTION = Object.freeze({
  giveaway: 120_000,
  min_order_amount: 10_000,
  max_order: 20,
});
