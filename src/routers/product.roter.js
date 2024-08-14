import { Router } from "express";
import {
  getProductsByCategory,
  getProduct,
  createProduct,
  deleteProduct,
  updateProductById,
} from "../controller/product.controller.js";

export const productRouter = Router();
productRouter
  .get("/product", getProduct)
  .get("/product/:categoryId", getProductsByCategory)
  .post("/product/add", createProduct)
  .put("/product/update/:id", updateProductById)
  .delete("/product/delete/:productId", deleteProduct);
