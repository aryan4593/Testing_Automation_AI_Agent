import {
  updateTestCaseController,
} from "../controllers/testcase.controller.js";

import express from "express";

const router = express.Router();
router.put("/:testCaseId",updateTestCaseController);
export default router; 
