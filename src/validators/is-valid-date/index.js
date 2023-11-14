import { DATES } from '../../constants/events.js';

/**
 * 식당 방문 날짜 입력이 시작일과 종료일 이내면 true를 반환
 * @param {string} input
 * @returns {boolean}
 */
const isValidDate = input => {
  return Number(input) <= DATES.endDate && Number(input) >= DATES.startDate;
};

export default isValidDate;
