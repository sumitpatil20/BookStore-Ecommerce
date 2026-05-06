import { Router } from "express";
import { signIn, register } from "../controllers/AuthController.js";

const router = Router();

router.post("/signin", signIn);     // login
router.post("/signup", register);   // user signup

export default router;