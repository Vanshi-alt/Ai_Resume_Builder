import express from "express";
import { generateResume } from "../controller/ai.controller.js";

const router = express.Router();

router.post("/generate", generateResume);

export default router;