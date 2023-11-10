import VisitDate from '../domain/VisitDate.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class EventPlannerController {
  #visitDate;

  constructor() {}

  async startPlanner() {
    OutputView.printIntro();
    const dayIndex = await this.#requestVisitDate();
  }

  async #requestVisitDate() {
    try {
      this.#visitDate = await InputView.readDate();

      return new VisitDate(this.#visitDate).getDayIndex();
    } catch ({ message }) {
      OutputView.print(message);
      return await this.#requestVisitDate();
    }
  }
}

export default EventPlannerController;
