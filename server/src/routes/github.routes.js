import express from "express";
import {
    githubLogin,
    githubCallback,
    getGithubRepo,
} from "../controllers/github.controller.js";

const router = express.Router();

router.get("/login", githubLogin);
router.get("/callback", githubCallback);
router.get("/repos", getGithubRepo);

export default router;