import { Router } from "express";
import {
  getContractTypes,
  getContractType,
  createContractType,
  updateContractTypeById,
  deleteContractType,
} from "../controller/contractType.controller.js";

export const contractTypeRouter = Router();
contractTypeRouter
  .get("/contractType", getContractTypes)
  .get("/contractType/:byId", getContractType)
  .post("/contractType/add", createContractType)
  .put("/contractType/:id", updateContractTypeById)
  .delete("/contractType/:id", deleteContractType);
