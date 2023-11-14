import { UNITS } from '../constants/system.js';

/**
 * number type의 가격을 입력받아 가격을 변환 후 '원'을 포함한 string type으로 변환
 * 20000이라는 매개변수를 통해 '20,000원'을 반환
 * @param {number} price 가격
 * @returns {string}
 */
const priceFormatter = price => {
  const formattedPrice = new Intl.NumberFormat().format(price);

  return `${formattedPrice}${UNITS.won}`;
};

export default priceFormatter;
