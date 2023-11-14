import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGES } from '../constants/messages.js';

const InputView = {
  async readDate() {
    return Console.readLineAsync(INPUT_MESSAGES.date);
  },

  async readOrder() {
    return Console.readLineAsync(INPUT_MESSAGES.order);
  },
};

export default InputView;
