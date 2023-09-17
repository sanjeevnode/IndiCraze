import Cart from "../models/cartModel.js";

// Add item to cart
// /api/cart/add
const addToCart = async (req, res) => {
  try {
    const { item } = req.body;
    if (!item) {
      throw new Error("Invalid data");
    }
    const { userID } = req.user;

    const isCartExist = await Cart.findOne({ userID });

    if (isCartExist) {
      isCartExist.items.push(item);
      await isCartExist.save();

      const totalPrice = isCartExist.items.reduce((acc, item) => {
        return acc + item.price;
      }, 0);

      res.status(200).json({
        cart_id: isCartExist._id,
        userID: isCartExist.userID,
        items: isCartExist.items,
        totalPrice: totalPrice,
      });
    } else {
      const newCart = new Cart({ userID, items: [item] });
      await newCart.save();
      const totalPrice = newCart.items.reduce((acc, item) => {
        return acc + item.price;
      }, 0);

      res.status(200).json({
        cart_id: newCart._id,
        userID: newCart.userID,
        items: newCart.items,
        totalPrice: totalPrice,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get a cart
// /api/cart/
const getCart = async (req, res) => {
  try {
    const { userID } = req.user;

    const cart = await Cart.findOne({ userID });

    if (cart) {
      const totalPrice = cart.items.reduce((acc, item) => {
        return acc + item.price;
      }, 0);

      res.status(200).json({
        cart_id: cart._id,
        userID: cart.userID,
        items: cart.items,
        totalPrice: totalPrice,
      });
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Remove a cart
// /api/cart/remove/:userID
const removeCart = async (req, res) => {
  try {
    const { userID } = req.user;
    const cart = await Cart.findOneAndDelete({ userID });

    if (cart) {
      res.status(204).end();
    } else {
      res.status(204).json({ message: "Cart empty" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { userID } = req.user;
    const { itemID } = req.params;
    console.log(userID, "in DELETE one");
    const cart = await Cart.findOne({ userID });

    if (cart) {
      const index = cart.items.findIndex((item) => item._id === itemID);
      if (index !== -1) {
        cart.items.splice(index, 1);
        await cart.save();

        const totalPrice = cart.items.reduce((acc, item) => {
          return acc + item.price;
        }, 0);

        res.status(200).json({
          cart_id: cart._id,
          userID: cart.userID,
          items: cart.items,
          totalPrice: totalPrice,
        });
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    } else {
      res.status(204).json({ message: "Cart empty" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export { addToCart, getCart, removeCart, removeCartItem };
