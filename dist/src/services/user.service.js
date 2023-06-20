"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const CustomErrors_1 = __importDefault(require("../errors/CustomErrors"));
class UserPrismaModel {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(userData) {
        try {
            const { password, ...otherData } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = this.prisma.user.create({
                data: {
                    ...otherData,
                    password: hashedPassword,
                },
            });
            return await createdUser;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new CustomErrors_1.default(400, 'Email já está em uso. Por favor, escolha outro.');
            }
            throw error;
        }
    }
}
exports.default = UserPrismaModel;
