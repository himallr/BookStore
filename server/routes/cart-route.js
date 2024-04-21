import express from "express";
import { addCart, deletecarts, fetchCartItems, getCartByID, getCartItems, updatequant } from "../controller/cart-controller.js";

const CartRouter = express.Router();

CartRouter.get("/get", getCartItems);
CartRouter.get("/getByID/:id", getCartByID);
CartRouter.post("/addCart", addCart);
CartRouter.delete("/deleteByID/:id", deletecarts);
CartRouter.put("/updateByID/:id", updatequant);
CartRouter.post("/fetchCart", fetchCartItems);

export default CartRouter;