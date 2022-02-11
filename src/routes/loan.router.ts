import express from "express";
import LoanController from "../controllers/loan.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new LoanController();
  const response = await controller.getLoans();

  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new LoanController();
  const response = await controller.createLoan(req.body);
  return res.send(response);
});

router.post("/bulk", async (req, res) => {
  const controller = new LoanController();
  const response = await controller.createLoanBulk(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new LoanController();
  const response = await controller.getLoan(req.params.id);
  if (!response) res.status(404).send({ message: "No loan found" });
  return res.send(response);
});

export default router;