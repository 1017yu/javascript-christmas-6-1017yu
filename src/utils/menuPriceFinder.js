import MENUS from '../constants/menus.js';

/**
 * 메뉴 이름을 입력하면 카테고리 내 메뉴의 가격 값을 반환
 * @param {string} menu - 메뉴 이름
 * @returns {number | undefined}
 */
const menuPriceFinder = menu => {
  return Object.values(MENUS).find(category => menu in category)[menu];
};

export default menuPriceFinder;
