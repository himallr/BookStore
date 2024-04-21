import admin from "../models/admin.js";
import mongoose from 'mongoose';
import book from "../models/book.js";
import jwt from "jsonwebtoken";

export const getBooks = async (req, res, next) => {

    let books;
    try {
        books = await book.find();
    }
    catch (err) {
        console.log(err);
    }
    if (books) {
        return res.status(200).json({ books })
    }
    else {
        return res.status(500).json({ Message: "Unable to find" })
    }
}

export const getBooksByType = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 0;
        const search = req.query.search || ""
        let sort = req.query.sort || "sort"
        let genre = req.query.genre || "All"
        let offer = req.query.Offer || false

        const genreOpts = [
            "Fiction",
            "scific",
            "Fantasy",
            "Mystery",
            "Biography",
            "Horror",
        ];
        genre === "All" ? (genre = [...genreOpts]) : (genre = req.query.genre.split(","));
        req.query.rating ? (sort = req.query.sort.split(",")) : (sort = [sort])
        let sortby = {};
        if (sort[1]) {
            sortby[sort[0]] = sort[1];
        }
        else {
            sortby[sort[0]] = "asc";
        }

        const books = await book.find({ BookName: { $regex: search, $options: "i" } })
            .where("BookType")
            .in([...genre])
            .sort(sortby)
        const offers = await book.find({ Offer: true })
        const total = await book.countDocuments({
            genre: { $in: [...genre] },
            name: { $regex: search, $options: "i" }
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            offers,
            genres: genreOpts,
            books,
        };

        return res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
}

export const getBookById = async (req, res, next) => {

    const id = req.params.id;
    let books;
    try {
        books = await book.findById(id).populate("Carts admin ratings.postedby", "Name");
    }
    catch (err) {
        console.log(err);
    }
    if (books) {
        return res.status(200).json(books)
    }
    else {
        return res.status(500).json({ Message: "Unable to find" })
    }
}

export const getBookPagination = async (req, res, next) => {
    const page = req.query.p || 1;
    const bookperpage = 6;
    let books = [];
    let bookser;
    try {
        bookser = await book.find().sort({ BookName: 1 }).skip((page - 1) * bookperpage).limit(bookperpage);
        bookser.forEach(book => {
            books.push(book);
        });
        console.log(bookser);
    }
    catch (e) {
        console.log(e);
    }
    if (books) {
        return res.status(200).json(books);
    }
    return res.status(500).json({ Message: "NO books found" })
}

export const addBooks = async (req, res, next) => {

    const extractedToken = req.headers.authorization.split(" ")[1]; //Bearer token
    if (!extractedToken) {
        return res.status(404).json({ message: "Token Not found" });
    }

    let adminId;

    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        }
        else {
            adminId = decrypted.id;
            return;
        }
    });

    const { BookNo, description, BookName, BookType, Author, pages, Price, yearPublished, rating, image, Offer, Discount } = req.body;
    let books;
    try {
        books = new book({ BookNo, description, BookName, BookType, Author, pages, Price, yearPublished, rating, image, Offer, Discount, admin: adminId });
        const session = await mongoose.startSession();
        const adminUser = await admin.findById(adminId);
        session.startTransaction();
        console.log(adminUser);

        await books.save({ session });
        adminUser.addedbooks.push(books);
        await adminUser.save({ session });
        await session.commitTransaction();
    }
    catch (err) {
        console.log(err);
    }
    if (books) {
        return res.status(200).json({ books })
    }
    else {
        return res.Status(500).json({ Message: "Couldn't add book" })
    }
}

export const deleteBooks = async (req, res, next) => {

    const id = req.params.id;
    let books;
    try {
        books = await book.findByIdAndRemove(id).populate("admin");
        const session = await mongoose.startSession();
        session.startTransaction();
        await books.admin.addedbooks.pull(books);
        await books.admin.save({ session });
        session.commitTransaction();
    }
    catch (err) {
        console.log(err);
    }
    if (books) {
        return res.status(200).json({ Message: "Successfully deleted" })
    }
    else {
        return res.status(500).json({ Message: "Could not find book" })
    }
}

export const UpdateBooks = async (req, res, next) => {

    const { BookNo, BookName, description, BookType, Author, Price } = req.body;
    const id = req.params.id;
    let books;
    try {
        books = await book.findByIdAndUpdate(id, { BookNo, BookName, description, BookType, Author, Price });
        books = books.save();
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

export const rating = async (req, res, next) => {
    const { user, star, prodID, comment } = req.body;
    try {
        const product = await book.findById(prodID);

        let existRating = product.ratings.find((userID) => userID.postedby.toString() === user.toString());

        if (!existRating) {
            const rateProd = await book.findByIdAndUpdate(prodID, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: user,
                    },
                },
            },
                {
                    new: true,
                })
            // console.log(rateProd);
            // res.json(rateProd);
        }
        else {
            const updateRating = await book.updateOne(
                {
                    ratings: { $elemMatch: existRating },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                },
                {
                    new: true,
                }
            );
            // console.log(updateRating);
            // res.json(updateRating);
        }
        const getallRatings = await book.findById(prodID);
        let totalRating = getallRatings.ratings.length;
        let ratingsum = getallRatings.ratings.map((item) =>
            item.star
        ).reduce((prev, curr) =>
            prev + curr, 0
        );

        let actualRating = Math.round(ratingsum / totalRating);
        let finalProd = await book.findByIdAndUpdate(prodID,
            {
                totalRating: actualRating,
            },
            {
                new: true,
            });
        res.json(finalProd);

    } catch (e) {
        console.log("Unexpected errors");
    }
}

export const SearchBook = async (req, res, next) => {
    try {
        const { bookType, offer, rating, maxPrice, minPrice, minYearPublished, maxYearPublished } = req.query;

        // Build the query object based on provided parameters
        const query = {};
        if (bookType) {
            query.BookType = bookType;
        }
        if (offer !== undefined) query.Offer = offer;
        if (rating) query.totalRating = rating;
        if (minPrice && maxPrice) query.Price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
        if (minYearPublished && maxYearPublished) query.yearPublished = { $gte: parseInt(minYearPublished), $lte: parseInt(maxYearPublished) };

        console.log(query);

        // Execute the query
        const filteredBooks = await book.find(query);

        res.status(200).json(filteredBooks);
    } catch (error) {
        console.error('Error filtering books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}