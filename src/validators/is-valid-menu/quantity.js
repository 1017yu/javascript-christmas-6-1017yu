import { EVENTS_OPTION } from '../../constants/events.js';
import { SYMBOLS } from '../../constants/system.js';
import isPositiveInteger from '../is-positive-integer/index.js';

export const isValidTotalMenuQuantity = input => {
  const orderList = input.split(SYMBOLS.comma);
  const totalQuantity = orderList.reduce((acc, order) => {
    return acc + Number(order.split(SYMBOLS.dash)[1]);
  }, 0);

  return (
    totalQuantity <= EVENTS_OPTION.max_order &&
    totalQuantity >= EVENTS_OPTION.min_order
  );
};

export const isValidEachMenuQuantity = input => {
  const orderList = input.split(SYMBOLS.comma);

  return orderList.every(item => {
    return isPositiveInteger(item.split(SYMBOLS.dash)[1]);
  });
};
