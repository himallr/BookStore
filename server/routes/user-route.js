import express from "express";
import { AddBooktoFav, RemoveBookFromFav, Signup, deleteusers, getUser, getUserById, loginUser } from "../controller/user-controller.js";

const UserRouter = express.Router();

UserRouter.get("/get", getUser);
UserRouter.post("/signup", Signup);
UserRouter.post("/login", loginUser);
UserRouter.get("/getByID/:id", getUserById);
UserRouter.delete("/deleteByID/:id", deleteusers);
UserRouter.put("/addFav/:id", AddBooktoFav);
UserRouter.delete("/removeFav/:id", RemoveBookFromFav);

export default UserRouter;