/**
 * input이 유효한 정수의 형식인 지 판별한다.
 * @param {string} input
 * @returns {boolean}
 */
const isPositiveInteger = input => {
  return Number(input) > 0 && Number.isInteger(Number(input));
};

export default isPositiveInteger;
