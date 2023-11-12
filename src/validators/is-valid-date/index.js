import { EVENT_DATES } from '../../constants/events.js';

const isValidDate = input => {
  return (
    Number(input) <= EVENT_DATES.endDate &&
    Number(input) >= EVENT_DATES.startDate
  );
};

export default isValidDate;
