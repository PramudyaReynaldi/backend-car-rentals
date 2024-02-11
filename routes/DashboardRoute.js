import express from "express";
import { getProducts } from "../controllers/Products.js";
import { LoginAdmin } from "../controllers/Auth.js";
import { requireAuth } from "../middleware/RequireAuth.js"

const router = express.Router();

router.post("/", LoginAdmin);
router.get("/", (req, res) => res.render("auth.ejs"));
router.get("/dashboard", requireAuth, getProducts);

export default router;