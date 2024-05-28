class DataError extends Error {
  _getErrorRes() {
    return this.functionCode + this.apiCode
  }
  constructor(messsage) {
    super(messsage)
    this.functionCode = ''
    this.apiCode = '001'
    this.message = ''
  }
  dataNotValid() {
    this.functionCode = '101'
    this.message = '回傳資料不符預期'
  }
  inputNotValid() {
    this.functionCode = '102'
    this.message = '傳入資料不符預期'
  }
  requireUrlNotValid() {
    this.functionCode = '103'
    this.message = '要請求的url不合規範'
  }

  dbOperationFailed() {
    this.functionCode = '503'
    this.message = '資料庫操作失敗'
  }


}

module.exports = DataError