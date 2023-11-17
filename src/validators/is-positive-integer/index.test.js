import isPositiveInteger from './index.js';

describe('isPositiveInteger() 유효성 함수 테스트', () => {
  test.each([
    ['1', true],
    ['25', true],
    ['31', true],
    ['100', true],
  ])('양의 정수 형식이라면, true를 반환한다.', (input, expected) => {
    expect(isPositiveInteger(input)).toBe(expected);
  });

  test.each([
    ['12a3', false],
    ['1.0', false],
    ['-1', false],
    ['', false],
    [null, false],
    [undefined, false],
  ])('양의 정수 형식이 아니라면, false를 반환한다.', (input, expected) => {
    expect(isPositiveInteger(input)).toBe(expected);
  });
});
