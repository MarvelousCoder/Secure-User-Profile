import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/v1/auth/register
router.post("/register", register);
// POST /api/v1/auth/login
router.post("/login",login);

export default router;
