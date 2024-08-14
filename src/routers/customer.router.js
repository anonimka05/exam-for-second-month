import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
} from "../controller/customers.controller.js";

export const customerRouter = Router();
customerRouter
  .get("/customers", getCustomers)
  .get("/customers/:customerId", getCustomerById)
  .post("/customers/add", createCustomer)
  .put("/customers/:id", updateCustomerById)
  .delete("/customers/delete/:customerId", deleteCustomerById);
