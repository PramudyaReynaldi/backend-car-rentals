import express from "express";
import { getProducts, deleteProduct, updateProduct } from "../controllers/Products.js";
import { LoginAdmin } from "../controllers/Auth.js";
import { requireAuth } from "../middleware/RequireAuth.js"

const router = express.Router();

// ---- Views ----
router.get("/", (req, res) => res.render("auth.ejs"));

// ---- Data ----
router.post("/", LoginAdmin);
router.get("/dashboard", requireAuth, getProducts);
router.delete("/dashboard/delete/:id", deleteProduct);
router.patch("/dashboard/update/:id", updateProduct);

export default router;