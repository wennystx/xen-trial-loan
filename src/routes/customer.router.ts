import express from "express";
import CustomerController from "../controllers/customer.controller";
// import { validate } from "../middlewares/customer.middleware"


const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CustomerController();
  const response = await controller.getCustomers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new CustomerController();
  const response = await controller.createCustomer(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new CustomerController();
  const response = await controller.getCustomer(req.params.id);
  
  // if(response) if(response.id == Number(req.params.id)) res.status(500).send({ message: "ID should not be same" });
  if (!response) res.status(404).send({ message: "No customer found" });
  return res.send(response);
});

// router.post("/upload", upload.single('file'), async (req, res) => {    
//   var b = req.file["buffer"]
//   console.log(b.toString())
//   res.send(b.toString())
// });

export default router;