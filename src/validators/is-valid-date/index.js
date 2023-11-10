import { EVENT_DATES } from '../../constants/system.js';

const isValidDate = input => {
  return (
    Number(input) <= EVENT_DATES.endDate &&
    Number(input) >= EVENT_DATES.startDate
  );
};

export default isValidDate;
