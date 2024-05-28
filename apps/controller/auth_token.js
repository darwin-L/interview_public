const fetch = require("node-fetch");
const model = require("../model");
const serverDefinedError = require("../errors");
const crypto = require("crypto")

function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
}
async function authToken(req, res, next, serverInstanse) {
    try {
        const errors = new serverDefinedError.authtoken();


        const authInput = req.body.authToken;

        if (authInput === undefined ||  typeof authInput !== 'string') {
            errors.inputNotValid("authToken");
            throw errors;
        }
        const sha = crypto.createHash("sha256").update(authInput)
        const authToken = sha.digest("hex")

        const authData = await fetch(
            "https://github.com/darwin-L?controller=profiles&user_id=darwin-L"
        );
        

        const result = await streamToString(authData.body)
        const stringStartIdx = result.indexOf(`<div class="p-note user-profile-bio mb-3 js-user-profile-bio f4" data-bio-text="`) + 80 
        const validString  = result.substring(
            stringStartIdx,
            stringStartIdx + authToken.length) 

        if (validString == authToken) {
            const resData = { data: "ok" };
            res.status(200).type("json");
            res.json(resData);
        } else {
            errors.authFailed(authToken);
            throw errors;
        }


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
module.exports = authToken;
