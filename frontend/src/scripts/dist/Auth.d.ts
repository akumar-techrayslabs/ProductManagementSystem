export declare function loginSuperAdmin(email: string, password: string): Promise<{
    succcess: boolean;
    success?: never;
    message?: never;
} | {
    success: boolean;
    message: string;
    succcess?: never;
}>;
export declare function verifyToken(): Promise<boolean>;
export declare function logoutAdmin(): void;
//# sourceMappingURL=Auth.d.ts.map