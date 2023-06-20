"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const CustomErrors_1 = __importDefault(require("../errors/CustomErrors"));
const tokenHelper_1 = __importDefault(require("../helpers/tokenHelper"));
class UserController {
    constructor() {
        this.userModel = new user_service_1.default();
        this.tokenHelper = new tokenHelper_1.default();
    }
    async create(req, res) {
        const newUser = await this.userModel.create(req.body);
        if (!newUser)
            throw new CustomErrors_1.default(400, 'Invalid Format');
        const { email } = newUser;
        const payload = { email };
        const token = this.tokenHelper.createToken(payload);
        return res.status(201).json({ token });
    }
}
exports.default = UserController;
