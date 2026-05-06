import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { verifyAdmin } from "../middleware/VerifyRole.js";
import { addBook, getBooks, deleteBook , updateBook, getBookById, searchBooks } from "../controllers/BookController.js";

const router = Router();

router.get("/", getBooks); // public

router.post("/", verifyToken, verifyAdmin, addBook);
router.delete("/:id", verifyToken, verifyAdmin, deleteBook);
router.put("/:id", verifyToken, verifyAdmin, updateBook);
// SEARCH BOOK
router.get("/search/all",searchBooks);
// GET SINGLE BOOK
router.get("/:id",getBookById);
// UPDATE BOOK
router.put(
    "/:id",
    verifyToken,
    verifyAdmin,
    updateBook
);

export default router;