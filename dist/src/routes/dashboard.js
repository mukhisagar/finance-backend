"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_1 = require("../controllers/dashboard");
const router = (0, express_1.Router)();
router.get('/summary', dashboard_1.getSummaryHandler);
router.get('/trends', dashboard_1.getTrendsHandler);
exports.default = router;
//# sourceMappingURL=dashboard.js.map