import { pool } from "../config/DbConfig.js";

// SIMPLE PAYMENT (hardcoded simulation)
export const makePayment = async (req, res) => {
    try {
        const { order_id } = req.body;

        await pool.query(
            "INSERT INTO payments (order_id, payment_method, payment_status) VALUES (?, 'COD', 'completed')",
            [order_id]
        );

        res.status(200).json({ message: "Payment Successful" });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};