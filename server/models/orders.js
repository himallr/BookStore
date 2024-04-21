import mongoose, { mongo } from "mongoose";

const Orders = mongoose.Schema(
    {
        users: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        books: [{
            type: mongoose.Types.ObjectId,
            ref: "Book",
            required: true,
        }],
        delivered: {
            status: {
                type: Boolean,
                required: true,
            },
            deliveredAt: {
                type: Date,
            },
        },
        quantity: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

export default mongoose.model("Order", Orders);