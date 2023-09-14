import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        items:{
            type:Array,
            required: true,
        },

    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('carts',cartSchema );

export default Cart;