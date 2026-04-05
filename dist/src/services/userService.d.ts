export interface CreateUserPayload {
    email: string;
    password: string;
    roleId: string;
}
export interface UpdateUserPayload {
    roleId?: string;
    isActive?: boolean;
}
export declare function createUser(payload: CreateUserPayload): Promise<{
    role: {
        id: string;
        name: string;
    };
} & {
    email: string;
    roleId: string;
    isActive: boolean;
    id: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getUsers(): Promise<({
    role: {
        id: string;
        name: string;
    };
} & {
    email: string;
    roleId: string;
    isActive: boolean;
    id: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare function updateUser(id: string, payload: UpdateUserPayload): Promise<{
    role: {
        id: string;
        name: string;
    };
} & {
    email: string;
    roleId: string;
    isActive: boolean;
    id: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getUserById(id: string): Promise<{
    role: {
        id: string;
        name: string;
    };
} & {
    email: string;
    roleId: string;
    isActive: boolean;
    id: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=userService.d.ts.map