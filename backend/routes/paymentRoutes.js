import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { payment } from "../controllers/paymentConntroller.js";

const router = express.Router();

router.get("/", verifyToken, payment);

export default router;
