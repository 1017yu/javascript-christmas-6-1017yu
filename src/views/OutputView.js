import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES } from '../constants/messages.js';

const OutputView = {
  print(message) {
    Console.print(message);
  },

  printIntro() {
    Console.print(OUTPUT_MESSAGES.intro);
  },
};

export default OutputView;
