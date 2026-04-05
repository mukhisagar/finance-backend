export interface LoginPayload {
    email: string;
    password: string;
}
export declare function login(payload: LoginPayload): Promise<{
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
}>;
export declare function verifyToken(token: string): {
    userId: string;
    role: string;
};
//# sourceMappingURL=authService.d.ts.map