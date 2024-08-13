import { Router } from "express";
import { getCustomers } from "../controller/customers.controller.js";

export const customerRouter = Router();
customerRouter.get("/customers", getCustomers);
