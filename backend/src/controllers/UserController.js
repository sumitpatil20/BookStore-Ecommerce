import { pool } from "../config/DbConfig.js";

// GET PROFILE
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [data] = await pool.query(
            "SELECT user_id, name, email FROM users WHERE user_id = ?",
            [userId]
        );

        res.status(200).json(data[0]);

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name } = req.body;

        await pool.query(
            "UPDATE users SET name = ? WHERE user_id = ?",
            [name, userId]
        );

        res.status(200).json({ message: "Profile Updated" });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

// export const getAllUsers = async (req, res) => {
//     try {
//         const [rows] = await pool.query(
//             "SELECT user_id, name, email FROM users WHERE role = 'user'"
//         );

//         res.status(200).json(rows);

//     } catch (error) {
//         res.status(500).json({ message: "Error" });
//     }
// };
// GET ALL USERS
// Used in Admin UserList.jsx
export const getAllUsers = async(req,res)=>{

    try{

        const [rows] = await pool.query(

            `
            SELECT
                u.user_id,
                u.name,
                u.email,

                COUNT(o.order_id) AS total_orders

            FROM users u

            LEFT JOIN orders o
            ON u.user_id=o.user_id

            WHERE u.role='user'

            GROUP BY u.user_id
            `
        );

        res.status(200).json(rows);

    }
    catch(error){

        res.status(500).json({
            message : "Error fetching users"
        });
    }
}