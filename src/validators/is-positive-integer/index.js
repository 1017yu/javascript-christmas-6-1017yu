import REGEXS from '../../constants/regexs.js';

/**
 * input이 유효한 정수의 형식인 지 판별한다.
 * @param {string} input
 * @returns {boolean}
 */
const isPositiveInteger = input => {
  return REGEXS.positiveInt.test(input);
};

export default isPositiveInteger;
