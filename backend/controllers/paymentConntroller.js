import Cart from "../models/cartModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECERETE_KEY);

const payment = async (req, res) => {
  try {
    const { userID } = req.user;

    const cart = await Cart.findOne({ userID });

    if (cart) {
      const lineItems = cart.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://indicraze.netlify.app/",
        cancel_url: "https://indicraze.netlify.app/cart",
      });

      res.status(200).json({ id: session.id, url: session.url });
    } else {
      res.status(400).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { payment };
