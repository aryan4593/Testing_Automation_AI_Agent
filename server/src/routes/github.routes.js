import express from "express";
import {
    githubLogin,
    githubCallback,
} from "../controllers/github.controller.js";

const router = express.Router();

router.get("/login", githubLogin);
router.get("/callback", githubCallback);

export default router;