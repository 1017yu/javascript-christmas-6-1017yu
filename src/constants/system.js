export const MONTH = Object.freeze({
  jan: '1월',
  feb: '2월',
  mar: '3월',
  apr: '4월',
  may: '5월',
  jun: '6월',
  jul: '7월',
  aug: '8월',
  sep: '9월',
  oct: '10월',
  nov: '11월',
  dec: '12월',
  current: '12',
});

export const YEAR = Object.freeze({
  current: '2023',
  next: '2024',
});

export const EVENT_TITLE = Object.freeze({
  [MONTH.jan]: '새해',
  [MONTH.dec]: '크리스마스',
});

export const EVENT_DATES = Object.freeze({
  startDate: 1,
  endDate: 31,
  christmas: 25,
});
