import { ORDER } from '../../constants/events.js';
import { SYMBOLS } from '../../constants/system.js';
import isPositiveInteger from '../is-positive-integer/index.js';

export const isValidTotalMenuQuantity = input => {
  const orderList = input.split(SYMBOLS.comma);
  const totalQuantity = orderList.reduce((acc, order) => {
    return acc + Number(order.split(SYMBOLS.dash)[1]);
  }, 0);

  return (
    totalQuantity <= ORDER.maxQuantity && totalQuantity >= ORDER.minQuantity
  );
};

export const isValidEachMenuQuantity = input => {
  const orderList = input.split(SYMBOLS.comma);

  return orderList.every(item => {
    return isPositiveInteger(item.split(SYMBOLS.dash)[1]);
  });
};
