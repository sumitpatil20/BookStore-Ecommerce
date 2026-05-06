import { pool } from "../config/DbConfig.js";

// ADD BOOK
export const addBook = async (req, res) => {
    try {
        const { title, author, price } = req.body;

        await pool.query(
            "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
            [title, author, price]
        );

        res.status(201).json({ message: "Book Added" });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

// GET ALL BOOKS (Home Page)
export const getBooks = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM books");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

// DELETE BOOK
export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;

        await pool.query("DELETE FROM books WHERE book_id = ?", [id]);

        res.status(200).json({ message: "Deleted" });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};
// // Update Book 
// export const updateBook = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { title, author, price } = req.body;

//         await pool.query(
//             "UPDATE books SET title=?, author=?, price=? WHERE book_id=?",
//             [title, author, price, id]
//         );

//         res.status(200).json({ message: "Updated" });

//     } catch (error) {
//         res.status(500).json({ message: "Error" });
//     }
// };

// GET BOOK BY ID
// Used in UpdateBook.jsx page
export const getBookById = async(req,res)=>{

    try{

        // read id from URL
        const id = req.params.id;

        // fetch single book
        const [rows] = await pool.query(
            "SELECT * FROM books WHERE book_id=?",
            [id]
        );

        // if no book found
        if(rows.length === 0){

            return res.status(404).json({
                message : "Book Not Found"
            });
        }

        // return single book
        res.status(200).json(rows[0]);

    }
    catch(error){

        res.status(500).json({
            message : "Error fetching book"
        });
    }
}
// UPDATE BOOK
// Used in UpdateBook.jsx
// Admin updates existing book
export const updateBook = async(req,res)=>{

    try{

        // read id
        const id = req.params.id;

        // read updated data
        const {
            title,
            author,
            price
        } = req.body;

        // update query
        await pool.query(

            `UPDATE books
             SET title=?,
                 author=?,
                 price=?
             WHERE book_id=?`,

            [title,author,price,id]
        );

        res.status(200).json({
            message : "Book Updated"
        });

    }
    catch(error){

        res.status(500).json({
            message : "Update Failed"
        });
    }
}
// SEARCH BOOK
// Used in UserHome.jsx
export const searchBooks = async(req,res)=>{

    try{

        // query parameters
        const {
            title,
            author
        } = req.query;

        let query =
        `
            SELECT * FROM books
            WHERE title LIKE ?
        `;

        let values = [`%${title}%`];

        // optional author filter
        if(author){

            query += ` AND author LIKE ?`;

            values.push(`%${author}%`);
        }

        const [rows] = await pool.query(
            query,
            values
        );

        res.status(200).json(rows);

    }
    catch(error){

        res.status(500).json({
            message : "Search Failed"
        });
    }
}