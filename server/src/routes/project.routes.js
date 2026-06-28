import express from "express";
import { createProject, getProjects,updateProjectSettings } from "../controllers/project.controller.js";

const router = express.Router();
router.post("/createProject", createProject);
router.get("/", getProjects);
router.put("/:projectId/settings",updateProjectSettings);
export default router; 