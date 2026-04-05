"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecordHandler = createRecordHandler;
exports.getRecordsHandler = getRecordsHandler;
exports.updateRecordHandler = updateRecordHandler;
exports.deleteRecordHandler = deleteRecordHandler;
const recordService_1 = require("../services/recordService");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createRecordHandler(req, res) {
    try {
        const record = await (0, recordService_1.createRecord)(req.user.userId, req.body);
        res.status(201).json(record);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function getRecordsHandler(req, res) {
    try {
        const records = await (0, recordService_1.getRecords)(req.user.userId, req.query);
        res.json(records);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function updateRecordHandler(req, res) {
    try {
        const { id } = req.params;
        const record = await (0, recordService_1.updateRecord)(id, req.body);
        res.json(record);
    }
    catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(400).json({ error: error.message });
    }
}
async function deleteRecordHandler(req, res) {
    try {
        const { id } = req.params;
        const record = await (0, recordService_1.deleteRecord)(id);
        res.json({ message: "Record soft deleted", record });
    }
    catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Record not found" });
        }
        res.status(500).json({ error: error.message });
    }
}
//# sourceMappingURL=records.js.map