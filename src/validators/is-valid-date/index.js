import { DATES } from '../../constants/events.js';

const isValidDate = input => {
  return Number(input) <= DATES.endDate && Number(input) >= DATES.startDate;
};

export default isValidDate;
