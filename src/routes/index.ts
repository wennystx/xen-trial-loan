import express from "express";
// import PingController from "../controllers/ping.controller";
// import UserRouter from "./user.router";
// import PostRouter from "./post.router";
// import CommentRouter from "./comment.router";
import CustomerRouter from "./customer.router";
import LoanRouter from "./loan.router";
import TransactionRouter from "./transaction.router";

const router = express.Router();

// router.get("/ping", async (_req, res) => {
//   const controller = new PingController();
//   const response = await controller.getMessage();
//   return res.send(response);
// });

// router.use("/users", UserRouter);
// router.use("/posts", PostRouter);
// router.use("/comments", CommentRouter);
router.use("/customers", CustomerRouter);
router.use("/loans", LoanRouter);
router.use("/transactions", TransactionRouter);

export default router;