import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Register user
// /api/user/register
const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            const user = await User.create({
                email,
                name,
                password
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        }

    } catch (err) {
        res.status(400).json({ message: "Invalid Data", error: err.message });
    }
};


// Login
// /api/user/login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ userID: user._id, }, process.env.JWT_SECRET, { expiresIn: '30d' });

            res.status(200).json({
                token,
                _id: user._id,
                name: user.name,
                email: user.email
            });
        }
        else {
            res.status(401).json({ message: 'Invalid Email or Password ' })
        }

    } catch (err) {
        res.status(400).json({ message: "Invalid Data", error: err.message });
    }
};

// Get user information
// /api/user/profile
const getUser = async(req, res) => {
    try {
        const {userID} = req.user;

        const user = await User.findById(userID);
        if(user){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(400).json({ message: "Invalid Data", error: err.message });
    }
};

export {
    registerUser,
    loginUser,
    getUser,
}