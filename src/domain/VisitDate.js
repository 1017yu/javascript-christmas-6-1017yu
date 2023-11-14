import { ERROR_MESSAGES } from '../constants/messages.js';
import { TIME } from '../constants/system.js';
import validationErrorHandler from '../errors/index.js';
import { isPositiveInteger, isValidDate } from '../validators/index.js';

class VisitDate {
  #visitDate;

  constructor(date) {
    this.#validateDate(date);
    this.#visitDate = date;
  }

  #validateDate(date) {
    if (!isPositiveInteger(date) || !isValidDate(date)) {
      validationErrorHandler(ERROR_MESSAGES.invalidDate);
    }
  }

  getDayIndex() {
    return this.#calculateDayIndex();
  }

  #calculateDayIndex() {
    const date = new Date(`${TIME.dateFormat}${this.#visitDate}`);

    return date.getDay();
  }
}

export default VisitDate;
