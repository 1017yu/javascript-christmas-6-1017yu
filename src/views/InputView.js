import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGES } from '../constants/messages.js';

const InputView = {
  async readDate() {
    return await Console.readLineAsync(INPUT_MESSAGES.date);
  },

  async readOrder() {
    return await Console.readLineAsync(INPUT_MESSAGES.order);
  },
};

export default InputView;
