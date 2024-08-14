import { Router } from "express";
import {
  getContracts,
  getContract,
  createContract,
  updateContractById,
  deleteContract,
} from "../controller/contract.controller.js";

export const contractRouter = Router()
contractRouter
  .get("/contract", getContracts)
  .get("/contract/:byId", getContract)
  .post("/contract/add", createContract)
  .put("/contract/:id", updateContractById)
  .delete("/contract/:id", deleteContract);update;