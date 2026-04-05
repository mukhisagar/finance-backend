export declare function createRecord(userId: string, data: any): Promise<{
    type: string;
    amount: number;
    date: Date;
    category: string;
    notes: string | null;
    id: string;
    userId: string;
    deletedAt: Date | null;
}>;
export declare function getRecords(userId: string, filters?: any): Promise<{
    type: string;
    amount: number;
    date: Date;
    category: string;
    notes: string | null;
    id: string;
    userId: string;
    deletedAt: Date | null;
}[]>;
export declare function updateRecord(id: string, data: any): Promise<{
    type: string;
    amount: number;
    date: Date;
    category: string;
    notes: string | null;
    id: string;
    userId: string;
    deletedAt: Date | null;
}>;
export declare function deleteRecord(id: string): Promise<{
    type: string;
    amount: number;
    date: Date;
    category: string;
    notes: string | null;
    id: string;
    userId: string;
    deletedAt: Date | null;
}>;
export declare function getDashboardSummary(userId: string): Promise<{
    income: any;
    expense: any;
    net: number;
    categoryTotals: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.FinancialRecordGroupByOutputType, "category"[]> & {
        _sum: {
            amount: number;
        };
    })[];
    recent: {
        type: string;
        amount: number;
        date: Date;
        category: string;
        notes: string | null;
        id: string;
        userId: string;
        deletedAt: Date | null;
    }[];
}>;
export declare function getTrends(userId: string, period?: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.FinancialRecordGroupByOutputType, "type"[]> & {
    _sum: {
        amount: number;
    };
})[]>;
//# sourceMappingURL=recordService.d.ts.map