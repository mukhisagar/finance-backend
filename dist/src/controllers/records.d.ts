import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare function createRecordHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function getRecordsHandler(req: AuthRequest, res: Response): Promise<void>;
export declare function updateRecordHandler(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteRecordHandler(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=records.d.ts.map