import express from 'express';
import {addFoodItem,getFoodItem,updateFoodItem} from '../controllers/foodItemController.js';

const router = express.Router();

router.post('/add', addFoodItem);
router.get('/getfooditem', getFoodItem);
router.put('/update/:id', updateFoodItem);

export default router;