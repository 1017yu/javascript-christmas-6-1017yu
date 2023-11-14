import VisitDate from '../domain/VisitDate.js';
import Order from '../domain/Order.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import EventPlanner from '../domain/EventPlanner.js';

class PromotionController {
  #inputView;

  #outputView;

  #visitDate;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async startPromotion() {
    this.#outputView.printIntro(this.#visitDate);
    const dayIndex = await this.#requestVisitDate();
    const orderList = await this.#requestOrder();
    this.#outputView.printOutro(this.#visitDate);
    this.#showBenefits(this.#visitDate, dayIndex, orderList);
  }

  async #requestVisitDate() {
    try {
      this.#visitDate = await this.#inputView.readDate();

      return new VisitDate(this.#visitDate).getDayIndex();
    } catch ({ message }) {
      this.#outputView.print(message);

      return await this.#requestVisitDate();
    }
  }

  async #requestOrder() {
    try {
      const orderInput = await this.#inputView.readOrder();

      return new Order(orderInput).getOrderList();
    } catch ({ message }) {
      this.#outputView.print(message);

      return await this.#requestOrder();
    }
  }

  #showBenefits(visitDate, dayIndex, orderList) {
    const eventPlanner = new EventPlanner(visitDate, dayIndex, orderList);
    this.#outputView.printPlanner(orderList, eventPlanner);
  }
}

export default PromotionController;
