import express from "express";
import { OrdersBooks, addOrders, cancelOrder, getOrderByID, getOrderItems, updateDelivery } from "../controller/order-controller.js";

const OrderRouter = express.Router();

OrderRouter.get("/get", getOrderItems);
OrderRouter.get("/getByID/:id", getOrderByID);
OrderRouter.post("/addOrder", addOrders);
OrderRouter.delete("/cancelByID/:id", cancelOrder);
OrderRouter.put("/updateDelivery", updateDelivery);
OrderRouter.get("/books/:id", OrdersBooks);

export default OrderRouter;