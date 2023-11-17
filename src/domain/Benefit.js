import { GIVEAWAYS, TITLES } from '../constants/events.js';
import { NONE } from '../constants/system.js';
import menuPriceFinder from '../utils/menuPriceFinder.js';

class Benefit {
  #isFitGiveaway;

  #benefitList;

  #totalPrice;

  constructor(discountList, isFitGiveaway) {
    this.#isFitGiveaway = isFitGiveaway;
    this.#benefitList = this.#setBenefitList(discountList);
    this.#totalPrice = this.#calculateTotalPrice();
  }

  /**
   * 증정 이벤트 기준 이상이면 혜택 내역에 증정 메뉴를 추가하고, 미만이면 '없음'을 추가
   * @param {Array<{ title: string, price: number }>} benefitList - 혜택 리스트
   * @returns
   */
  #setBenefitList(discountList) {
    if (this.#isFitGiveaway) {
      return [...discountList, this.#createGiveawayBenefit()];
    }

    return discountList;
  }

  #createGiveawayBenefit() {
    return {
      title: TITLES.giveaway,
      price: menuPriceFinder(GIVEAWAYS.giveaway),
    };
  }

  /**
   * 혜택 내역이 '없음'이면 총 금액 0을 반환, 혜택 내역이 있으면 총 금액을 누산하여 반환
   * @returns
   */
  #calculateTotalPrice() {
    if (this.#benefitList === NONE) return 0;

    return this.#benefitList.reduce((acc, benefit) => acc + benefit.price, 0);
  }

  getList() {
    return this.#benefitList;
  }

  getTotalPrice() {
    return this.#totalPrice;
  }
}

export default Benefit;
