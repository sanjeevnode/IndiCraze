import express from "express";
import {
  addToCart,
  getCart,
  removeCart,
  removeCartItem,
} from "../controllers/cartController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.delete("/delete", verifyToken, removeCart);
router.delete("/delete/:itemID", verifyToken, removeCartItem);

export default router;
