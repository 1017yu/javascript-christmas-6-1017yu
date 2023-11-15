import fs from 'fs';
import { FILE_PATH } from '../constants/system.js';

class Save {
  #eventPlanner;

  #filePath;

  constructor(eventPlanner) {
    this.#eventPlanner = eventPlanner;
    this.#filePath = FILE_PATH;
    this.#writeData();
  }

  // 기존 JSON 데이터에 신규 데이터를 추가하고 저장
  #writeData() {
    const readData = this.#readData();
    const userData = {
      user: readData.length,
      badge: this.#eventPlanner.getBadge(),
      total: this.#eventPlanner.getPreTotalPrice(),
      benefit: this.#eventPlanner.getTotalBenefitPrice(),
      payment: this.#eventPlanner.getTotalPrice(),
    };
    readData.push(userData);
    const jsonData = JSON.stringify(readData, null, 2);

    fs.writeFileSync(this.#filePath, jsonData, 'utf-8');
  }

  // 데이터를 읽어와 파싱하여 반환, 기존의 데이터가 없다면 빈 배열 추가
  #readData() {
    try {
      const data = fs.readFileSync(this.#filePath, 'utf-8');

      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}

export default Save;
