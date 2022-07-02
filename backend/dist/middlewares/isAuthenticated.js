"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, ' ' // generate token in https://www.md5hashgenerator.com/
        );
        req.user_id = sub;
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(404).end();
    }
}
exports.isAuthenticated = isAuthenticated;
