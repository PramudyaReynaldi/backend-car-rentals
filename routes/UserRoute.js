import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/v1/users", verifyUser, getUsers);
router.get("/api/v1/users/:id", verifyUser, getUserById);
router.post("/api/v1/users", verifyUser, createUser);
router.patch("/api/v1/users/:id", verifyUser, updateUser);
router.delete("/api/v1/users/:id", verifyUser, deleteUser);

export default router;