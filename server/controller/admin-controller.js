import Admin from "../models/admin.js";
import User from "../models/user.js";
import Book from "../models/book.js";
import Order from "../models/orders.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const getAdmin = async (req, res, next) => {

    let admins;
    try {
        admins = await Admin.find();
    }
    catch (err) {
        console.log(err);
    }
    if (admins) {
        return res.status(200).json({ admins })
    }
    else {
        return res.status(500).json({ Message: "Unable to find admins" })
    }
}

export const getAdminById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const admin = await Admin.findById(id).populate("addedbooks");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json(admin);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const Signup = (req, res, next) => {

    const { Name, Email, Password } = req.body;
    const hashedPAssword = bcryptjs.hashSync(Password);
    let admins;
    try {
        admins = new Admin({ Name, Email, Password: hashedPAssword });
        admins = admins.save();
    }
    catch (err) {
        console.log(err);
    }
    if (admins) {
        return res.status(200).json({ admins })
    }
    else {
        return res.status(500).json({ Message: "Couldn't add admin" })
    }
}

export const loginAdmin = async (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email && !Password) {
        return res.status(422).json({ message: "Invalid data" });
    }
    const new_pass = bcryptjs.hashSync(Password);
    let existadmin;
    try {
        existadmin = await Admin.findOne({ Email });
    }
    catch (e) {
        console.log("Admin not found");
    }

    if (existadmin) {

        const isPasswordCorrect = bcryptjs.compareSync(Password, existadmin.Password);

        if (isPasswordCorrect) {

            //jwt.sign(payload, secretOrPrivateKey, [options, callback])
            const token = jwt.sign({ id: existadmin._id }, process.env.SECRET_KEY, {
                expiresIn: "7d",
            })

            //console.log(token);

            return res.status(200).json({ message: "Admin exists", token, id: existadmin._id });
        }
        return res.json({ message: "Wrong Pasword!" })
    }
    return res.json({ message: "No Admin Found!" })
}

export const deleteadmin = async (req, res, next) => {

    const id = req.params.id;
    let admins;
    try {
        admins = await Admin.findByIdAndRemove(id);
    }
    catch (err) {
        console.log(err);
    }
    if (admins) {
        return res.status(200).json({ Message: "Successfully deleted" })
    }
    else {
        return res.status(500).json({ Message: "Could not find admin" })
    }
}

export const getUsersCartitems = async (req, res, next) => {

    const id = req.params.id;
    let users;
    let cart = [];
    try {
        users = await User.findById(id).populate("Carts");
        let carts = users.Carts;
        carts.forEach(element => {
            cart.push(element._id)
        });
    }
    catch (err) {
        console.log(err);
    }
    if (users) {
        return res.status(200).json(cart)
    }
    else {
        return res.status(500).json({ Message: "Unable to find the user" })
    }
}

export const dashboard = async (req, res, next) => {

    try {
        // Number of Customers who have Purchased
        const uniqueUsers = await Order.distinct('users');

        // console.log(uniqueUsers);

        // Total Sales
        const totalSalesResult = await Order.aggregate([
            {
                $lookup: {
                    from: 'books', // Assuming your Book model is named 'books'
                    localField: 'books',
                    foreignField: '_id',
                    as: 'bookDetails',
                },
            },
            {
                $unwind: '$bookDetails',
            },
            {
                $lookup: {
                    from: 'users', // Assuming your User model is named 'users'
                    localField: 'users',
                    foreignField: '_id',
                    as: 'userData',
                },
            },
            {
                $unwind: '$userData',
            },
            {
                $group: {
                    _id: '$users',
                    userName: { $first: '$userData.Name' }, // Extract user name
                    userDetails: { $first: '$userData' },
                    totalSales: {
                        $sum: { $multiply: [{ $toDouble: '$quantity' }, { $toDouble: '$bookDetails.Price' }] }
                    },
                    totalSalesAfterDiscount: {
                        $sum: {
                            $cond: {
                                if: { $gt: ['$bookDetails.Discount', 0] }, // Check if the discount is greater than 0
                                then: { $multiply: [{ $toDouble: '$quantity' }, { $subtract: [1, { $divide: ['$bookDetails.Discount', 100] }] }, '$bookDetails.Price'] }, // Calculate discounted price
                                else: { $multiply: [{ $toDouble: '$quantity' }, '$bookDetails.Price'] }, // Calculate regular price
                            },
                        },
                    },
                    totalBooksQuantity: { $sum: 1 }, // New field to count the length of books in the order array
                    totalQuantity: { $sum: '$quantity' }, // Calculate total number of quantities
                    booksInOrder: {
                        $push: {
                            bookDetails: '$bookDetails',
                            orderId: '$_id', // Assuming '_id' represents the orderId
                            delivered: '$delivered'
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    userName: 1,
                    userDetails: 1,
                    totalSales: 1,
                    totalSalesAfterDiscount: 1,
                    totalBooksQuantity: 1,
                    totalQuantity: 1,
                    booksInOrder: 1,
                },
            },
        ]);
        console.log(totalSalesResult);
        const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

        // Total Profit (Assuming profit is stored in the Book model)
        // const totalProfitResult = await Book.aggregate([
        //     {
        //         $group: {
        //             _id: null,
        //             totalProfit: { $sum: '$Profit' },
        //         },
        //     },
        // ]);
        // const totalProfit = totalProfitResult.length > 0 ? totalProfitResult[0].totalProfit : 0;

        // Reviews Provided by Customers
        const reviews = await Book.find({ ratings: { $exists: true, $not: { $size: 0 } } }, 'BookName ratings totalRating').populate('ratings.postedby');;

        res.status(200).json({
            uniqueUsers: uniqueUsers.length,
            totalSalesResult,
            // totalProfit,
            reviews,
        });
    }
    catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}