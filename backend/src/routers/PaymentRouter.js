import { Router } from "express";

import { makePayment } from "../controllers/PaymentController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = Router();

// Make payment for an order
router.post("/pay", verifyToken, makePayment);
// URL → POST /payments/pay

export default router;