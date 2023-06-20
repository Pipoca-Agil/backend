"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, _req, res, _next) => {
    res.status(err.status || 500).json({
        message: err.message,
    });
};
exports.default = errorMiddleware;
