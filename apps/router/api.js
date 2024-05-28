const HyperExpress = require("hyper-express");
const router = new HyperExpress.Router();
const controller = require("../controller/index");
const { MongoClient } = require("mongodb");

let mongoClient;
// server-side db init template
async function DbInit() {
  try {
    const id = process.env.mongodb_ip.toString().trim()
    const port = process.env.mongodb_port.toString().trim()
    const db = process.env.db_name.toString().trim()
    const collection = process.env.collection_name.toString().trim()
    mongoClient = new MongoClient(`mongodb://${id}:${port}`, { minPoolSize: 1, maxPoolSize: 100 });
    
    await mongoClient.connect();
    const database = mongoClient.db(db);
    const collectionCheck = await database.listCollections({ name: collection }).toArray()
    if(collectionCheck.length === 0) {
      database.createCollection(collection, {
        timeseries: {
          timeField: "timestamp",
          metaField: "metadata"
        }
      });
    }

  } catch (e) {
    await mongoClient.close();
    throw e;
  }
}

try {
  router.get("/data/:id", async (req, res, next) => {
    controller.data(req, res, next, mongoClient);
  });

  router.post("/datas", async (req, res, next) => {
    const body = await req.json();
    req.body = body;
    controller.datas(req, res, next);
  });

  router.post("/auth_token", async (req, res, next) => {
    const body = await req.json();
    req.body = body;
    controller.auth_token(req, res, next);
  });

  router.all("*", (req, res) => {
    res.status(404).send("your request page is not found.");
  });
} catch (e) {
  throw e;
}

module.exports = {
  router,
  init: DbInit,
};
