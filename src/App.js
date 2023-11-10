import EventPlannerController from './controller/index.js';

class App {
  #controller;

  constructor() {
    this.#controller = new EventPlannerController();
  }

  async run() {
    this.#controller.startPlanner();
  }
}

export default App;
