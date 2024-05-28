class Log {
  constructor() {
    this.reqUrl = 0
    this.timestamp = ""
  }

  setInput(url) {
    this.reqUrl = url
    this.timestamp = new Date()
  }
  getLog() {
    return this
  }
}
module.exports = Log;
