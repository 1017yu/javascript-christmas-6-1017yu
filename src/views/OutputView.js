import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES } from '../constants/messages.js';
import { TIME, UNITS } from '../constants/system.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  printIntro() {
    Console.print(OUTPUT_MESSAGES.intro);
  },

  printOutro(date) {
    Console.print(
      `${TIME.month}${UNITS.month} ${date}${OUTPUT_MESSAGES.outro}`,
    );
  },
};

export default OutputView;
