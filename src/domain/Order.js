import { ERROR_MESSAGES } from '../constants/messages.js';
import { SYMBOLS } from '../constants/system.js';
import validationErrorHandler from '../errors/index.js';
import { isValidMenuName } from '../validators/index.js';
import { isOnlyBeverage } from '../validators/is-valid-menu/name.js';
import {
  isValidEachMenuQuantity,
  isValidTotalMenuQuantity,
} from '../validators/is-valid-menu/quantity.js';

class Order {
  #orderList = new Set();

  constructor(orderInput) {
    this.#validate(orderInput);
    this.#orderList = this.#parse(orderInput);
  }

  #parse(orderInput) {
    this.#splitOrder(orderInput);
    return Array.from(this.#orderList);
  }

  #splitOrder(orderInput) {
    return orderInput.split(SYMBOLS.comma).map(order => this.#splitMenu(order));
  }

  #splitMenu(order) {
    const [menu, quantity] = order.split(SYMBOLS.dash);

    this.#orderList.add({ menu: menu.trim(), quantity: Number(quantity) });
  }

  #validate(orderInput) {
    if (!isValidMenuName(orderInput) || !isValidEachMenuQuantity(orderInput)) {
      validationErrorHandler(ERROR_MESSAGES.invalidMenu);
    }

    if (!isValidTotalMenuQuantity(orderInput)) {
      validationErrorHandler(ERROR_MESSAGES.exceedQuantity);
    }

    if (isOnlyBeverage(orderInput)) {
      validationErrorHandler(ERROR_MESSAGES.onlyBeverage);
    }
  }

  getOrderList() {
    return this.#orderList;
  }
}

export default Order;
