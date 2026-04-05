"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.PORT = exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
exports.PORT = parseInt(process.env.PORT || "3000", 10);
exports.DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";
//# sourceMappingURL=config.js.map