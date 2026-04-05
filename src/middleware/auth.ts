import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid authorization header" });
  }

  try {
    const token = authHeader.substring(7);
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Required one of: ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
}

// Role helpers
export const requireAdmin = requireRole("ADMIN");
export const requireAdminOrAnalyst = requireRole("ADMIN", "ANALYST");
export const requireAdminAnalystOrViewer = requireRole(
  "ADMIN",
  "ANALYST",
  "VIEWER",
);
