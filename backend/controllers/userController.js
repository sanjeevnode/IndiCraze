import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register user
// /api/user/register
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        email,
        name,
        hashPassword,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
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
    //
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(200).json({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
        address: user.address,
        orderHistory: user.orderHistory,
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password " });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
};

// Get user information
// /api/user/profile
const getUser = async (req, res) => {
  try {
    const { userID } = req.user;

    const user = await User.findById(userID);
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
        address: user.address,
        orderHistory: user.orderHistory,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid Data", error: err.message });
  }
};

// Update user details
// /api/user/details
const updateUserDetails = async (req, res) => {
  try {
    const { userID } = req.user;
    const { name, email, mobile, address, password, state, city, pincode } =
      req.body;
    const user = await User.findById(userID);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.mobile = mobile || user.mobile;
      user.address = address || user.address;
      user.city = city || user.city;
      user.state = state || user.state;
      user.pincode = pincode || user.pincode;

      if (password) {
        user.password = password || user.password;
      }

      await user.save();

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
        address: user.address,
        orderHistory: user.orderHistory,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid Data", error: error.message });
  }
};

// clear order history
// api/user/clear-order-history
const clearOrderHistory = async (req, res) => {
  try {
    const { userID } = req.user;

    const user = await User.findById(userID);

    if (user) {
      user.orderHistory = [];
      await user.save();
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
        address: user.address,
        orderHistory: user.orderHistory,
      });
    } else {
      res.status(404).json({ message: "User not found}" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid Data", error: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUser,
  updateUserDetails,
  clearOrderHistory,
};
