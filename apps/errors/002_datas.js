class DatasError extends Error {
  _getErrorRes() {
    return this.functionCode + this.apiCode
  }
  constructor(messsage) {
    super(messsage)
    this.functionCode = ''
    this.apiCode = '002'
    this.message = ''
  }
  dataNotValid() {
    this.functionCode = '101'
    this.message = '回傳資料不符預期'
  }
  inputNotValid(paramters) {
    this.functionCode = '102'
    this.message = paramters + ' 傳入資料不符預期'
  }
  requireUrlNotValid() {
    this.functionCode = '103'
    this.message = '要請求的url不合規範'
  }
  _getErrorRes() {
    return this.functionCode + this.apiCode
  }
}

module.exports = DatasError