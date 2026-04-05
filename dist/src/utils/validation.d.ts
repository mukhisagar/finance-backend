import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    roleId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
    roleId?: string;
}, {
    email?: string;
    password?: string;
    roleId?: string;
}>;
export declare const updateUserSchema: z.ZodObject<{
    roleId: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    roleId?: string;
    isActive?: boolean;
}, {
    roleId?: string;
    isActive?: boolean;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
export declare const createRecordSchema: z.ZodObject<{
    amount: z.ZodNumber;
    type: z.ZodEnum<["INCOME", "EXPENSE"]>;
    category: z.ZodString;
    date: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "INCOME" | "EXPENSE";
    amount?: number;
    date?: string;
    category?: string;
    notes?: string;
}, {
    type?: "INCOME" | "EXPENSE";
    amount?: number;
    date?: string;
    category?: string;
    notes?: string;
}>;
export declare const updateRecordSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE"]>>;
    category: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: "INCOME" | "EXPENSE";
    amount?: number;
    date?: string;
    category?: string;
    notes?: string;
}, {
    type?: "INCOME" | "EXPENSE";
    amount?: number;
    date?: string;
    category?: string;
    notes?: string;
}>;
export declare const filterRecordsSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE"]>>;
    category: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodString>;
    dateTo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "INCOME" | "EXPENSE";
    category?: string;
    dateFrom?: string;
    dateTo?: string;
}, {
    type?: "INCOME" | "EXPENSE";
    category?: string;
    dateFrom?: string;
    dateTo?: string;
}>;
export declare const dashboardTrendsSchema: z.ZodObject<{
    period: z.ZodOptional<z.ZodEnum<["daily", "weekly", "monthly"]>>;
}, "strip", z.ZodTypeAny, {
    period?: "daily" | "weekly" | "monthly";
}, {
    period?: "daily" | "weekly" | "monthly";
}>;
//# sourceMappingURL=validation.d.ts.map