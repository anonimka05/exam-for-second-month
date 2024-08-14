import { Router } from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrderById,
  deleteOrder,
} from "../controller/order.controlller.js";

export const orderRouter = Router();
orderRouter
  .get("/order", getOrders)
  .get("/order/:byId", getOrder)
  .post("/order/add", createOrder)
  .put("/order/update/:id", updateOrderById)
  .delete("/order/:id", deleteOrder);
