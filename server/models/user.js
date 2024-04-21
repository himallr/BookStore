import mongoose from "mongoose";

const User = mongoose.Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
        Carts: [{
            type: mongoose.Types.ObjectId,
            ref: "Cart"
        }],
        orders: [{
            type: mongoose.Types.ObjectId,
            ref: "Order"
        }],
        Favourites: [{
            type: mongoose.Types.ObjectId,
            ref: "Book"
        }],
    }
)

export default mongoose.model("User", User);