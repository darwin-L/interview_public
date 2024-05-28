const request = require("superagent");
const agent = request.agent();

describe("Data Endpoints", () => {
  it("should get one data", async () => {
    await agent
      .disableTLSCerts()
      .get("https://localhost:8081/data/2024-enterprise-cybersecurity-guide")
      .end(async (err, res) => {
        outerRes = JSON.stringify(res.body);
        // outerRes = res.data;
        // outerErr = err;
        expect(res.statusCode).toEqual(200,);
      });
  });
});
