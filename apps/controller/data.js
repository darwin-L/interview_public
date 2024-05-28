const fetch = require("node-fetch");
const model = require("../model");
const serverDefinedError = require("../errors");

async function reqData(req, res, next, serverInstanse) {
  try {
    const database = serverInstanse.db("demoDB");
    const collection = database.collection("single_data_req_log", {
      timeseries: {
        timeField: "timestamp",
        metaField: "metadata"
      }
    });
    const log = new model.Log()
    log.setInput(req._path)

    const result = await collection.insertOne(log.getLog())
    if (result.acknowledged !== true) {
      errors.dbOperationFailed();
      throw (errors)
    }

    const errors = new serverDefinedError.data();
    const reqId = req.path_parameters.id;
    if (typeof reqId !== "string") {
      errors.inputNotValid();
      throw errors;
    }

    // 2024-enterprise-cybersecurity-guide
    // FIXME: token after /data/ needed to be set manually uO8XZHbaVLjEUNV3gE4JJ 
    const url = process.env.url_token.toString().trim()
    if (url === undefined || url.length != 21) {
      errors.requireUrlNotValid()
      throw errors
    }
    const postData = await fetch(
      `https://teamt5.org/_next/data/${url}/tw/posts/${reqId}.json`
    );

    const resData = await postData.json();

    if (resData.pageProps === undefined) {
      errors.dataNotValid();
      throw errors;
    }


    res.status(200).type("json");
    res.json({ data: resData.pageProps.post.contents });

  } catch (e) {
    if (e.apiCode !== undefined) {
      res.status(500).type("json").json({
        code: e._getErrorRes(),
        msg: e.message,
        req: req.body,
      });
    }

    res
      .status(500)
      .type("json")
      .json({
        code: "001999",
        msg: String(e),
      });
  }
}
module.exports = reqData;
