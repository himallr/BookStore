import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import BookRouter from "./routes/book-route.js";
import UserRouter from "./routes/user-route.js";
import AdminRouter from "./routes/admin-route.js";
import CartRouter from "./routes/cart-route.js";
import OrderRouter from "./routes/order-routes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(express.json());

app.use("/book", BookRouter);
app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);


mongoose.connect("mongodb+srv://himallr2003:7JQqQSTkyHbJhbGb@cluster0.1rylpjz.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        app.listen(3001, () => {
            console.log("Listen to port 3001");
        })
    })


//7JQqQSTkyHbJhbGb