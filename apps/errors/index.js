const DataError = require('./001_data')
const DatasError = require('./002_datas')
const AuthTokenError = require('./003_auth_token')

const serverDefinedError = {
  data: DataError,
  datas: DatasError,
  authtoken: AuthTokenError
}

module.exports = serverDefinedError