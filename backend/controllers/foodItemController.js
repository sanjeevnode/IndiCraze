import FoodItem from "../models/foodItemModel.js";


const addFoodItem = async (req, res) => {

    const { name, description, price, category, imageURL, quantity } = req.body;


    const itemExists = await FoodItem.findOne({ name });

    if (itemExists) {
        return res.status(400).json({ message: "Item already exists" });
    }

    try {
        const item = await FoodItem.create({ name, description, price, category, imageURL, quantity });
        res.status(201).json(item);
    } catch (error) {
        res.status(404).json({ message: "Invalid data", error: error });
    }

};

const getFoodItem = async (req, res) => {
    try {

        const items = await FoodItem.find({},"name _id category price imageURL description quantity");

        const veg  = await items.filter((obj)=>obj.category==='vegetarian')
        const nonveg  = await items.filter((obj)=>obj.category==='non-vegetarian')
        const Beverages  = await items.filter((obj)=>obj.category==='beverages')
        const breads  = await items.filter((obj)=>obj.category==='breads') 

        res.status(200).json({
            Vegetarian:veg,
            NonVegetarian:nonveg,
            Beverages:Beverages,
            Breads:breads
        });

// Edit items
        // const newitems = await items.forEach(async(obj)=>{
        //     obj.category = obj.category.toLowerCase()

        //     await obj.save();
        // })
        // res.status(200).json(items);

//update or remove items
        // await FoodItem.updateMany(
        //     {},
        //     { $unset: { "rating": 1 } }
        // ).then(res => {
        //     console.log(res.n); // Number of documents matched
        //     console.log(res.nModified); // // Number of documents modified
        // }).catch(err => console.log(err));

        // res.status(200).json(items);

    } catch (error) {
        res.status(404).json({ message: "Invalid data", error: error });
    }
};

const updateFoodItem = async (req, res) => {

    const { name, description, price, category, imageURL, quantity } = req.body;
    try {
        const { id } = req.params;
        try {
            const  item = await FoodItem.findById(id);
            if(item) {
                item.name = name||item.name;
                item.description = description||item.description;
                item.price = price||item.price;
                item.category = category||item.category;
                item.imageURL = imageURL||item.imageURL;
                item.quantity = quantity||item.quantity;

                const updateFoodItem = await item.save();

                res.status(200).json({
                    _id:updateFoodItem._id,
                    name:updateFoodItem.name,
                    description:updateFoodItem.description,
                    price:updateFoodItem.price,
                    category:updateFoodItem.category,
                    imageURL:updateFoodItem.imageURL,
                    quantity:updateFoodItem.quantity
                });
            }
            else{
                return res.status(401).json({ message: "Invalid item", error: error})
            }
        } catch (error) {
        res.status(401).json({ message: "Invalid  data item", error: error})
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid data", error: error})
    }
};


export {
    addFoodItem,
    getFoodItem,
    updateFoodItem
}