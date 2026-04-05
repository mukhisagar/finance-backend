"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const records_1 = require("../controllers/records");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.requireAdminOrAnalyst, records_1.createRecordHandler);
router.get("/", records_1.getRecordsHandler);
router.patch("/:id", auth_1.requireAdminOrAnalyst, records_1.updateRecordHandler);
router.delete("/:id", auth_1.requireAdminOrAnalyst, records_1.deleteRecordHandler);
exports.default = router;
//# sourceMappingURL=records.js.map