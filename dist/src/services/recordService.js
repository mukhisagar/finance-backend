"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = createRecord;
exports.getRecords = getRecords;
exports.updateRecord = updateRecord;
exports.deleteRecord = deleteRecord;
exports.getDashboardSummary = getDashboardSummary;
exports.getTrends = getTrends;
const client_1 = require("@prisma/client");
const validation_1 = require("../utils/validation");
const prisma = new client_1.PrismaClient();
async function createRecord(userId, data) {
    const validated = validation_1.createRecordSchema.parse(data);
    return prisma.financialRecord.create({
        data: {
            amount: validated.amount,
            type: validated.type,
            category: validated.category,
            date: new Date(validated.date),
            notes: validated.notes,
            userId,
        },
    });
}
async function getRecords(userId, filters = {}) {
    const validated = validation_1.filterRecordsSchema.parse(filters);
    return prisma.financialRecord.findMany({
        where: {
            userId,
            deletedAt: null,
            ...(validated.type && { type: validated.type }),
            ...(validated.category && {
                category: { contains: validated.category },
            }),
            ...(validated.dateFrom && {
                date: { gte: new Date(validated.dateFrom) },
            }),
            ...(validated.dateTo && { date: { lte: new Date(validated.dateTo) } }),
        },
        orderBy: { date: "desc" },
    });
}
async function updateRecord(id, data) {
    const validated = validation_1.createRecordSchema.partial().parse(data);
    return prisma.financialRecord.update({
        where: { id },
        data: validated,
    });
}
async function deleteRecord(id) {
    return prisma.financialRecord.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
}
async function getDashboardSummary(userId) {
    const totals = await prisma.financialRecord.groupBy({
        by: ["type"],
        where: { userId, deletedAt: null },
        _sum: { amount: true },
    });
    const income = totals.find((t) => t.type === "INCOME")?._sum?.amount || 0;
    const expense = totals.find((t) => t.type === "EXPENSE")?._sum?.amount || 0;
    const net = income - expense;
    const categoryTotals = await prisma.financialRecord.groupBy({
        by: ["category"],
        where: { userId, deletedAt: null },
        _sum: { amount: true },
    });
    const recent = await prisma.financialRecord.findMany({
        where: { userId, deletedAt: null },
        orderBy: { date: "desc" },
        take: 5,
    });
    return { income, expense, net, categoryTotals, recent };
}
async function getTrends(userId, period = "monthly") {
    const trends = await prisma.financialRecord.groupBy({
        by: ["type"],
        where: { userId, deletedAt: null },
        _sum: { amount: true },
    });
    return trends;
}
//# sourceMappingURL=recordService.js.map