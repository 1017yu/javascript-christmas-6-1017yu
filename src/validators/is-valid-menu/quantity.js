import { ORDER } from '../../constants/events.js';
import { SYMBOLS } from '../../constants/system.js';
import isPositiveInteger from '../is-positive-integer/index.js';

/**
 * 총 주문 개수가 최소 개수 이상이고 최대 개수 이하면 true 반환
 * @param {string} input
 * @returns
 */
export const isValidTotalMenuQuantity = input => {
  const orderList = input.split(SYMBOLS.comma);
  const totalQuantity = orderList.reduce((acc, order) => {
    return acc + Number(order.split(SYMBOLS.dash)[1]);
  }, 0);

  return (
    totalQuantity <= ORDER.maxQuantity && totalQuantity >= ORDER.minQuantity
  );
};

/**
 * 메뉴 주문 개수가 양의 정수라면 true 반환
 * @param {string} input
 * @returns
 */
export const isValidEachMenuQuantity = input => {
  const orderList = input.split(SYMBOLS.comma);

  return orderList.every(item => {
    return isPositiveInteger(item.split(SYMBOLS.dash)[1]);
  });
};
