const priceFormatter = number => {
  return new Intl.NumberFormat().format(number).toString();
};

export default priceFormatter;
