import mongoose from "mongoose";

const foodItemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 30
        },
        description: {
            type: String,
            required: true,
            min: 2,
            max: 100
        },
        price: {
            type: Number,
            required: true,
            min: 2,
        },
        category: {
            type: String,
            required: true,
            min: 2,
            max: 30
        },
        imageURL: {
            type: String,
            required: true
        },
        quantity:{
            type: String,
            required: true,
            min: 2,
            max: 30
        }
    }
    ,
    {
        timestamps: true
    }

);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

export default FoodItem;