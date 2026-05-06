import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { verifyAdmin } from "../middleware/VerifyRole.js";
import { getAllUsers, getProfile, updateProfile } from "../controllers/UserController.js";

const router = Router();

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
// GET ALL USERS
router.get(
    "/all",
    verifyToken,
    verifyAdmin,
    getAllUsers
);
export default router;