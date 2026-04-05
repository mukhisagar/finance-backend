"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.getUserById = getUserById;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validation_1 = require("../utils/validation");
const prisma = new client_1.PrismaClient();
async function createUser(payload) {
    const validated = validation_1.createUserSchema.parse(payload);
    const hashedPassword = await bcryptjs_1.default.hash(validated.password, 10);
    const user = await prisma.user.create({
        data: {
            email: validated.email,
            passwordHash: hashedPassword,
            roleId: validated.roleId,
        },
        include: { role: true },
    });
    return user;
}
async function getUsers() {
    return prisma.user.findMany({
        include: { role: true },
    });
}
async function updateUser(id, payload) {
    const validated = validation_1.updateUserSchema.parse(payload);
    return prisma.user.update({
        where: { id },
        data: validated,
        include: { role: true },
    });
}
async function getUserById(id) {
    return prisma.user.findUnique({
        where: { id },
        include: { role: true },
    });
}
//# sourceMappingURL=userService.js.map