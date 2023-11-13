import PromotionController from './controller/index.js';

class App {
  #controller;

  constructor() {
    this.#controller = new PromotionController();
  }

  async run() {
    this.#controller.startPromotion();
  }
}

export default App;
