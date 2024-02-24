import express from "express";
import { Login, Me, logOut, Register } from "../controllers/Auth.js";
import { requireAuth } from "../middleware/RequireAuth.js";

const router = express.Router();

router.get("/api/v1/me", requireAuth, Me);
router.post("/api/v1/login", Login);
router.delete("/api/v1/logout", logOut);
router.post("/api/v1/register", Register);

export default router;