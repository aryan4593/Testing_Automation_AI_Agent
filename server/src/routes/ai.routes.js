import express from "express";
import { generateTestCasesController, getTestCases } from "../controllers/ai.controller.js";

const router = express.Router();
router.post(
    "/generate-testcases/:projectId",
    generateTestCasesController
);
router.get("/get-test-cases/:projectId", getTestCases);
export default router;