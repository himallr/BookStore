import express from "express";
import { SearchBook, UpdateBooks, addBooks, deleteBooks, getBookById, getBookPagination, getBooks, getBooksByType, rating } from "../controller/book-controller.js";

const BookRouter = express.Router();

BookRouter.get("/get", getBooks);
BookRouter.get("/getType", getBooksByType);
BookRouter.get("/getByID/:id", getBookById);
BookRouter.get("/getbyPagination", getBookPagination);
BookRouter.get("/search", SearchBook);
BookRouter.post("/addBook", addBooks);
BookRouter.delete("/deleteByID/:id", deleteBooks);
BookRouter.put("/updateByID/:id", UpdateBooks);
BookRouter.put("/rating", rating);
// BookRouter.get("/getByID/:id/ratings", getRating);

export default BookRouter;