import express from "express";
import {
  getPayments,
  getPayment,
  createPayment,
  updatePaymentById,
  deletePayment,
} from "../controller/payments.controller.js";

export const paymentRouter = express.Router();
paymentRouter
  .get("/payments", getPayments)
  .get("/payments/:id", getPayment)
  .post("/payments/add", createPayment)
  .put("/payments/:id", updatePaymentById)
  .delete("/payments/:id", deletePayment);
