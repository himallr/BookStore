import mongoose, { mongo } from "mongoose";

const Cart = mongoose.Schema(
    {
        users: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        books: {
            type: mongoose.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        }
    }
)

export default mongoose.model("Cart", Cart);