import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    uploadIcon,
    getImage,
    getIcon,
} from "../controllers/Products.js";

const router = express.Router();

router.get("/api/v1/products", getProducts);
router.get("/api/v1/products/:id", getProductById);
router.post("/api/v1/products", createProduct);
router.patch("/api/v1/products/:id", updateProduct);
router.delete("/api/v1/products/:id", deleteProduct);

router.use("/api/v1/images", express.static("public/images"));
router.post("/api/v1/upload", uploadImage);
router.post("/api/v1/uploadIcon", uploadIcon);
router.get("/api/v1/images/:imageName", getImage);
router.get("/api/v1/icons/:iconName", getIcon);

export default router;
