"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const validation_1 = require("../utils/validation");
const config_1 = require("../utils/config");
const prisma = new client_1.PrismaClient();
async function login(payload) {
    const validated = validation_1.loginSchema.parse(payload);
    const user = await prisma.user.findUnique({
        where: { email: validated.email },
        include: { role: true },
    });
    if (!user ||
        !user.isActive ||
        !(await bcryptjs_1.default.compare(validated.password, user.passwordHash))) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role.name }, config_1.JWT_SECRET, { expiresIn: "24h" });
    return {
        token,
        user: { id: user.id, email: user.email, role: user.role.name },
    };
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    }
    catch {
        throw new Error("Invalid token");
    }
}
//# sourceMappingURL=authService.js.map