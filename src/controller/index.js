import VisitDate from '../domain/VisitDate.js';
import Order from '../domain/Order.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import EventPlanner from '../domain/EventPlanner.js';
import Save from '../domain/Save.js';

class EventController {
  #inputView;

  #outputView;

  #dayIndex;

  #eventPlanner;

  constructor() {
    this.#inputView = InputView;
    this.#outputView = OutputView;
  }

  async startEvent() {
    this.#outputView.printIntro();

    const visitDate = await this.#requestVisitDate();
    const orderList = await this.#requestOrderList();

    this.#outputView.printOutro(visitDate);
    this.#eventPlanner = this.#showEventPlanner(visitDate, orderList);
    this.#saveResult(this.#eventPlanner);
  }

  /**
   * 방문 날짜를 입력 받아 반환, 요일 인덱스 멤버 변수 할당
   * @returns {number} - 요일 인덱스
   */
  async #requestVisitDate() {
    try {
      const visitDate = await this.#inputView.readDate();
      this.#dayIndex = new VisitDate(visitDate).getDayIndex();

      return visitDate;
    } catch ({ message }) {
      this.#outputView.print(message);

      return this.#requestVisitDate();
    }
  }

  /**
   * 주문할 메뉴와 개수를 입력 받아 가공한 주문 메뉴를 리턴
   * @returns {Set<{ menu: string, quantity: number }>}
   */
  async #requestOrderList() {
    try {
      const orderInput = await this.#inputView.readOrder();

      return new Order(orderInput).getOrderList();
    } catch ({ message }) {
      this.#outputView.print(message);

      return this.#requestOrderList();
    }
  }

  /**
   * 유저의 입력 값을 기반으로 이벤트 플래너를 구성하고 출력
   * @param {number} visitDate - 요일 인덱스
   * @param {Set<{ menu: string, quantity: number }>} orderList - 주문 메뉴와 수량을 나타내는 Set 객체
   * @returns
   */
  #showEventPlanner(visitDate, orderList) {
    this.#eventPlanner = new EventPlanner(visitDate, this.#dayIndex, orderList);
    this.#outputView.printPlanner(orderList, this.#eventPlanner);

    return this.#eventPlanner;
  }

  /**
   * 이벤트 플래너의 주요 데이터를 Save 클래스에 넘겨 저장
   */
  #saveResult() {
    new Save(this.#eventPlanner);
  }
}

export default EventController;
