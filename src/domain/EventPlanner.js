import { BADGES, DISCOUNT_PRICES, GIVEAWAYS } from '../constants/events.js';
import { NONE } from '../constants/system.js';
import menuPriceFinder from '../utils/menuPriceFinder.js';
import Benefit from './Benefit.js';
import Discount from './Discount.js';

class EventPlanner {
  #benefit;

  #preTotalPrice;

  #totalBenefitPrice;

  constructor(visitDate, dayIndex, orderList) {
    this.discount = new Discount(visitDate, dayIndex, orderList);
    this.#preTotalPrice = this.#setPreTotalPrice(orderList);
    this.isFitGiveaway = this.#checkIsFitGiveAway();
    this.#benefit = new Benefit(this.discount, this.isFitGiveaway);
  }

  /**
   * 주문 내역을 순회하며 할인 전 총주문 금액을 반환
   * @param {Array<{ menu: string, quantity: number }>} orderList - 주문 내역
   * @returns
   */
  #setPreTotalPrice(orderList) {
    return orderList.reduce(
      (acc, order) => this.#calculateTotalPrice(acc, order),
      0,
    );
  }

  /**
   * 특정 메뉴의 가격과 수량을 곱하여 할인 전 총주문 금액을 계산
   * @param {number} acc - 누적 금액
   * @param {{ menu: string, quantity: number }} order - 특정 주문 내역
   * @returns
   */
  #calculateTotalPrice(acc, order) {
    const price = menuPriceFinder(order.menu);

    return acc + price * order.quantity;
  }

  getPreTotalPrice() {
    return this.#preTotalPrice;
  }

  // 할인 전 총주문 금액과 증정 이벤트 기준 금액을 비교하여 boolean 반환
  #checkIsFitGiveAway() {
    return this.#preTotalPrice >= GIVEAWAYS.giveawayPrice;
  }

  // 증정 이벤트 기준 금액 이상이면 증정 이벤트 상품 반환, 미만이면 '없음' 반환
  getGiveaway() {
    return this.isFitGiveaway ? [this.#createGiveaway()] : NONE;
  }

  #createGiveaway() {
    return { menu: GIVEAWAYS.giveaway, quantity: GIVEAWAYS.giveawayUnit };
  }

  getBenefitList() {
    return this.#benefit.getList();
  }

  getTotalBenefitPrice() {
    return this.#benefit.getTotalPrice();
  }

  /**
   * 총 할인 금액이 존재하면 할인 후 예상 결제 금액 반환, 그렇지 않다면 할인 전 총주문 금액 반환
   * @returns
   */
  getTotalPrice() {
    const totalDiscountPrice = this.discount.getTotalDiscountPrice();

    if (totalDiscountPrice === DISCOUNT_PRICES.none) return this.#preTotalPrice;
    return this.#preTotalPrice - totalDiscountPrice;
  }

  /**
   * 총혜택 금액에 따른 이벤트 배지 반환
   * @returns
   */
  getBadge() {
    switch (true) {
      case this.#totalBenefitPrice > BADGES.santa.price:
        return BADGES.santa.title;
      case this.#totalBenefitPrice > BADGES.tree.price:
        return BADGES.tree.title;
      case this.#totalBenefitPrice > BADGES.star.price:
        return BADGES.star.title;
      default:
        return BADGES.none;
    }
  }
}

export default EventPlanner;
