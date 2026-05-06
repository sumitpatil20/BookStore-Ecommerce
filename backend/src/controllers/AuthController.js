import { pool } from "../config/DbConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// LOGIN (Both Admin & User)
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check user exists
        const [result] = await pool.query(
            "SELECT * FROM users WHERE email = ?", [email]
        );

        if (result.length === 0) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const user = result[0];

        // compare password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Wrong Password" });
        }

        // create token with role
        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            "secret123"
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


// REGISTER (Only User)
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const encryptedPassword = bcrypt.hashSync(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')",
            [name, email, encryptedPassword]
        );

        res.status(201).json({ insertedId: result.insertId });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};