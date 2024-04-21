import mongoose from 'mongoose'
import Cart from '../models/cart.js';
import User from '../models/user.js';
import Book from '../models/book.js';

export const getCartItems = async (req, res, next) => {
    let carts;

    try {
        carts = await Cart.find().populate("books users");
    }
    catch (e) {
        console.log(e);
    }
    if (carts) {
        return res.status(200).json({ carts })
    }
    return res.status(500).json({ Message: "No cart item found" })
}

export const getCartByID = async (req, res, next) => {
    let carts;
    const id = req.params.id
    try {
        carts = await Cart.findById(id).populate("books");
    }
    catch (e) {
        console.log(e);
    }
    if (carts) {
        return res.status(200).json({ carts })
    }
    return res.status(500).json({ Message: "No cart item found" })
}

export const fetchCartItems = async (req, res, next) => {

    let books = [];
    const { carts } = req.body;
    try {
        for (const cartId of carts) {
            const cart = await Cart.findById(cartId).populate('books');

            if (cart) {
                books.push(cart.books);
            } else {
                console.log(`Cart with ID ${cartId} not found`);
            }
        }
    }
    catch (e) {
        console.log(e);
    }
    if (carts) {
        return res.status(200).json({ books })
    }
    return res.status(500).json({ Message: "No cart item found" })
}

export const addCart = async (req, res, next) => {
    const { users, books, quantity } = req.body;
    const id = req.params.id
    let carts;

    let existuser = await User.findById(users).populate("Carts")

    if (!existuser) {
        return res.status(500).json({ Message: "No user" })
    }

    let existbook = await Book.findById(books)
    if (!existbook) {
        return res.status(500).json({ Message: "No book" })
    }

    const existingCart = await Cart.findOne({ users, books });
    console.log(existingCart);
    if (existingCart) {
        return res.status(200).json({ Message: "Already exists" });
    }

    try {
        carts = new Cart({ users, books, quantity })

        const session = await mongoose.startSession();
        session.startTransaction();
        existbook.Carts.push(carts);
        existuser.Carts.push(carts);
        await existuser.save({ session });
        await existbook.save({ session });
        await carts.save({ session });
        session.commitTransaction();

    }
    catch (e) {
        console.log(e);
    }

    if (carts) {
        return res.status(200).json(books)
    }
    return res.status(500).json({ Message: "Unexpected error" })
}

export const deletecarts = async (req, res, next) => {

    const id = req.params.id;
    let carts;
    try {
        carts = await Cart.findByIdAndRemove(id).populate("users books");
        console.log(carts);
        const session = await mongoose.startSession();
        session.startTransaction();
        await carts.users.Carts.pull(carts);
        await carts.books.Carts.pull(carts);
        await carts.users.save({ session });
        await carts.books.save({ session });
        session.commitTransaction();
    }
    catch (err) {
        console.log(err);
    }
    if (carts) {
        return res.status(200).json({ Message: "Successfully deleted" })
    }
    else {
        return res.status(500).json({ Message: "Could not find book" })
    }
}

export const updatequant = async (req, res, next) => {

    const { quantity } = req.body;
    const id = req.params.id;
    let books;
    try {
        books = await Cart.findByIdAndUpdate(id, { quantity: quantity });
    }
    catch (err) {
        console.log(err);
    }
    if (books) {
        return res.status(200).json({ Message: "Successfully updated" })
    }
    else {
        return res.status(500).json({ Message: "Could not find book" })
    }
}