import { Router } from "express";
import {
  createRecordHandler,
  getRecordsHandler,
  updateRecordHandler,
  deleteRecordHandler,
} from "../controllers/records";
import { requireAdminOrAnalyst } from "../middleware/auth";

const router = Router();

router.post("/", requireAdminOrAnalyst, createRecordHandler);
router.get("/", getRecordsHandler);
router.patch("/:id", requireAdminOrAnalyst, updateRecordHandler);
router.delete("/:id", requireAdminOrAnalyst, deleteRecordHandler);

export default router;
