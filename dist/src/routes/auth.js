"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../services/authService");
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    try {
        const result = await (0, authService_1.login)(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map