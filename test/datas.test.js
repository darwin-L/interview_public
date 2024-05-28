const request = require("superagent");
const agent = request.agent();

describe("Datas Endpoints", () => {
    it("should get mutiple datas", async () => {
        await agent
            .disableTLSCerts()
            .post("https://localhost:8081/datas")
            .send({
                "offset": 0,
                "limit": 10
            })
            .end(async (err, res) => {
                outerRes = JSON.stringify(res.body);
                // outerRes = res.data;
                // outerErr = err;
                expect(res.statusCode).toEqual(200);
            });
    });
});
