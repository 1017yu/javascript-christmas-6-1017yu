import {
  DISCOUNT_PRICES,
  GIVEAWAYS,
  TITLES,
  DATES,
  ORDER,
} from '../constants/events.js';
import MENUS from '../constants/menus.js';
import { NONE } from '../constants/system.js';

class Discount {
  #visitDate;

  #dayIndex;

  #orderList;

  #discounts = new Set();

  constructor(visitDate, dayIndex, orderList) {
    this.#visitDate = visitDate;
    this.#dayIndex = dayIndex;
    this.#orderList = orderList;
  }

  #dDayDiscount() {
    if (this.#visitDate <= DATES.christmas) {
      const price =
        DISCOUNT_PRICES.dDay + (this.#visitDate - 1) * DISCOUNT_PRICES.dDayInc;

      this.#discounts.add({ title: TITLES.dDay, price });
    }

    return GIVEAWAYS.none;
  }

  #daysOfWeekDiscount() {
    const isWeekend = this.#dayIndex >= DATES.weekendIndex;
    let amount = 0;

    this.#orderList.forEach(order => {
      const { menu, quantity } = order;
      const price = DISCOUNT_PRICES.week * quantity;
      amount += this.#calculateDaysOfWeek(menu, price, isWeekend);
    });

    return this.#addDaysOfWeekDiscount(isWeekend, amount);
  }

  #addDaysOfWeekDiscount(isWeekend, amount) {
    if (isWeekend && amount) {
      this.#discounts.add({ title: TITLES.weekend, price: amount });
    }
    if (!isWeekend && amount) {
      this.#discounts.add({ title: TITLES.weekday, price: amount });
    }
    return null;
  }

  #calculateDaysOfWeek(menu, price, isWeekend) {
    if (isWeekend && MENUS.main[menu]) return price;
    if (!isWeekend && MENUS.dessert[menu]) return price;
    return null;
  }

  #specialDiscount() {
    const isSpecialDay = this.#dayIndex === DATES.specialDayIndex;
    const isChristmas = this.#visitDate === DATES.christmas;

    if (isSpecialDay || isChristmas) {
      this.#discounts.add({
        title: TITLES.special,
        price: DISCOUNT_PRICES.special,
      });
    }
  }

  getDiscounts(preTotalPrice) {
    if (preTotalPrice < ORDER.minPrice) return NONE;
    this.#dDayDiscount();
    this.#daysOfWeekDiscount();
    this.#specialDiscount();

    return Array.from(this.#discounts);
  }

  getTotalDiscountPrice() {
    const totalDiscountPrice = Array.from(this.#discounts).reduce(
      (acc, benefit) => acc + benefit.price,
      0,
    );

    if (totalDiscountPrice === DISCOUNT_PRICES.none) return 0;

    return totalDiscountPrice;
  }
}

export default Discount;
