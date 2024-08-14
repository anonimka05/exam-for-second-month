import { Router } from "express";
import {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";

export const categoryRouter = Router();
categoryRouter
  .get("/category", getCategory)
  .get("/category/:byId", getCategoryById)
  .post("/category/add", createCategory)
  .put("/category/update/:id", updateCategory)
  .delete("/category/:id", deleteCategory);
