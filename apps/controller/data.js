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
    if (typeof reqId !== "string" || reqId.length != 24) {
      errors.inputNotValid();
      throw errors;
    }

    const url = "https://find.lawsnote.com/1/lawyer"
    const getData = await fetch(
      `${url}/${reqId}`
    );

    const resData = await getData.json();

    if (resData.data === undefined) {
      errors.dataNotValid();
      throw errors;
    }


    res.status(200).type("json");
    res.json({ data: resData.data });

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
