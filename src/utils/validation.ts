import { z } from "zod";

// User schemas
export const createUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleId: z.string().uuid("Invalid role ID"),
});

export const updateUserSchema = z.object({
  roleId: z.string().uuid("Invalid role ID").optional(),
  isActive: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Financial Record schemas
export const createRecordSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1, "Category required"),
  date: z.string().datetime(),
  notes: z.string().optional(),
});

export const updateRecordSchema = createRecordSchema.partial();

export const filterRecordsSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  category: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

export const dashboardTrendsSchema = z.object({
  period: z.enum(["daily", "weekly", "monthly"]).optional(),
});
