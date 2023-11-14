import { EOL as LINE_SEPARATOR } from 'os';
import { TIME, UNITS } from './system.js';

export const OUTPUT_MESSAGES = Object.freeze({
  intro: `안녕하세요! 우테코 식당 ${TIME.month}${UNITS.month} 이벤트 플래너입니다.`,
  outro: `일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
});

export const INPUT_MESSAGES = Object.freeze({
  date: `${TIME.month}${UNITS.month} 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)${LINE_SEPARATOR}`,
  order: `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)${LINE_SEPARATOR}`,
});

export const ERROR_MESSAGES = Object.freeze({
  prefix: '[ERROR]',
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidMenu: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
  exceedQuantity:
    '메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다. 다시 입력해 주세요.',
  onlyBeverage: '음료만 주문할 수 없습니다. 다시 입력해 주세요.',
});
