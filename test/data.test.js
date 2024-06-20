const request = require("superagent");
const agent = request.agent();

describe("Data Endpoints", () => {
  it("should get one data", async () => {
    await agent
      .disableTLSCerts()
      .get("https://localhost:8081/data/5c6ba7a7319453089a85de2c")
      .end(async (err, res) => {
        outerRes = JSON.stringify(res.body);
        // outerRes = res.data;
        // outerErr = err;
        expect(res.statusCode).toEqual(200,);
      });
  });
});
