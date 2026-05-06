import express from "express";

import authRouter from "./routers/AuthRouter.js";
import userRouter from "./routers/UserRouter.js";
import bookRouter from "./routers/BookRouter.js";
import cartRouter from "./routers/CartRouter.js";
import orderRouter from "./routers/OrderRouter.js";
import paymentRouter from "./routers/PaymentRouter.js";
import cors from 'cors';
import contactRouter from "./routers/ContactRouter.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);
// CONTACT ROUTE
app.use("/contact",contactRouter);

app.listen(9001, () => {
    console.log("Server running on port 9001");
});