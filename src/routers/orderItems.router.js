import { Router } from "express";
import {
  getOrderItems,
  getOrderItem,
  createOrderItem,
  updateOrderItemById,
  deleteOrderItem,
} from "../controller/order_items.controller.js";

export const orderItems = Router();
orderItems
  .get("/order_items", getOrderItems)
  .get("/order_items/:byId", getOrderItem)
  .post("/order_items/add", createOrderItem)
  .put("/order_items/:id", updateOrderItemById)
  .delete("/order_items/:id", deleteOrderItem);
