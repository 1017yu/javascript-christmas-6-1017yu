import { UNITS } from '../constants/system.js';

const priceFormatter = number => {
  const price = new Intl.NumberFormat().format(number).toString();

  return `${price}${UNITS.won}`;
};

export default priceFormatter;
