import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../services/recordService";
import { PrismaClient } from "@prisma/client";
import { filterRecordsSchema } from "../utils/validation";

const prisma = new PrismaClient();

export async function createRecordHandler(req: AuthRequest, res: Response) {
  try {
    const record = await createRecord(req.user!.userId, req.body);
    res.status(201).json(record);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getRecordsHandler(req: AuthRequest, res: Response) {
  try {
    const records = await getRecords(req.user!.userId, req.query);
    res.json(records);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateRecordHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const record = await updateRecord(id, req.body);
    res.json(record);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(400).json({ error: error.message });
  }
}

export async function deleteRecordHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const record = await deleteRecord(id);
    res.json({ message: "Record soft deleted", record });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(500).json({ error: error.message });
  }
}
