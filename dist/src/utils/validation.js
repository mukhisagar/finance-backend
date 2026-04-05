"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardTrendsSchema = exports.filterRecordsSchema = exports.updateRecordSchema = exports.createRecordSchema = exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// User schemas
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    roleId: zod_1.z.string().uuid("Invalid role ID"),
});
exports.updateUserSchema = zod_1.z.object({
    roleId: zod_1.z.string().uuid("Invalid role ID").optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
// Financial Record schemas
exports.createRecordSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be positive"),
    type: zod_1.z.enum(["INCOME", "EXPENSE"]),
    category: zod_1.z.string().min(1, "Category required"),
    date: zod_1.z.string().datetime(),
    notes: zod_1.z.string().optional(),
});
exports.updateRecordSchema = exports.createRecordSchema.partial();
exports.filterRecordsSchema = zod_1.z.object({
    type: zod_1.z.enum(["INCOME", "EXPENSE"]).optional(),
    category: zod_1.z.string().optional(),
    dateFrom: zod_1.z.string().datetime().optional(),
    dateTo: zod_1.z.string().datetime().optional(),
});
exports.dashboardTrendsSchema = zod_1.z.object({
    period: zod_1.z.enum(["daily", "weekly", "monthly"]).optional(),
});
//# sourceMappingURL=validation.js.map