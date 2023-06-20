"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3001;
const prisma = new client_1.PrismaClient();
app_1.default.listen(PORT, () => {
    console.log(`Running server on port: ${PORT}`);
});
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
});
