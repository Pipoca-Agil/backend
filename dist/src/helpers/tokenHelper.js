"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const { JWT_SECRET } = process.env;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '5d' };
class TokenHelper {
    constructor() {
        this.secret = JWT_SECRET;
    }
    createToken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, this.secret, JWT_OPTIONS);
        return token;
    }
    verifyToken(token) {
        const payload = jsonwebtoken_1.default.verify(token, this.secret);
        return payload;
    }
}
exports.default = TokenHelper;
