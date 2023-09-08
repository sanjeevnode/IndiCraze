import express from 'express'
import { registerUser ,loginUser,getUser} from '../controllers/userController.js'
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',verifyToken,getUser);

export default router;