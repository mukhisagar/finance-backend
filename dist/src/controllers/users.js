"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = createUserHandler;
exports.getUsersHandler = getUsersHandler;
exports.updateUserHandler = updateUserHandler;
const userService_1 = require("../services/userService");
async function createUserHandler(req, res) {
    try {
        const user = await (0, userService_1.createUser)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message || "Validation error" });
    }
}
async function getUsersHandler(req, res) {
    try {
        const users = await (0, userService_1.getUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function updateUserHandler(req, res) {
    try {
        const { id } = req.params;
        const user = await (0, userService_1.updateUser)(id, req.body);
        res.json(user);
    }
    catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(400).json({ error: error.message });
    }
}
//# sourceMappingURL=users.js.map