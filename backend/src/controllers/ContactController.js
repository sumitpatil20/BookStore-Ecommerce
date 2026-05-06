import { pool } from "../config/DbConfig.js";

// CONTACT FORM
export const sendMessage = async(req,res)=>{

    try{

        const {
            email,
            subject,
            message
        } = req.body;

        // insert message
        await pool.query(

            `
            INSERT INTO contact_messages
            (email,subject,message)

            VALUES(?,?,?)
            `,

            [email,subject,message]
        );

        res.status(201).json({
            message : "Message Sent"
        });

    }
    catch(error){

        res.status(500).json({
            message : "Failed"
        });
    }
}