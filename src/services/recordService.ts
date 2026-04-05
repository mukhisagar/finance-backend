import { PrismaClient } from "@prisma/client";
import {
  createRecordSchema,
  filterRecordsSchema,
  dashboardTrendsSchema,
} from "../utils/validation";
import { z } from "zod";

const prisma = new PrismaClient();

export async function createRecord(userId: string, data: any) {
  const validated = createRecordSchema.parse(data);
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

export async function getRecords(userId: string, filters: any = {}) {
  const validated = filterRecordsSchema.parse(filters);
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

export async function updateRecord(id: string, data: any) {
  const validated = createRecordSchema.partial().parse(data);
  return prisma.financialRecord.update({
    where: { id },
    data: validated,
  });
}

export async function deleteRecord(id: string) {
  return prisma.financialRecord.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

export async function getDashboardSummary(userId: string) {
  const totals = await prisma.financialRecord.groupBy({
    by: ["type"],
    where: { userId, deletedAt: null },
    _sum: { amount: true },
  });

  const income =
    (totals.find((t: any) => t.type === "INCOME") as any)?._sum?.amount || 0;
  const expense =
    (totals.find((t: any) => t.type === "EXPENSE") as any)?._sum?.amount || 0;
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

export async function getTrends(userId: string, period: string = "monthly") {
  const trends = await prisma.financialRecord.groupBy({
    by: ["type"],
    where: { userId, deletedAt: null },
    _sum: { amount: true },
  });
  return trends;
}
