import mongoose from "mongoose";

const Admin = mongoose.Schema(
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
        addedbooks: [{
            type: mongoose.Types.ObjectId,
            ref: "Book",
        }]
    }
)

export default mongoose.model("Admin", Admin);