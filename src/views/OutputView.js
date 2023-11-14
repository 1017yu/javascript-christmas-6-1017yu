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
    this.print(OUTPUT_MESSAGES.intro);
  },

  printOutro(date) {
    this.print(`${TIME.month}${UNITS.month} ${date}${OUTPUT_MESSAGES.outro}\n`);
  },

  printPlanner(orderList, planner) {
    this.printOrderList(BENEFITS.menu, orderList);
    this.printPrice(BENEFITS.preTotalPrice, planner.getPreTotalPrice());
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
    this.printList(title, orderList, order => {
      return `${order.menu} ${order.quantity}${UNITS.quantity}`;
    });
  },

  printBenefitList(title, benefitList) {
    this.printList(title, benefitList, benefit => {
      return `${benefit.title}${SYMBOLS.colon} ${SYMBOLS.dash}${priceFormatter(
        benefit.price,
      )}`;
    });
  },

  printList(title, list, message) {
    this.print(`${title}`);

    if (list === NONE) return this.print(NONE, SYMBOLS.blank);

    list.forEach(item => {
      this.print(message(item));
    });

    return this.print(SYMBOLS.blank);
  },

  printPrice(title, price) {
    this.print(`${title}\n${priceFormatter(price)}\n`);
  },

  printBenefitPrice(title, price) {
    const isNone = price ? SYMBOLS.dash : SYMBOLS.blank;

    this.print(`${title}\n${isNone}${priceFormatter(price)}\n`);
  },

  printBadge(title, badge) {
    this.print(`${title}\n${badge}`);
  },
};

export default OutputView;
