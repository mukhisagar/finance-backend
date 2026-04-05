"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.requireAdmin, users_1.createUserHandler);
router.get('/', auth_1.requireAdmin, users_1.getUsersHandler);
router.patch('/:id', auth_1.requireAdmin, users_1.updateUserHandler);
exports.default = router;
//# sourceMappingURL=users.js.map