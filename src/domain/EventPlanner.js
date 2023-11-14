import {
  BADGES,
  DISCOUNT_PRICES,
  GIVEAWAYS,
  TITLES,
} from '../constants/events.js';
import MENUS from '../constants/menus.js';
import Discount from './Discount.js';

class EventPlanner {
  #isFitGiveaway;

  #discount;

  #benefitList;

  #preTotalPrice;

  #totalBenefitPrice;

  /**
   *
   * @param {string} visitDate - 방문 날짜
   * @param {number} dayIndex - 방문 날짜의 요일 인덱스
   * @param {Array<{ menu: string, quantity: number }>} orderList - 주문 목록 배열
   */
  constructor(visitDate, dayIndex, orderList) {
    this.visitDate = visitDate;
    this.#discount = new Discount(visitDate, dayIndex, orderList);
    this.#setPreTotalPrice(orderList);
    this.#checkIsFitGiveAway();
    this.#setBenefitList();
  }

  #setPreTotalPrice(orderList) {
    this.#preTotalPrice = orderList.reduce(
      (acc, order) => this.#calculateTotalPrice(acc, order),
      0,
    );
  }

  #checkIsFitGiveAway() {
    this.#isFitGiveaway = this.#preTotalPrice > GIVEAWAYS.giveawayPrice;
  }

  getPreTotalPrice() {
    return this.#preTotalPrice;
  }

  #calculateTotalPrice(acc, order) {
    const price = this.#getMenuPrice(order.menu);

    return acc + price * order.quantity;
  }

  #getMenuPrice(menu) {
    return Object.values(MENUS).find(category => menu in category)[menu];
  }

  getGiveaway() {
    const { giveaway, giveawayUnit, none } = GIVEAWAYS;

    return this.#isFitGiveaway
      ? [{ menu: giveaway, quantity: giveawayUnit }]
      : none;
  }

  #setBenefitList() {
    this.#benefitList = this.#discount.getDiscounts(this.#preTotalPrice);

    if (this.#isFitGiveaway) {
      this.#benefitList.push({
        title: TITLES.giveaway,
        price: this.#getMenuPrice(GIVEAWAYS.giveaway),
      });
    }
  }

  getBenefitList() {
    return this.#benefitList.length ? this.#benefitList : DISCOUNT_PRICES.none;
  }

  getTotalBenefitPrice() {
    if (this.#benefitList === DISCOUNT_PRICES.none) return 0;

    this.#totalBenefitPrice = this.#benefitList.reduce(
      (acc, benefit) => acc + benefit.price,
      0,
    );

    return this.#totalBenefitPrice;
  }

  getTotalPrice() {
    const totalDiscountPrice = this.#discount.getTotalDiscountPrice();

    if (totalDiscountPrice === DISCOUNT_PRICES.none) return this.#preTotalPrice;

    return this.#preTotalPrice - totalDiscountPrice;
  }

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
