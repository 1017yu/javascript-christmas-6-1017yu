import isValidDate from './index.js';

describe('isValidDate() 유효성 함수 테스트', () => {
  test.each([
    ['1', true],
    ['25', true],
    ['31', true],
  ])('1 이상 31 이하의 숫자 형식이면, true를 반환한다.', (input, expected) => {
    expect(isValidDate(input)).toBe(expected);
  });

  test.each([
    ['0', false],
    ['33', false],
    ['25a', false],
    ['12.2.5', false],
    ['', false],
    [null, false],
    [undefined, false],
  ])(
    '1 이상 31 이하의 숫자 형식이 아니라면, false를 반환한다.',
    (input, expected) => {
      expect(isValidDate(input)).toBe(expected);
    },
  );
});
