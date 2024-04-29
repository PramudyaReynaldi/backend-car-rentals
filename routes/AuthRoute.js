import express from "express";
import { Login, LoginAdmin, Me, logOut, Register, MeAdmin } from "../controllers/Auth.js";

const router = express.Router();

router.get("/api/v1/me", Me);
router.get("/api/v1/admin/me", MeAdmin);
router.post("/api/v1/login", Login);
router.post("/api/v1/login-admin", LoginAdmin);
router.delete("/api/v1/logout", logOut);
router.delete("/api/v1/logout-admin", logOut);
router.post("/api/v1/register", Register);

export default router;