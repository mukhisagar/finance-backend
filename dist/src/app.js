"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const records_1 = __importDefault(require("./routes/records"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const auth_2 = require("./middleware/auth");
const app = (0, express_1.default)();
exports.app = app;
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));
// Auth routes (public)
app.use('/api/v1/auth', auth_1.default);
// Protected routes
app.use('/api/v1', auth_2.requireAuth);
app.use('/api/v1/users', users_1.default);
app.use('/api/v1/records', records_1.default);
app.use('/api/v1/dashboard', dashboard_1.default);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});
//# sourceMappingURL=app.js.map