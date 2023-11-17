import {
  isValidTotalMenuQuantity,
  isValidEachMenuQuantity,
} from './quantity.js';

describe('isValidTotalMenuQuantity() 유효성 함수 테스트', () => {
  test.each([
    ['해산물파스타-1', true],
    ['초코케이크-20', true],
    ['해산물파스타-1,초코케이크-1', true],
  ])(
    '주문한 메뉴가 총 1개 이상 20개 이하인 경우, true를 반환한다.',
    (input, expected) => {
      expect(isValidTotalMenuQuantity(input)).toBe(expected);
    },
  );

  test.each([
    ['해산물파스타-0', false],
    ['초코케이크-21', false],
    ['해산물파스타-11,초코케이크-10', false],
  ])(
    '주문한 메뉴가 총 1개 미만 20개 초과인 경우, false를 반환한다.',
    (input, expected) => {
      expect(isValidTotalMenuQuantity(input)).toBe(expected);
    },
  );
});

describe('isValidEachMenuQuantity() 유효성 함수 테스트', () => {
  test.each([
    ['해산물파스타-1', true],
    ['초코케이크-20', true],
    ['해산물파스타-1,초코케이크-1', true],
  ])(
    '주문한 메뉴 개수 입력이 유효한 숫자 형식이면, true를 반환한다.',
    (input, expected) => {
      expect(isValidEachMenuQuantity(input)).toBe(expected);
    },
  );

  test.each([
    ['해산물파스타-a1', false],
    ['초코케이크-1.0', false],
    ['해산물파스타-1,초코케이크-10a', false],
  ])(
    '주문한 메뉴 개수 입력이 유효하지 않은 형식이면, false를 반환한다.',
    (input, expected) => {
      expect(isValidEachMenuQuantity(input)).toBe(expected);
    },
  );
});
