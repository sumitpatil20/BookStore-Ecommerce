import { Router } from "express";

import { addToCart , viewCart , removeFromCart} from "../controllers/CartController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = Router();

// Add book to cart (User only)
router.post("/add", verifyToken, addToCart);
// URL → POST /cart/add
// View cart
router.get("/", verifyToken, viewCart);

// Remove item
router.delete("/:id", verifyToken, removeFromCart);
export default router;