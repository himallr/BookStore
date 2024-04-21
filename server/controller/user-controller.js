import user from "../models/user.js";
import bcryptjs from "bcryptjs";

export const getUser = async (req, res, next) => {

    let users;
    try {
        users = await user.find();
    }
    catch (err) {
        console.log(err);
    }
    if (users) {
        return res.status(200).json({ users })
    }
    else {
        return res.status(500).json({ Message: "Unable to find users" })
    }
}

export const getUserById = async (req, res, next) => {

    const id = req.params.id;
    let users;
    try {
        users = await user.findById(id).populate("Carts Favourites");
    }
    catch (err) {
        console.log(err);
    }
    if (users) {
        return res.status(200).json(users)
    }
    else {
        return res.status(500).json({ Message: "Unable to find the user" })
    }
}

export const Signup = (req, res, next) => {

    const { Name, Email, Password } = req.body;
    const hashedPAssword = bcryptjs.hashSync(Password);
    let users;
    try {
        users = new user({ Name, Email, Password: hashedPAssword });
        users = users.save();
    }
    catch (err) {
        console.log(err);
    }
    if (users) {
        return res.status(200).json({ users })
    }
    else {
        return res.status(500).json({ Message: "Couldn't add user" })
    }
}

export const loginUser = async (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email && !Password) {
        return res.status(422).json({ message: "Invalid data" });
    }
    const new_pass = bcryptjs.hashSync(Password);
    let users;
    try {
        users = await user.findOne({ Email });
    }
    catch (e) {
        console.log("User not found");
    }
    if (!users) {
        return res.json({ message: "Unable to find user" });
    }

    const isPasswordCorrect = bcryptjs.compareSync(Password, users.Password);
    if (isPasswordCorrect)
        return res.status(200).json({ message: "Successfull", id: users._id });
    return res.json({ message: "Wrong Pasword!" });

}

export const deleteusers = async (req, res, next) => {

    const id = req.params.id;
    let users;
    try {
        users = await user.findByIdAndRemove(id);
    }
    catch (err) {
        console.log(err);
    }
    if (users) {
        return res.status(200).json({ Message: "Successfully deleted" })
    }
    else {
        return res.status(500).json({ Message: "Could not find user" })
    }
}

export const AddBooktoFav = async (req, res, next) => {

    const userId = req.params.id;
    const { bookId } = req.body;

    let users;
    try {
        const users = await user.findById(userId);

        if (!users) {
            console.log('User not found');
            return;
        }

        if (!users.Favourites.some(fav => fav.equals(bookId))) {
            // If not, add the book to the favorites array
            users.Favourites.push(bookId);
            await users.save();
            return res.status(200).json({ Message: "Successfully added To Fav" })
        } else {
            return res.json({ Message: "Book is already in favorites" })
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const RemoveBookFromFav = async (req, res, next) => {
    const userId = req.params.id;
    const { bookId } = req.body;

    console.log(bookId);

    try {
        const users = await user.findById(userId);

        if (!users) {
            console.log('User not found');
            return res.status(404).json({ Message: "User not found" });
        }

        // Check if the book is in favorites
        const bookIndex = users.Favourites.findIndex(fav => fav.equals(bookId));

        if (bookIndex !== -1) {
            // If found, remove the book from the favorites array
            users.Favourites.splice(bookIndex, 1);
            await users.save();
            return res.status(200).json({ Message: "Successfully removed from Fav" });
        } else {
            return res.status(400).json({ Message: "Book not found in favorites" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Message: "Internal Server Error" });
    }
};