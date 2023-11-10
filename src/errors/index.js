import AppError from './AppError.js';

const validationErrorHandler = message => {
  throw new AppError(message);
};

export default validationErrorHandler;
