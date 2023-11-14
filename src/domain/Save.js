import fs from 'fs';

class Save {
  #visitDate;

  #eventPlanner;

  #filePath;

  constructor(eventPlanner) {
    this.#eventPlanner = eventPlanner;
    this.#filePath = 'src/data/dec-promotion.json';
    this.#writeData();
  }

  #writeData() {
    const readData = this.#readData();

    const userData = {
      user: readData.length,
      visitDate: this.#visitDate,
      total: this.#eventPlanner.getPreTotalPrice(),
      benefit: this.#eventPlanner.getTotalBenefitPrice(),
      payment: this.#eventPlanner.getTotalPrice(),
    };
    readData.push(userData);

    const jsonData = JSON.stringify(readData, null, 2);
    fs.writeFileSync(this.#filePath, jsonData, 'utf-8');
  }

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
