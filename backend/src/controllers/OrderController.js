import { pool } from "../config/DbConfig.js";

// PLACE ORDER
export const placeOrder = async(req,res)=>{

    try{

        const userId = req.user.userId;

        // find cart
        const [cart] = await pool.query(

            "SELECT * FROM cart WHERE user_id=?",

            [userId]
        );

        // no cart
        if(cart.length === 0){

            return res.status(400).json({
                message : "Cart Empty"
            });
        }

        const cartId = cart[0].cart_id;

        // get cart items
        const [cartItems] = await pool.query(

            `
            SELECT
                ci.book_id,
                ci.quantity,
                b.price

            FROM cart_items ci

            JOIN books b
            ON ci.book_id=b.book_id

            WHERE ci.cart_id=?
            `,

            [cartId]
        );

        // empty cart
        if(cartItems.length === 0){

            return res.status(400).json({
                message : "No Items In Cart"
            });
        }

        // calculate total
        let total = 0;

        for(let item of cartItems){

            total += item.price * item.quantity;
        }

        // create order
        const [order] = await pool.query(

            `
            INSERT INTO orders(user_id,total_amount)

            VALUES(?,?)
            `,

            [userId,total]
        );

        const orderId = order.insertId;

        // insert order items
        for(let item of cartItems){

            await pool.query(

                `
                INSERT INTO order_items
                (order_id,book_id,quantity,price)

                VALUES(?,?,?,?)
                `,

                [
                    orderId,
                    item.book_id,
                    item.quantity,
                    item.price
                ]
            );
        }

        // clear cart after order
        await pool.query(

            "DELETE FROM cart_items WHERE cart_id=?",

            [cartId]
        );

        res.status(201).json({

            message : "Order Placed",

            orderId
        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message : "Error"
        });
    }
}
// GET USER ORDERS + PAYMENT STATUS
export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [rows] = await pool.query(`
            SELECT 
                o.order_id,
                o.total_amount,
                o.status AS order_status,
                o.created_at,
                p.payment_status,
                p.payment_method
            FROM orders o
            LEFT JOIN payments p ON o.order_id = p.order_id
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `, [userId]);

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
};
// CANCEL ORDER
// Used in MyOrders.jsx
export const cancelOrder = async(req,res)=>{

    try{

        // order id
        const id = req.params.id;

        // delete payment first
        await pool.query(
            "DELETE FROM payments WHERE order_id=?",
            [id]
        );

        // delete order
        await pool.query(
            "DELETE FROM orders WHERE order_id=?",
            [id]
        );

        res.status(200).json({
            message : "Order Cancelled"
        });

    }
    catch(error){

        res.status(500).json({
            message : "Cancel Failed"
        });
    }
}