import express from 'express';
import {addToCart,getCartById,removeById} from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart);
router.get('/:userID',getCartById);
router.delete('/:userID',removeById);

export default router;