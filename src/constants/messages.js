import { MONTH } from './system.js';

export const OUTPUT_MESSAGES = Object.freeze({
  intro: `안녕하세요! 우테코 식당 ${MONTH.dec} 이벤트 플래너입니다.`,
});

export const INPUT_MESSAGES = Object.freeze({
  date: `${MONTH.dec} 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
});

export const ERROR_MESSAGES = Object.freeze({
  prefix: '[ERROR]',
  invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
});
