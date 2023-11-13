import {
  BADGES,
  DISCOUNT_PRICES,
  GIVEAWAYS,
  TITLES,
} from '../constants/events.js';
import MENUS from '../constants/menus.js';
import Discount from './Discount.js';

class EventPlanner {
  #orderList;

  #isFitGiveaway;

  #discount;

  /**
   *
   * @param {string} visitDate - 방문 날짜
   * @param {number} dayIndex - 방문 날짜의 요일 인덱스
   * @param {Array<{ menu: string, quantity: number }>} orderList - 주문 목록 배열
   */
  constructor(visitDate, dayIndex, orderList) {
    this.visitDate = visitDate;
    this.dayIndex = dayIndex;
    this.#orderList = orderList;
    this.#discount = new Discount(visitDate, dayIndex, orderList);
  }

  getPlanner() {
    const preTotalPrice = this.#getPreTotalPrice();
    const benefitList = this.#getBenefitList(preTotalPrice);
    const totalBenefitPrice = this.#getTotalBenefitPrice(benefitList);

    return [
      preTotalPrice,
      this.#getGiveawayEvent(),
      benefitList,
      this.#getTotalBenefitPrice(benefitList),
      this.#getTotalPrice(preTotalPrice),
      this.#getBadge(totalBenefitPrice),
    ];
  }

  #getPreTotalPrice() {
    const preTotalPrice = this.#orderList.reduce(
      (acc, order) => this.#calculateTotalPrice(acc, order),
      0,
    );

    this.#isFitGiveaway = preTotalPrice > GIVEAWAYS.giveawayPrice;

    return preTotalPrice;
  }

  #getGiveawayEvent() {
    const { giveaway, giveawayUnit, none } = GIVEAWAYS;

    return this.#isFitGiveaway
      ? Array({ menu: giveaway, quantity: giveawayUnit })
      : none;
  }

  #getBenefitList(preTotalPrice) {
    const benefitList = this.#discount.getDiscounts(preTotalPrice);

    if (this.#isFitGiveaway) {
      benefitList.push({
        title: TITLES.giveaway,
        price: this.#getMenuPrice(GIVEAWAYS.giveaway),
      });
    }

    return benefitList.length ? benefitList : DISCOUNT_PRICES.none;
  }

  #getTotalBenefitPrice(benefitList) {
    if (benefitList === DISCOUNT_PRICES.none) return 0;

    const totalBenefitPrice = benefitList.reduce(
      (acc, benefit) => acc + benefit.price,
      0,
    );

    return totalBenefitPrice;
  }

  #getTotalPrice(preTotalPrice) {
    const totalDiscountPrice = this.#discount.getTotalDiscountPrice();

    if (totalDiscountPrice === DISCOUNT_PRICES.none) return preTotalPrice;

    return preTotalPrice - totalDiscountPrice;
  }

  #getBadge(totalBenefitPrice) {
    switch (true) {
      case totalBenefitPrice > BADGES.santa.price:
        return BADGES.santa.title;
      case totalBenefitPrice > BADGES.tree.price:
        return BADGES.tree.title;
      case totalBenefitPrice > BADGES.star.price:
        return BADGES.star.title;
      default:
        return BADGES.none;
    }
  }

  #calculateTotalPrice(acc, order) {
    const price = this.#getMenuPrice(order.menu);

    return acc + price * order.quantity;
  }

  #getMenuPrice(menu) {
    return Object.values(MENUS).find(category => menu in category)[menu];
  }
}

export default EventPlanner;
