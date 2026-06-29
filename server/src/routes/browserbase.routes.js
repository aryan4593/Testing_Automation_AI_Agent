import express from "express";

import {
  runTestCase,
} from "../controllers/browserbase.controller.js";

const router = express.Router();

router.post("/run/:testCaseId",runTestCase);
export default router;