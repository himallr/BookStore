import mongoose from 'mongoose'
import moment from 'moment'
import User from '../models/user.js';
import Orders from '../models/orders.js';
import book from '../models/book.js';
import cart from '../models/cart.js';

export const getOrderItems = async (req, res, next) => {
    let orders;

    try {
        orders = await Orders.find().populate("books users");
    }
    catch (e) {
        console.log(e);
    }
    if (orders) {
        return res.status(200).json({ orders })
    }
    return res.status(500).json({ Message: "No orders found" })
}

export const getOrderByID = async (req, res, next) => {
    let order;
    const id = req.params.id
    try {
        order = await Orders.findById(id).populate("users books")
    }
    catch (e) {
        console.log(e);
    }
    if (order) {
        return res.status(200).json({ order })
    }
    return res.status(500).json({ Message: "No order found" })
}

export const addOrders = async (req, res, next) => {
    const { users, books, delivered } = req.body;
    // const id = req.params.id
    console.log(delivered);

    const deliveredAt = moment(delivered.deliveredAt);
    const sevenDaysLater = deliveredAt.add(7, 'days');
    const sevenDaysLaterDate = sevenDaysLater.toDate();

    let orders;

    let existuser = await User.findById(users)

    if (!existuser) {
        return res.status(500).json({ Message: "No user found!" })
    }

    let existbook = await book.findById(books)
    if (!existbook) {
        return res.status(500).json({ Message: "No Book found!" })
    }

    try {
        const cartEntry = await cart.findOne({ users: users, books: books });
        console.log(cartEntry);
        const quantity = cartEntry.quantity;
        orders = new Orders({
            users, books, quantity: quantity, delivered: { status: delivered.status, deliveredAt: sevenDaysLaterDate },
        })

        const session = await mongoose.startSession();
        session.startTransaction();
        existbook.Orders.push(orders);
        existuser.orders.push(orders);
        await existuser.save({ session });
        // await existcart.save({ session });
        await orders.save({ session });
        session.commitTransaction();

    }
    catch (e) {
        console.log(e);
    }

    if (orders) {
        return res.status(200).json({ orders })
    }
    return res.status(500).json({ Message: "Unexpected error" })
}

export const OrdersBooks = async (req, res, next) => {

    // let booksDetails;
    let books;
    const userId = req.params.id;

    try {
        books = await Orders.find({ users: userId }).populate('books').exec();
        console.log(books);
        // Extract books from orders
        // const booksFromOrders = books.flatMap(book => order.carts.books);
        // Fetch details of the books
        // booksDetails = await book.find({ _id: { $in: books } });
        // console.log(books);
    }
    catch (e) {
        console.log(e);
    }

    if (books) {
        return res.status(200).json({ books })
    }
    return res.status(500).json({ Message: "No orders found" })
}

export const cancelOrder = async (req, res, next) => {

    const id = req.params.id;
    let order;
    try {
        order = await Orders.findByIdAndRemove(id).populate("users");
        const session = await mongoose.startSession();
        session.startTransaction();
        await order.users.orders.pull(order);
        await order.users.save({ session });
        session.commitTransaction();
    }
    catch (err) {
        console.log(err);
    }
    if (order) {
        return res.status(200).json({ Message: "Successfully deleted" })
    }
    else {
        return res.status(500).json({ Message: "Could not find order" })
    }
}

export const updateDelivery = async (req, res, next) => {
    const { order, delivered } = req.body;

    console.log(delivered);

    let orders;

    try {
        orders = await Orders.findByIdAndUpdate(order, { delivered: { status: delivered.status, deliveredAt: delivered.deliveredAt } });
        orders = orders.save();
    }
    catch (e) {
        console.log(e);
    }

    if (orders) {
        return res.status(200).json({ orders })
    }
    return res.status(500).json({ Message: "Unexpected error" })
}