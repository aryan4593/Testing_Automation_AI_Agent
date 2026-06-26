import express from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";

const router = express.Router();
router.post("/createProject", createProject);
router.get("/", getProjects);
export default router; 