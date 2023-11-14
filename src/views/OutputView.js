import { EOL as LINE_SEPARATOR } from 'os';
import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES } from '../constants/messages.js';
import { NONE, SYMBOLS, TIME, UNITS } from '../constants/system.js';
import priceFormatter from '../utils/priceFormatter.js';
import { BENEFITS } from '../constants/events.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  printIntro() {
    Console.print(OUTPUT_MESSAGES.intro);
  },

  printOutro(date) {
    Console.print(
      `${TIME.month}${UNITS.month} ${date}${OUTPUT_MESSAGES.outro}${LINE_SEPARATOR}`,
    );
  },

  printPlanner(orderList, planner) {
    this.printOrderList(BENEFITS.menu, orderList);
    this.printPrice(BENEFITS.preDiscount, planner.getPreTotalPrice());
    this.printOrderList(BENEFITS.giveaway, planner.getGiveaway());
    this.printBenefitList(BENEFITS.benefitList, planner.getBenefitList());
    this.printBenefitPrice(
      BENEFITS.totalBenefitPrice,
      planner.getTotalBenefitPrice(),
    );
    this.printPrice(BENEFITS.totalPrice, planner.getTotalPrice());
    this.printBadge(BENEFITS.badge, planner.getBadge());
  },

  printOrderList(title, orderList) {
    this.print(`${title}`);

    if (orderList === NONE) this.print(NONE);
    if (orderList !== NONE) {
      orderList.forEach(order => {
        this.print(`${order.menu} ${order.quantity}${UNITS.quantity}`);
      });
    }
    this.print(SYMBOLS.blank);
  },

  printPrice(title, price) {
    this.print(
      `${title}${LINE_SEPARATOR}${priceFormatter(price)}${LINE_SEPARATOR}`,
    );
  },

  printBenefitPrice(title, price) {
    const isNone = price ? SYMBOLS.dash : SYMBOLS.blank;

    this.print(`${title}`);
    this.print(`${isNone}${priceFormatter(price)}${LINE_SEPARATOR}`);
  },

  printBenefitList(title, benefitList) {
    const { colon, dash } = SYMBOLS;
    this.print(`${title}`);

    if (benefitList === NONE) this.print(NONE);
    if (benefitList !== NONE) {
      benefitList.forEach(order => {
        this.print(
          `${order.title}${colon} ${dash}${priceFormatter(order.price)}`,
        );
      });
    }
    this.print(SYMBOLS.blank);
  },

  printBadge(title, badge) {
    this.print(`${title}`);
    this.print(`${badge}`);
  },
};

export default OutputView;
