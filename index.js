const HyperExpress = require("hyper-express");
const init = require("./apps/router/api").init;

// 在測試時superAgent目前對於self-signed-ca 有特殊設定
// https://github.com/ladjs/superagent/issues/1625
const webserver = new HyperExpress.Server({
  key_file_name: "./ssl/key.pm",
  cert_file_name: "./ssl/crt.pm",
});

try {
  const apiRouter = require("./apps/router/api").router;
  webserver.use(apiRouter);
} catch (e) {
  throw e;
}

webserver
  .listen(8081)
  .then(async() => {
    await init();
  })
  .then((socket) => {
    console.log("server started on port 8081");
  })
  .catch((error) => {
    console.log("failed to start server on port 8081: \n");

    console.log(error);
    throw error;
  });

module.exports = webserver;
