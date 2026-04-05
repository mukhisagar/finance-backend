"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdminAnalystOrViewer = exports.requireAdminOrAnalyst = exports.requireAdmin = void 0;
exports.requireAuth = requireAuth;
exports.requireRole = requireRole;
const authService_1 = require("../services/authService");
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ error: "Missing or invalid authorization header" });
    }
    try {
        const token = authHeader.substring(7);
        req.user = (0, authService_1.verifyToken)(token);
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}
function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: `Access denied. Required one of: ${allowedRoles.join(", ")}`,
            });
        }
        next();
    };
}
// Role helpers
exports.requireAdmin = requireRole("ADMIN");
exports.requireAdminOrAnalyst = requireRole("ADMIN", "ANALYST");
exports.requireAdminAnalystOrViewer = requireRole("ADMIN", "ANALYST", "VIEWER");
//# sourceMappingURL=auth.js.map