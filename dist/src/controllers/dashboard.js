"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummaryHandler = getSummaryHandler;
exports.getTrendsHandler = getTrendsHandler;
const recordService_1 = require("../services/recordService");
const validation_1 = require("../utils/validation");
async function getSummaryHandler(req, res) {
    try {
        const summary = await (0, recordService_1.getDashboardSummary)(req.user.userId);
        res.json(summary);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function getTrendsHandler(req, res) {
    try {
        const validated = validation_1.dashboardTrendsSchema.parse(req.query);
        const trends = await (0, recordService_1.getTrends)(req.user.userId, validated.period);
        res.json(trends);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// getRecentHandler not used - summary includes recent
//# sourceMappingURL=dashboard.js.map