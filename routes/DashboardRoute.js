import express from "express";
import { getUsers } from "../controllers/Users.js";
import { getProducts } from "../controllers/Products.js";

const router = express.Router();

// router.get("/", getUsers);
router.get("/", getProducts);

export default router;