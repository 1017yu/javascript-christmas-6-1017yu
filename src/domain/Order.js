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

  /**
   * 사용자 입력한 주문 메뉴와 메뉴 개수를 파싱하여 배열로 반환
   * @param {string} orderInput - 사용자가 입력한 모든 주문 메뉴와 메뉴 개수
   * @returns {{ key: string, value: string }[]} - 주문이 파싱된 배열
   */
  #parse(orderInput) {
    this.#splitOrder(orderInput);

    return [...this.#orderList];
  }

  /**
   * orderInput 내 개별 주문들을 파싱
   * @param {string} orderInput - 사용자가 입력한 모든 주문 메뉴와 메뉴 개수
   * @returns {Set<{ menu: string, quantity: number }>} - 주문이 파싱된 Set
   */
  #splitOrder(orderInput) {
    return orderInput.split(SYMBOLS.comma).map(order => this.#splitMenu(order));
  }

  /**
   * 주문 메뉴명과 개수를 orderList Set에 추가
   * @param {string} order 사용자가 입력한 특정 주문 메뉴와 메뉴 개수
   */
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
