import { Router } from "express";

import { sendMessage } from "../controllers/ContactController.js";

const router = Router();

// CONTACT MESSAGE
router.post("/",sendMessage);

export default router;