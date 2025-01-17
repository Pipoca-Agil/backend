"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const app = (0, express_1.default)();
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(user_route_1.default);
app.use(errorMiddleware_1.default);
exports.default = app;
