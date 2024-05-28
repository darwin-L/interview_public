class AuthTokenError extends Error {
  _getErrorRes() {
    return this.functionCode + this.apiCode
  }
  constructor(messsage) {
    super(messsage)
    this.functionCode = ''
    this.apiCode = '003'
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
  
  authFailed() {
    this.functionCode = '103'
    this.message = ' 傳入的token驗證失敗'
  }
  
}

module.exports = AuthTokenError