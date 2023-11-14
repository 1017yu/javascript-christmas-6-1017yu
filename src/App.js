import EventController from './controller/index.js';

class App {
  #controller;

  constructor() {
    this.#controller = new EventController();
  }

  async run() {
    await this.#controller.startEvent();
  }
}

export default App;
