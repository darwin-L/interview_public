
class Datas {
  constructor() {
    this.data = {
      count: 0,
      dataArray: [],
    };
  }

  setDatas(elements) {
    this.data.dataArray = elements;
  }
  setCount(count) {
    this.data.count = count;
  }
}
module.exports = Datas;
