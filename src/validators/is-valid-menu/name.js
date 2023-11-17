import MENUS from '../../constants/menus.js';
import { SYMBOLS } from '../../constants/system.js';

const menus = Object.values(MENUS).flatMap(menu => Object.keys(menu));

/**
 * 모든 주문 메뉴가 메뉴판에 존재하는 메뉴면 true를 반환
 * @param {string[]} orderList
 * @returns
 */
const isExistsMenuName = orderList => {
  return orderList.every(order => {
    return menus.includes(order.split(SYMBOLS.dash)[0]);
  });
};

/**
 * 주문 메뉴에 중복이 없다면 true를 반환
 * @param {string[]} orderList
 * @returns
 */
const isUniqueMenuName = orderList => {
  const names = orderList.map(order => order.split(SYMBOLS.dash)[0]);

  return new Set(names).size === orderList.length;
};
/**
 * 모든 주문 메뉴가 중복 없이 메뉴판에 존재하는 메뉴로 구성되었으면 true 반환
 * @param {string} orderInput
 * @returns
 */
const isValidMenuName = orderInput => {
  const orderList = orderInput.split(SYMBOLS.comma);

  return isExistsMenuName(orderList) && isUniqueMenuName(orderList);
};

/**
 * 모든 주문 메뉴가 음료로 구성되었다면 true 반환
 * @param {string} orderInput
 * @returns
 */
export const isOnlyBeverage = orderInput => {
  const beverages = Object.keys(MENUS.beverage);

  return orderInput.split(SYMBOLS.comma).every(order => {
    return beverages.includes(order.split(SYMBOLS.dash)[0]);
  });
};

export default isValidMenuName;
