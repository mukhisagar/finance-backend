import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare function createUserHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getUsersHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateUserHandler(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=users.d.ts.map