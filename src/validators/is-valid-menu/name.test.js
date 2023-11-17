import isValidMenuName, { isOnlyBeverage } from './name.js';

describe('주문하는 메뉴명 관련 유효성 함수 테스트', () => {
  test.each([
    ['해산물파스타-2,레드와인-1,초코케이크-1', true],
    ['해산물파스타-20', true],
    ['초코케이크-5', true],
  ])(
    '메뉴판에 존재하는 메뉴를 입력하는 경우, true를 반환한다.',
    (input, expected) => {
      expect(isValidMenuName(input)).toBe(expected);
    },
  );

  test.each([
    ['해산물-2', false],
    ['레드와인-1,초코케이크-1,파스타-2', false],
    ['파스타-2,레드와인-1,초코케이크-1', false],
    ['파스타-2,  ', false],
  ])(
    '메뉴판에 존재하지 않는 메뉴를 입력하는 경우, false를 반환한다.',
    (input, expected) => {
      expect(isValidMenuName(input)).toBe(expected);
    },
  );

  test('중복 메뉴를 입력한 경우, false를 반환한다.', () => {
    const input = '해산물파스타-2,해산물파스타-2';

    expect(isValidMenuName(input)).toBe(false);
  });

  test.each([
    ['제로콜라-1', true],
    ['제로콜라-1,레드와인-1', true],
    ['제로콜라-1,레드와인-1,샴페인-1', true],
  ])('입력한 메뉴가 모두 음료인 경우, true를 반환한다.', (input, expected) => {
    expect(isOnlyBeverage(input)).toBe(expected);
  });
});
