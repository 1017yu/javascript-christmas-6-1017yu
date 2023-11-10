import isPositiveInteger from './index.js';

describe('isPositiveInteger function', () => {
  test.each([
    [1, true],
    ['25', true],
    [31, true],
    ['100', true],
  ])('양의 정수라면, true를 반환한다.', (input, expected) => {
    expect(isPositiveInteger(input)).toBe(expected);
  });

  test.each([
    ['12a3', false],
    ['12.3.4', false],
    ['', false],
    [null, false],
    [undefined, false],
  ])('양의 정수가 아니라면, false를 반환한다.', (input, expected) => {
    expect(isPositiveInteger(input)).toBe(expected);
  });
});
