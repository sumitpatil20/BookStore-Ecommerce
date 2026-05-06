import { Router } from "express";

import { cancelOrder, getMyOrders } from "../controllers/OrderController.js";

import { placeOrder } from "../controllers/OrderController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = Router();

// Place order (User must be logged in)
router.post("/place", verifyToken, placeOrder);
// URL → POST /orders/place

router.get("/my-orders", verifyToken, getMyOrders);
// CANCEL ORDER
router.delete(
    "/:id",
    verifyToken,
    cancelOrder
);

export default router;