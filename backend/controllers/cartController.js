import Cart from '../models/cartModel.js';

// Add item to cart 
// /api/cart/add
const addToCart = async (req, res) => {
    try {
        const { userID, item } = req.body
        
        const isCartExist = await Cart.findOne({ userID });

        if (isCartExist) {
            isCartExist.items.push(item);
            await isCartExist.save();
            res.status(200).json({
                cart_id: isCartExist._id,
                userID: isCartExist.userID
            });
        }
        else {
            const newCart = new Cart({ userID, items: [item] });
            await newCart.save();
            res.status(200).json({
                cart_id: newCart._id,
                userID: newCart.userID
            });
        }

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


// get a cart 
// /api/cart/:userID
const getCartById = async (req, res) => {
    try {
        const { userID } = req.params;

        const cart = await Cart.findOne({ userID });

        if (cart) {

            const totalPrice = cart.items.reduce((acc, item) =>{
                return acc + item.price;
            },0);

            res.status(200).json({
                cart_id: cart._id,
                userID: cart.userID,
                items: cart.items,
                totalPrice: totalPrice
            });
        }
        else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Remove a cart 
// /api/cart/remove/:userID
const removeById = async (req, res) => {
    try {
        const { userID } = req.params;
        console.log(userID,'in DELETE');
        const cart = await Cart.findOneAndDelete({ userID });

        if (cart) {
            res.status(204).end();
        }
        else{
            res.status(204).json({ message: 'Cart empty' });
        }

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


export {
    addToCart,
    getCartById,
    removeById
};