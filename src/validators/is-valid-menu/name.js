import MENUS from '../../constants/menus.js';
import { SYMBOLS } from '../../constants/system.js';

const menus = Object.values(MENUS).flatMap(menu => Object.keys(menu));

const isExistsMenuName = orderList => {
  return orderList.every(order => {
    return menus.includes(order.split(SYMBOLS.dash)[0]);
  });
};

const isUniqueMenuName = orderList => {
  const names = orderList.map(order => order.split(SYMBOLS.dash)[0]);

  return new Set(names).size === orderList.length;
};

const isValidMenuName = orderInput => {
  const orderList = orderInput.split(SYMBOLS.comma);

  return isExistsMenuName(orderList) && isUniqueMenuName(orderList);
};

export const isOnlyBeverage = orderInput => {
  const beverages = Object.keys(MENUS.beverage);

  return orderInput.split(SYMBOLS.comma).every(order => {
    return beverages.includes(order.split(SYMBOLS.dash)[0]);
  });
};

export default isValidMenuName;
