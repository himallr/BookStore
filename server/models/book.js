import mongoose, { mongo } from "mongoose";

const Book = mongoose.Schema(
    {
        BookNo: {
            type: Number,
            required: true
        },
        description: {
            type: String,
        },
        BookName: {
            type: String,
            required: true
        },
        BookType: {
            type: String,
            required: true
        },
        Author: {
            type: String,
            required: true
        },
        pages: {
            type: Number
        },
        yearPublished: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        Price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
        },
        Offer: {
            type: Boolean,
        },
        Discount: {
            type: Number,
        },
        ratings: [
            {
                star: Number,
                comment: String,
                postedby: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
            }
        ],
        totalRating: {
            type: String,
            default: 0,
        },
        Carts: [{
            type: mongoose.Types.ObjectId,
            ref: "Cart"
        }],
        admin: {
            type: mongoose.Types.ObjectId,
            ref: "Admin",
        },
        Orders: [{
            type: mongoose.Types.ObjectId,
            ref: "Order"
        }],
    }
)

export default mongoose.model("Book", Book);