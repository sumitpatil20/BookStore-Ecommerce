import { pool } from "../config/DbConfig.js";

// ADD TO CART
export const addToCart = async(req,res)=>{

    try{

        // logged in user id from token
        const userId = req.user.userId;

        // book id from frontend
        const { book_id } = req.body;

        // check whether cart already exists
        const [cartData] = await pool.query(

            "SELECT * FROM cart WHERE user_id=?",

            [userId]
        );

        let cartId;

        // if cart not exists create new cart
        if(cartData.length === 0){

            const [newCart] = await pool.query(

                "INSERT INTO cart(user_id) VALUES(?)",

                [userId]
            );

            // newly created cart id
            cartId = newCart.insertId;

        }
        else{

            // existing cart id
            cartId = cartData[0].cart_id;
        }

        // insert item into cart_items
        await pool.query(

            `
            INSERT INTO cart_items(cart_id,book_id)

            VALUES(?,?)
            `,

            [cartId,book_id]
        );

        res.status(201).json({
            message : "Added to Cart"
        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message : "Error"
        });
    }
}
// VIEW CART
export const viewCart = async(req,res)=>{

    try{

        const userId = req.user.userId;

        const [rows] = await pool.query(

            `
            SELECT
                ci.cart_item_id,
                b.title,
                b.author,
                b.price

            FROM cart_items ci

            JOIN books b
            ON ci.book_id=b.book_id

            WHERE ci.cart_id = (

                SELECT cart_id
                FROM cart
                WHERE user_id=?
            )
            `,

            [userId]
        );

        res.status(200).json(rows);

    }
    catch(error){

        console.log(error);

        res.status(500).json({
            message : "Error"
        });
    }
}


// REMOVE ITEM FROM CART
export const removeFromCart = async (req, res) => {
    try {
        const id = req.params.id;

        await pool.query(
            "DELETE FROM cart_items WHERE cart_item_id = ?",
            [id]
        );

        res.status(200).json({ message: "Item Removed" });

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};