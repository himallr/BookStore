import express from "express";
import { Signup, dashboard, deleteadmin, getAdmin, getAdminById, getUsersCartitems, loginAdmin } from "../controller/admin-controller.js";

const AdminRouter = express.Router();

AdminRouter.get("/get",getAdmin);
AdminRouter.get("/getByID/:id",getAdminById);
AdminRouter.post("/signup",Signup);
AdminRouter.post("/login",loginAdmin);
AdminRouter.get("/getUser/:id",getUsersCartitems);
AdminRouter.delete("/deleteByID/:id",deleteadmin);
AdminRouter.get("/dashboard",dashboard);


export default AdminRouter;