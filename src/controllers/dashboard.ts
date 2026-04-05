import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { getDashboardSummary, getTrends } from "../services/recordService";
import { dashboardTrendsSchema } from "../utils/validation";

export async function getSummaryHandler(req: AuthRequest, res: Response) {
  try {
    const summary = await getDashboardSummary(req.user!.userId);
    res.json(summary);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTrendsHandler(req: AuthRequest, res: Response) {
  try {
    const validated = dashboardTrendsSchema.parse(req.query);
    const trends = await getTrends(req.user!.userId, validated.period);
    res.json(trends);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// getRecentHandler not used - summary includes recent
