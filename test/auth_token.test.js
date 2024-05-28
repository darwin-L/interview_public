const request = require("superagent");
const agent = request.agent();

describe("Auth input token", () => {
    it("should get 'ok' of input token", async () => {
        await agent
            .disableTLSCerts()
            .post("https://localhost:8081/auth_token")
            .send({
                "authToken": "auth_testing"
            })
            .end(async (err, res) => {
                outerRes = JSON.stringify(res.body);
                // outerRes = res.data;
                // outerErr = err;
                expect(res.body.data).toEqual("ok");
            });
    });
});
