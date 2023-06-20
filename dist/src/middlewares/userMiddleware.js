"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserZodSchema_1 = require("../interfaces/UserZodSchema");
const CustomErrors_1 = __importDefault(require("../errors/CustomErrors"));
function validateUser(user) {
    try {
        return UserZodSchema_1.UserZodSchema.parse(user);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const details = error.flatten();
            const firstError = details.fieldErrors[Object.keys(details.fieldErrors)[0]][0];
            throw new CustomErrors_1.default(400, firstError);
        }
        throw error;
    }
}
const validateUserFields = (req, res, next) => {
    try {
        const user = req.body;
        req.body = validateUser(user);
        next();
    }
    catch (error) {
        if (error instanceof CustomErrors_1.default) {
            next(error);
        }
        else {
            next(new CustomErrors_1.default(500, 'Internal Server Error'));
        }
    }
};
exports.default = validateUserFields;
