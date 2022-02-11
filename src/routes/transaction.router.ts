import express from "express";
import TransactionController from "../controllers/transaction.controller";
import { idempotency } from "../middlewares/idempotency.middleware";

const router = express.Router();                                                                                        

router.get("/", async (_req, res) => {
  const controller = new TransactionController();
  const response = await controller.getTransactions();
  return res.send(response);
});

router.post("/", idempotency, async (req, res) => {
  const controller = new TransactionController();
  const response = await controller.createTransaction(req.body);
  if(response.error) return res.status(response.error.status).send({ message: response.error.message});
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new TransactionController();
  const response = await controller.getTransaction(req.params.id);
  if (!response) res.status(404).send({ message: "No transaction found" });
  return res.send(response);
});

export default router;