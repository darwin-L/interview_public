const fetch = require("node-fetch");
const view = require("../view");
const serverDefinedError = require("../errors");

async function reqDatas(req, res, next) {
  try {
    const errors = new serverDefinedError.datas();
    if (!Number.isInteger(req.body.offset)) {
      errors.inputNotValid("offset ");
      throw errors;
    }

    if (!Number.isInteger(req.body.limit)) {
      errors.inputNotValid("limit ");
      throw errors;
    }
    const offset = req.body.offset;
    const limit = req.body.limit;
    
    const url = process.env.url_token.toString().trim()
    if (url === undefined || url.length != 21) {
      errors.requireUrlNotValid()
      throw errors
    }

    const queryDatas = await fetch(
      `https://teamt5.org/_next/data/${url}/tw/blog.json?lang=tw`,
      {
        method: "Get",
        headers: { "Content-Type": "application/json" },
      }
    );
    
    if (queryDatas.body === undefined || queryDatas.status != 200) {
      console.dir(queryDatas, { depth: null });
      errors.dataNotValid();
      throw errors;
    }

    const resData = await queryDatas.json();
    const response = new view.Datas();

    
    response.setDatas(resData.pageProps.topics.slice(offset, offset + limit));
    response.setCount(response.data.dataArray.length)

    res.status(200).type("json");
    res.json(response);
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
        code: "002999",
        msg: String(e),
      });
  }
}

module.exports = reqDatas;
