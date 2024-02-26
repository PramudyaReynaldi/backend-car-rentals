import express from "express";
import { Login, Me, logOut, Register } from "../controllers/Auth.js";

const router = express.Router();

router.get("/api/v1/me", Me);
router.post("/api/v1/login", Login);
router.delete("/api/v1/logout", logOut);
router.post("/api/v1/register", Register);

export default router;